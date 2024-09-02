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
  SelectChangeEvent,
  Container,
  CircularProgress,
} from "@mui/material";
import signUpImage from "../../assets/images/loginBanner.png";
import logo from "../../assets/logos/LogoDefault.svg";
import { useNavigate } from "react-router-dom";
import "../Signup/signup.css";
import { useDispatch } from "react-redux";
import { RegisterPayload } from "../../store/auth/types";
import { register } from "../../store/auth/actions";
import axios from "axios";
import baseUrl from "../../config/apiConfig";

const Signup: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    answer: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    answer: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
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
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

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
  // Validate form fields
  const validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    let securityQuestionError = "";
    let answerError = "";

    if (!formValues.firstName) {
      firstNameError = "First name is required";
    }

    if (!formValues.lastName) {
      lastNameError = "Last name is required";
    }

    if (!formValues.email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      emailError = "Email is invalid";
    }

    if (!formValues.password) {
      passwordError = "Password is required";
    } else if (formValues.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    if (formValues.password !== formValues.confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    }

    if (!formValues.securityQuestion) {
      securityQuestionError = "Please select a security question";
    }

    if (!formValues.answer) {
      answerError = "Answer to the security question is required";
    }

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      securityQuestionError ||
      answerError
    ) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        securityQuestion: securityQuestionError,
        answer: answerError,
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      const registerPayload: RegisterPayload = {
        fname: formValues.firstName,
        lname: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        Cpassword: formValues.confirmPassword,
        security_question_id: formValues.securityQuestion,
        security_answer: formValues.answer,
        setBtnloading: setBtnLoading,
        navigate: navigate,
      };

      dispatch(register(registerPayload));
      console.log("Form submitted:", formValues);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container direction="row" spacing={3} flexShrink={0}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid container direction="column" spacing={1}>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img src={logo} alt="Logo" className="responsive-logo" />
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              sx={{
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: { xs: "10px", sm: "15px", md: "10px" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Syne",
                  fontSize: { xs: "20px", sm: "28px", md: "40px" },
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "120%",
                  textAlign: "center", 
                }}
              >
                Sign Up to Become a LYFER
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={10}
                sx={{
                  padding: { xs: 2, sm: 3, md: 3},
                  backgroundColor: "#FFE7DB",
                  border: "1px solid",
                  borderRadius: "15px",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName}
                      />
                    </Grid>
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
                      <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        name="confirmPassword"
                        type="password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {loadingQuestions ? (
                        <Box display="flex" justifyContent="center">
                          <CircularProgress />
                        </Box>
                      ) : (
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
                            sx={{ backgroundColor: "white" }}
                          >
                            {securityQuestions.map((question: any) => (
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
                      )}
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
                      >
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      textAlign="center"
                      display="flex"
                      justifyContent="center"
                    >
                      <Typography
                        sx={{
                          fontFamily: "Outfit",
                          fontSize: { xs: "16px", sm: "20px", md: "24px" },
                          fontStyle: "normal",
                          lineHeight: "120%",
                          textAlign: "center", // Center text on all screen sizes
                        }}
                      >
                        Already have an account?
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Outfit",
                          fontSize: { xs: "16px", sm: "20px", md: "24px" },
                          fontStyle: "normal",
                          lineHeight: "120%",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/login")}
                      >
                        Log In
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
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
            src={signUpImage}
            alt="Sign Up"
            style={{
              width: "100%",
              height: "100vh",
              borderTopLeftRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
