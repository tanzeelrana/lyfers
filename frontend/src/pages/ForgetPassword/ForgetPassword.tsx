import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  CircularProgress,
  SelectChangeEvent,
  Container,
} from "@mui/material";
import logo from "../../assets/logos/LogoDefault.svg";
import signIn from "../../assets/images/signIn.png";
import { useNavigate } from "react-router-dom";
import '../Login/login.css';
import axios from "axios";
import baseUrl from "../../config/apiConfig";
import { ForgotPasswordPayload } from "../../store/auth/types";
import { forgotpassord } from "../../store/auth/actions";
import { useDispatch } from "react-redux";

const styles = {
  buttonStyle: {
    width: "100%",
    py: 1,
    borderRadius: "20px",
    mt: 2,
  },
  textField: {
    width: "100%",
    mb: 3,
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c6c6c6 !important",
    },
  },
};

const ForgetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    securityQuestion: "",
    answer: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    securityQuestion: "",
    answer: "",
    newPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchSecurityQuestions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/security-questions`);
        setSecurityQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching security questions:", error);
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchSecurityQuestions();
  }, []);
  // Handle input change
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Validate form fields
  const validate = () => {
    let emailError = "";
    let securityQuestionError = "";
    let answerError = "";
    let newPasswordError = "";

    if (!formValues.email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      emailError = "Email is invalid";
    }

    if (!formValues.securityQuestion) {
      securityQuestionError = "Please select a security question";
    }

    if (!formValues.answer) {
      answerError = "Answer to the security question is required";
    }

    if (!formValues.newPassword) {
      newPasswordError = "New password is required";
    } else if (formValues.newPassword.length < 6) {
      newPasswordError = "New password must be at least 6 characters";
    }

    if (
      emailError ||
      securityQuestionError ||
      answerError ||
      newPasswordError
    ) {
      setErrors({
        email: emailError,
        securityQuestion: securityQuestionError,
        answer: answerError,
        newPassword: newPasswordError,
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      try {
        const forgotPasswordPayload: ForgotPasswordPayload = {
          email: formValues.email,
          password: formValues.newPassword,
          security_question_id: formValues.securityQuestion,
          security_answer: formValues.answer,
          setBtnloading: setBtnLoading,
          navigate: navigate,
        };
  
        dispatch(forgotpassord(forgotPasswordPayload));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container maxWidth={"xl"}>
      <Grid
        container
        direction="row"
        spacing={4}
        flexShrink={0}
      >
        <Grid item xs={12} md={6} alignItems={'center'} justifyContent={'center'} display={'flex'}>
          <Grid
            container
            direction={"column"}
            spacing={3}
          >
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                src={logo}
                alt="Logo"
                className="responsive-logo"
              />
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              sx={{
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: { xs: "10px", sm: "15px", md: "20px" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Syne",
                  fontSize: { xs: "20px", sm: "28px", md: "40px" },
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "120%",
                }}
              >
                Forgot Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={10}
                sx={{
                  padding: { xs: 2, sm: 3, md: 4 },
                  backgroundColor: "#FFE7DB",
                  border: "1px solid",
                  borderRadius: "15px",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.securityQuestion)}
                      >
                        <InputLabel id="security-question-label">
                          Security Question
                        </InputLabel>
                        <Select
                          labelId="security-question-label"
                          label="Security Question"
                          name="securityQuestion"
                          value={formValues.securityQuestion}
                          onChange={handleChange}
                          sx={{
                            backgroundColor: "white",
                          }}
                        >
                          {securityQuestions.map((question) => (
                            <MenuItem key={question.id} value={question.id}>
                              {question.question}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.securityQuestion && (
                          <Typography color="error">
                            {errors.securityQuestion}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Answer"
                        variant="outlined"
                        name="answer"
                        value={formValues.answer}
                        onChange={handleChange}
                        error={Boolean(errors.answer)}
                        helperText={errors.answer}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        name="newPassword"
                        type="password"
                        value={formValues.newPassword}
                        onChange={handleChange}
                        error={Boolean(errors.newPassword)}
                        helperText={errors.newPassword}
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                          padding: { xs: "10px", sm: "15px" },
                        }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Reset Password"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              textAlign={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontSize: { xs: "16px", sm: "18px", md: "24px" },
                  fontStyle: "normal",
                  lineHeight: "120%",
                }}
              >
                Don’t have a LYFER account?
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontSize: { xs: "16px", sm: "18px", md: "24px" },
                  fontStyle: "normal",
                  lineHeight: "120%",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
            height: "100vh", 
          }}
        >
          <img
            src={signIn}
            alt="Sign In"
            style={{
              width: "100%",
              height: "100vh", 
              objectFit: "cover", 
              borderTopLeftRadius: "50px", 
              borderBottomLeftRadius: "50px",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgetPassword;
