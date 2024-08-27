import { FC, useState } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import signIn from '../../assets/images/signIn.png'
import logo from '../../assets/logos/LogoDefault.svg'
import { useNavigate } from "react-router-dom";

const LoginTitle = styled.h1`
  font-size: 1.5em;
  color: black;
  padding: 10px;
`;

const Login: FC = () => {
  const navigate = useNavigate();

  // State for form values and errors
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  // Validate form fields
  const validate = () => {
    let emailError = '';
    let passwordError = '';

    if (!formValues.email) {
      emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      emailError = 'Email is invalid';
    }

    if (!formValues.password) {
      passwordError = 'Password is required';
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
      // Proceed with form submission (e.g., API call)
      console.log('Form submitted:', formValues);
    }
  };

  return (
    <Box width="100%" sx={{ flexGrow: 1, backgroundColor: '#FAFAFA' }}>
      <Grid container  direction="row" padding={{ xs: 2, sm: 3, md: 4 }} spacing={4}>
        <Grid item xs={12} md={6}>
          <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} direction={'column'} spacing={4}>
            <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <img
                src={logo}
                alt='Logo'
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '190px',
                }}
              />
            </Grid>
            <Grid
              item 
              xs={12}
              display="flex"
              sx={{
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: { xs: '10px', sm: '15px', md: '20px' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Syne',
                  fontSize: { xs: '20px', sm: '28px', md: '40px' },
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '120%',
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
                  backgroundColor: '#FFE7DB',
                  border: '1px solid',
                  borderRadius: '15px'
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
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
                          padding: { xs: '10px', sm: '15px' },
                          fontSize: { xs: '14px', sm: '16px' }
                        }}
                      >
                        Log In
                      </Button>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Typography
                        sx={{
                          fontFamily: 'Outfit',
                          fontSize: { xs: '16px', sm: '18px', md: '20px' },
                          fontStyle: 'normal',
                          lineHeight: '120%',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                        onClick={() => navigate('/forgotPassword')}
                      >
                        Forgot Password?
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} textAlign={'center'} display={'flex'} flexDirection="column" alignItems="center">
              <Typography
                sx={{
                  fontFamily: 'Outfit',
                  fontSize: { xs: '16px', sm: '18px', md: '20px' },
                  fontStyle: 'normal',
                  lineHeight: '120%',
                }}
              >
                Don’t have a LYFER account?
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Outfit',
                  fontSize: { xs: '16px', sm: '18px', md: '20px' },
                  fontStyle: 'normal',
                  lineHeight: '120%',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={signIn}
            alt='Sign In'
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '1024px',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
