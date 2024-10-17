import { FC, useState } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import signIn from "../../assets/images/signIn.png";
import logo from "../../assets/logos/LogoDefault.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/actions";
import { LoginPayload } from "../../store/auth/types";
import "./login.css";

const LoginTitle = styled.h1`
  font-size: 1.5em;
  color: black;
  padding: 10px;
`;

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for form values and errors
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [btnLoading, setBtnLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!formValues.email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      emailError = "Email is invalid";
    }

    if (!formValues.password) {
      passwordError = "Password is required";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setBtnLoading(true);
      const loginPayload: LoginPayload = {
        email: formValues.email,
        password: formValues.password,
        setBtnloading: setBtnLoading,
        navigate: navigate,
      };

      dispatch(login(loginPayload));
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={3}>
        <Grid
          item
          xs={12}
          md={6}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Grid container direction="column" spacing={4}>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={logo}
                alt="Logo"
                className="responsive-logo"
                style={{
                  width: "80%",
                }}
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
                Log In
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
                  <Grid container spacing={3}>
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
                        sx={{ marginBottom: 2 }}
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
                        sx={{ marginBottom: 2 }}
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
                          fontSize: { xs: "14px", sm: "16px" },
                        }}
                        disabled={btnLoading}
                      >
                        {btnLoading ? "Logging in..." : "Log In"}
                      </Button>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Typography
                        sx={{
                          fontFamily: "Outfit",
                          fontSize: { xs: "16px", sm: "18px", md: "20px" },
                          fontStyle: "normal",
                          lineHeight: "120%",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => navigate("/forgotPassword")}
                      >
                        Forgot Password?
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                  fontStyle: "normal",
                  lineHeight: "120%",
                }}
              >
                Don’t have a LYFER account?
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
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

export default Login;
