import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import contactusCover from "../../assets/images/contactusover.png";
import axios from "axios";
import baseUrl from "../../config/apiConfig";
import { toast } from "react-toastify";
import { handleApiError } from "../common/Api-error-handler";
import { logout } from "../../store/auth/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  // State variables to hold form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "", message: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (
      !email.trim() ||
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
    ) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }
    if (!phone.trim()) {
      newErrors.phone = "Valid phone number is required";
      isValid = false;
    }
    if (!message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      return; // If form is invalid, don't submit
    }
    const formData = { name, email, phone, message };

    try {
      // Send form data to backend API
      const response = await axios.post(`${baseUrl}/api/contact`, formData);
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo == "login") {
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={11} md={11} lg={11} xl={9.2}>
          <Grid
            container
            borderRadius={{ xs: "20px", sm: "30px", md: "40px" }}
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexShrink={0}
            padding={{ xs: 2, sm: 4, md: 6 }}
            sx={{
              backgroundImage: `url(${contactusCover})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: { xs: "200px", sm: "350px", md: "600px" },
              margin: "40px 0px",
            }}
          ></Grid>
        </Grid>
      </Grid>

      <Container maxWidth={"xl"}>
        <Grid
          container
          width="100%"
          direction="column"
          rowSpacing={2}
          flexShrink={0}
        >
          <Grid item xs={12} sx={{ margin: "20px 0px" }}>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container rowSpacing={1}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "Syne",
                        fontSize: {
                          xs: "20px",
                          sm: "28px",
                          md: "28px",
                          lg: "32px",
                        },
                        fontWeight: "bold",
                      }}
                    >
                      Get in Touch
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "Syne",
                        fontSize: {
                          xs: "26px",
                          sm: "34px",
                          md: "30px",
                          lg: "48px",
                        },
                        fontWeight: "bold",
                        width: {
                          xs: "100%",
                          sm: "80%",
                          md: "400px",
                          lg: "628px",
                        },
                      }}
                      variant="h3"
                    >
                      We are here to help you grow
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: {
                          xs: "16px",
                          sm: "20px",
                          md: "20px",
                          lg: "28px",
                        },
                      }}
                    >
                      We’d love to hear from you! Whether you have questions, or
                      feedback, or need support, our team is here to help. Fill
                      out the contact form below, and we’ll respond as soon as
                      possible.
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      backgroundColor: "#FFE7DB",
                      border: "0.5px solid",
                      borderRadius: "20px",
                      marginTop: "25px",
                      padding: { xs: "20px", sm: "25px", md: "30px" },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12} lg={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "18px", sm: "20px", md: "24px" },
                            fontWeight: 400,
                          }}
                        >
                          Community Email
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "24px", sm: "28px", md: "28px" },
                            fontWeight: 700,
                            color: "#FF5A00",
                          }}
                        >
                          community@lyfers.com
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12} lg={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "18px", sm: "20px", md: "24px" },
                            fontWeight: 400,
                          }}
                        >
                          Store Email
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "24px", sm: "28px", md: "28px" },
                            fontWeight: 700,
                            color: "#FF5A00",
                          }}
                        >
                          store@lyfers.com
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    padding: { xs: 2, sm: 2, md: 2 },
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
                          label="Name"
                          variant="outlined"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          error={!!errors.name}
                          helperText={errors.name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          variant="outlined"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          error={!!errors.phone}
                          helperText={errors.phone}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={5}
                          label="Message"
                          variant="outlined"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          error={!!errors.message}
                          helperText={errors.message}
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
                          Get In Touch
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "24px", sm: "28px", md: "32px" },
                fontWeight: "bold",
              }}
            >
              Socials
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ margin: "20px 0px 60px 0px" }}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} md={3}>
                <Box
                  sx={{
                    backgroundColor: "#FFE7DB",
                    height: { xs: "40px", sm: "100px", md: "117px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    border: "0.5px solid",
                    borderRadius: "20px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "16px" },
                      textAlign: "center",
                    }}
                  >
                    Facebook
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "16px", sm: "28px", md: "32px" },
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#FF5A00",
                    }}
                  >
                    LYFERS
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <Box
                  sx={{
                    backgroundColor: "#FFE7DB",
                    height: { xs: "40px", sm: "100px", md: "117px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    border: "0.5px solid",
                    borderRadius: "20px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "16px" },
                      textAlign: "center",
                    }}
                  >
                    Instagram
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "16px", sm: "28px", md: "32px" },
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#FF5A00",
                    }}
                  >
                    LYFERS
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <Box
                  sx={{
                    backgroundColor: "#FFE7DB",
                    height: { xs: "40px", sm: "100px", md: "117px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    border: "0.5px solid",
                    borderRadius: "20px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "16px" },
                      textAlign: "center",
                    }}
                  >
                    Twitter
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "16px", sm: "28px", md: "32px" },
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#FF5A00",
                    }}
                  >
                    LYFERS
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <Box
                  sx={{
                    backgroundColor: "#FFE7DB",
                    height: { xs: "40px", sm: "100px", md: "117px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    border: "0.5px solid",
                    borderRadius: "20px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "16px" },
                      textAlign: "center",
                    }}
                  >
                    Youtube
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "16px", sm: "28px", md: "32px" },
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#FF5A00",
                    }}
                  >
                    LYFERS
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactUs;
