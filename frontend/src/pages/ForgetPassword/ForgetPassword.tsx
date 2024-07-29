import { FC, useState } from "react";
import {
    Box,
    Card,
    Typography,
    Link,
    TextField,
    Grid,
    CardContent,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import Parse from "parse";
interface formikValuesProps {
    email: string;
}

const styles = {
    submitButtonStyle: {
        width: "100%",
        py: 1,
        borderRadius: "20px",
        mt: 5,
        mb: 2,
    },
    textField: {
        width: "100%",
        mb: 2,
        "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c6c6c6 !important",
        },
    },
};

const ForgotPassword: FC = () => {
    const navigate = useNavigate();
    const [btnloading, setBtnloading] = useState<boolean>(false);

    const initialValues: formikValuesProps = {
        email: "",
    };

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values: formikValuesProps) => {
            handleSubmit(values)
        },
    });

    const handleSubmit = async (values: formikValuesProps) => {
        setBtnloading(true);
        try {
            await Parse.Cloud.run("requestPasswordChange", {
                email: values.email,
            });
            toast.success("Password reset successful, please check your email");
            setBtnloading(false);
            formik.resetForm();
            navigate("/login")
        } catch (error: any) {
            setBtnloading(false);
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
                                Enter your email!!
                            </Typography>
                            <Box sx={{ mb: 5 }}>
                                {/* <img alt="Logo" src={logo} width="200px" /> */}
                            </Box>
                            <form onSubmit={formik?.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder="Enter Email Address"
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    variant="standard"
                                    sx={styles.textField}
                                />
                                <Box sx={{ textAlign: "center" }}>
                                    <LoadingButton
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        loading={btnloading}
                                        sx={styles.submitButtonStyle}
                                    >
                                        Submit
                                    </LoadingButton>
                                </Box>
                                <Box
                                    sx={{
                                        fontSize: 12,
                                        my: 2,
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        letterSpacing: 0.3,
                                    }}
                                >
                                    <Link
                                        onClick={() => navigate("/login")}
                                        color="primary"
                                        sx={{
                                            my: 1,
                                            cursor: "pointer",
                                            ml: 0.5,
                                        }}
                                    >
                                        Back to Login
                                    </Link>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ForgotPassword;
