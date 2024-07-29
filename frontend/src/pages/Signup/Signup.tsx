import { FC, useState } from "react";
import { Box, TextField, Grid, Typography, Link, Card, CardContent } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import Parse from "parse";
interface formikValuesProps {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const styles = {
  signUpButtonStyle: {
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

const Signup: FC = () => {
  const navigate = useNavigate();
  const [btnloading, setBtnloading] = useState<boolean>(false);

  const initialValues: formikValuesProps = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    userName: yup.string().required("First name is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: formikValuesProps) => {
      handleSubmit(values)
    },
  });

  const handleSubmit = async (values: formikValuesProps) => {
    try {
      await Parse.Cloud.run("userSignup", {
        username: values.userName,
        email: values.email,
        password: values.password,
      });
      setBtnloading(false);
      toast.success("Signup Successfully");
      navigate("/");
    } catch (error: any) {
      setBtnloading(false);
      console.log("API Error: ", error);
      toast.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        background: "white",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item lg={4} md={6} xs={10} sx={{ px: 2 }}>
          <Card
            variant="outlined"
            sx={{
              p: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ width: "100%", px: 5 }}>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                Signup
              </Typography>
              <Box sx={{ mb: 5 }}>
                {/* <img alt="Logo" src={logo} width="200px" /> */}
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="userName"
                  name="userName"
                  label="Username"
                  fullWidth
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName}
                  variant="standard"
                  sx={styles.textField}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  variant="standard"
                  sx={styles.textField}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  variant="standard"
                  sx={styles.textField}
                />
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  variant="standard"
                  sx={styles.textField}
                />
                <Box sx={{ textAlign: "center" }}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={btnloading}
                    sx={styles.signUpButtonStyle}
                  >
                    Signup
                  </LoadingButton>
                </Box>
              </form>
              <Box
                sx={{
                  mt: 4,
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                <Link
                  onClick={() => navigate("/login")}
                  color="primary"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Back to login
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
