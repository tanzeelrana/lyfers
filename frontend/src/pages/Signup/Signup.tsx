import { FC, useState } from "react";
import { Box, Button, Paper, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Grid, SelectChangeEvent } from "@mui/material";
import signUpImage from '../../assets/images/loginBanner.png';
import logo from '../../assets/logos/LogoDefault.svg';
import { useNavigate } from "react-router-dom";

const Signup: FC = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    answer: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    answer: ''
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    
    
      setFormValues({
        ...formValues,
        [name]: value
      });
    
  };

  // Validate form fields
  const validate = () => {
    let firstNameError = '';
    let lastNameError = '';
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';
    let securityQuestionError = '';
    let answerError = '';

    if (!formValues.firstName) {
      firstNameError = 'First name is required';
    }

    if (!formValues.lastName) {
      lastNameError = 'Last name is required';
    }

    if (!formValues.email) {
      emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      emailError = 'Email is invalid';
    }

    if (!formValues.password) {
      passwordError = 'Password is required';
    } else if (formValues.password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
    }

    if (formValues.password !== formValues.confirmPassword) {
      confirmPasswordError = 'Passwords do not match';
    }

    if (!formValues.securityQuestion) {
      securityQuestionError = 'Please select a security question';
    }

    if (!formValues.answer) {
      answerError = 'Answer to the security question is required';
    }

    if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError || securityQuestionError || answerError) {
      setErrors({ firstName: firstNameError, lastName: lastNameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError, securityQuestion: securityQuestionError, answer: answerError });
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
      <Grid container  direction="row" padding={{ xs: 2, sm: 3, md: 4 }} spacing={4} flexShrink={0}>
        <Grid item xs={12} md={6}>
          <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} direction={'column'} spacing={3}>
            <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <img
                src={logo}
                alt='Logo'
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '180px',
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
                Sign Up
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
                      <FormControl fullWidth variant="outlined" error={Boolean(errors.securityQuestion)}>
                        <InputLabel id="security-question-label">Security Question</InputLabel>
                        <Select
                          labelId="security-question-label"
                          label="Security Question"
                          name="securityQuestion"
                          value={formValues.securityQuestion}
                          onChange={handleChange}
                          sx={{
                            backgroundColor:'white'
                          }}
                        >
                          <MenuItem value="pet">What is your pet's name?</MenuItem>
                          <MenuItem value="mother">What is your mother's maiden name?</MenuItem>
                          <MenuItem value="school">What was the name of your first school?</MenuItem>
                        </Select>
                        {errors.securityQuestion && <Typography color="error">{errors.securityQuestion}</Typography>}
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
                    <Grid item xs={12} textAlign="center">
                      <Button 
                        fullWidth 
                        size="large" 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        sx={{
                          padding: { xs: '10px', sm: '15px' }
                        }}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid item xs={12} textAlign="center" display={'flex'} justifyContent={'center'}>
                      <Typography
                        sx={{
                          fontFamily: 'Outfit',
                          fontSize: { xs: '16px', sm: '20px', md: '24px' },
                          fontStyle: 'normal',
                          lineHeight: '120%',
                        }}
                      >
                        Already have an account? 
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Outfit',
                          fontSize: { xs: '16px', sm: '20px', md: '24px' },
                          fontStyle: 'normal',
                          lineHeight: '120%',
                          textDecoration:'underline',
                          cursor: 'pointer',
                        }}
                        onClick={()=> navigate('/login')}
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
        <Grid item xs={12} md={6}>
          <img
            src={signUpImage}
            alt='Sign Up'
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

export default Signup;
