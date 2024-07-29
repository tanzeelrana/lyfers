import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

const ContactUs = () => {
  // State variables to hold form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      phone,
      message,
    };
    console.log("Form data submitted:", formData);
    // Here you can handle form submission (e.g., send data to a server)
  };

  return (
    <Box width={"100%"} sx={{ flexGrow: 1 }}>
      <Grid container width={"100%"} direction={"column"} rowSpacing={1}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            padding={16}
            sx={{
              backgroundImage:
                'url("https://i0.wp.com/lyfers.com/wp-content/uploads/2024/06/get-in-touch-.jpg?fit=2405%2C898&ssl=1")',
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              position: "relative",
              height: "400px", // Adjust height as needed
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
                zIndex: 1,
              },
            }}
          >
            <Box zIndex={2}>
              <Typography
                sx={{
                  typography: {
                    xl: "h2",
                    lg: "h2",
                    md: "h2",
                    sm: "h3",
                    xs: "body1",
                    fontFamily: '"The Nautigal", Sans-serif !important',
                  },
                }}
                color="white"
                textAlign={"center"}
              >
                Get in touch
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Paper
              elevation={10}
              sx={{ padding: 2, width: "100%", maxWidth: "600px" }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" textAlign={"center"}>
                      We’d love to hear from you!
                    </Typography>
                    <Typography variant="body1" textAlign={"center"}>
                      Whether you have questions, feedback, or need support, our
                      team is here to help. Fill out the contact form below, and
                      we’ll respond as soon as possible.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Button variant="contained" color="primary" type="submit">
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
