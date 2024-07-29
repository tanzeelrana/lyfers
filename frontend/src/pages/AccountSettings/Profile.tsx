import { FC, useEffect, useState } from "react";
import { Grid, Avatar, Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs";
import * as Yup from "yup";
import { Form, useFormik, FormikProvider } from "formik";
import { toast } from "react-toastify";
import { updateProfile } from "../../store/auth/actions";
import "./styles.scss";

const Profile: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");


  const cleanPhoneNumber = (phone_number: string) => {
    return phone_number
      .replace("(", "")
      .replace(")", "")
      .replace(" ", "")
      .replace("-", "");
  };

  const formatPhoneNumber = (phone_number: string) => {
    if (!phone_number) return "";
    var x = phone_number.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

    if (x != null) {
      return (phone_number = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : ""));
    }
    else return x;
  };

  const profileSchema = Yup.object().shape({
    profileImage: Yup.mixed().required("Please upload profile image"),
    firstName: Yup.string()
      .required("Please enter legal first name")
      .matches(/\S/, "Invalid legal first name")
      .max(25, 'Must be less than or equal to 25 characters'),
    lastName: Yup.string()
      .required("Please enter legal last name")
      .matches(/\S/, "Invalid legal last name")
      .max(25, 'Must be less than or equal to 25 characters'),
    nickname: Yup.string()
      .matches(/\S/, "Invalid nickname")
      .max(25, 'Must be less than or equal to 25 characters'),
    phone: Yup.string()
      .required("Please enter phone number")
      .min(14, "Phone must be at least 10 characters")
      .matches(/\S/, "Invalid phone"),
    email: Yup.string()
      .email("Please enter valid email address")
      .required("Please enter email address")
      .matches(/\S/, "Invalid email")
      .max(60, 'Must be less than or equal to 60 characters'),
    address: Yup.string()
      .required("Please enter address")
      .matches(/\S/, "Invalid address")
      .max(50, 'Must be less than or equal to 50 characters'),
  });

  const formik = useFormik({
    initialValues: {
      profileImage: currentUser?.profileImage,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      nickname: currentUser?.nickname,
      phone: currentUser?.phone,
      email: currentUser?.email,
      address: currentUser?.address,
    },
    enableReinitialize: true,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      if (cleanPhoneNumber(values.phone).length === 10) {
        setBtnLoading(true);
        dispatch(
          updateProfile({
            profileImage: values.profileImage,
            firstName: values.firstName,
            lastName: values.lastName,
            nickname: values.nickname,
            phone: values.phone,
            email: values.email,
            address: values.address,
            setBtnloading: setBtnLoading,
          })
        )
      } else {
        toast.error("Please enter a valid phone number")
      }
    },
  });


  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Grid container>
          <BreadCrumbs title="Profile" />
          <Grid item lg={12} md={12} xs={12} sx={{ px: 2, py: 1 }}>
            <Avatar src={uploadedImage ? uploadedImage : (formik.values && formik.values.profileImage)} sx={{ width: 125, height: 125, mb: 2, ml: 3 }} />
            <Button component="label" variant="contained" color="info" startIcon={<CloudUploadIcon />}>
              Change Photo
              <input type="file"
                name="profileImage"
                accept="image/jpeg, image/png"
                onChange={(event) => {
                  if (event.target.files) {
                    event.preventDefault();
                    // formik.setFieldValue("profileImage", event.target.files[0]);
                    // setUploadedImage(URL.createObjectURL(event.target.files[0]))

                    const file = event.target.files[0];
                    const reader = new FileReader();
                  
                    reader.onload = (e) => {
                      const dataURL = e?.target?.result;
                      formik.setFieldValue("profileImage", dataURL);
                    };
                    reader.readAsDataURL(file);
                    setUploadedImage(URL.createObjectURL(event.target.files[0]))

                  }
                }} hidden />
            </Button>
            {formik.touched.profileImage && formik.errors.profileImage && (
              <p className="error">
                <>{formik.errors.profileImage}</>
              </p>
            )}
          </Grid>

          <Grid item lg={6} md={6} xs={6} sx={{ px: 2, py: 2 }}>
            <TextField
              id="firstName"
              label="Legal First Name"
              variant="filled"
              margin="dense"
              name="firstName"
              value={formik.values && formik.values.firstName}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.firstName && formik.errors.firstName
              )}
              helperText={
                formik.touched.firstName && formik.errors.firstName ? (
                <span className="error">{formik.errors.firstName?.toString()}</span>
              ) : null }
              fullWidth 
              onBlur={formik.handleBlur}
              InputLabelProps={{
                required: true,
              }}/>
            <TextField
              id="lastName"
              label="Legal Last Name"
              variant="filled"
              margin="dense"
              name="lastName"
              value={formik.values && formik.values.lastName}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.lastName && formik.errors.lastName
              )}
              helperText={
                formik.touched.lastName && formik.errors.lastName ? (
                <span className="error">{formik.errors.lastName?.toString()}</span>
              ) : null }
              fullWidth
              onBlur={formik.handleBlur}
              InputLabelProps={{
                required: true,
              }}/>
            <TextField
              id="nickname"
              label="Nickname"
              variant="filled"
              margin="dense"
              name="nickname"
              value={formik.values && formik.values.nickname}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.nickname && formik.errors.nickname
              )}
              helperText={ 
                formik.touched.nickname && formik.errors.nickname ? (
                <span className="error">{formik.errors.nickname?.toString()}</span>
              ) : null}
              fullWidth />
            <TextField
              id="phone"
              label="Phone Number"
              variant="filled"
              margin="dense"
              name="phone"
              value={formik.values && formik.values.phone}
              onChange={(e: any) =>
                formik.setFieldValue("phone", formatPhoneNumber(e.target.value))
              }
              // icon={
              //   <span className="absolute left-2 lg:left-3 text-mobile-grey-600 lg:text-3xl">
              //     +1
              //   </span>
              // }
              error={Boolean(
                formik.touched.phone && formik.errors.phone
              )}
              helperText={
                formik.touched.phone && formik.errors.phone ? (
                <span className="error">{formik.errors.phone?.toString()}</span>
                ) : null }
              fullWidth
              onBlur={formik.handleBlur}
              InputLabelProps={{
                required: true,
              }}/>
            <TextField
              id="email"
              label="Email"
              variant="filled"
              margin="dense"
              name="email"
              value={formik.values && formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.email && formik.errors.email
              )}
              helperText={<span className="error">{formik.errors.email?.toString()}</span>}
              disabled={true}
              fullWidth
              onBlur={formik.handleBlur}
              InputLabelProps={{
                required: true,
              }}/>
            <TextField
              id="address"
              label="Address"
              variant="filled"
              margin="dense"
              name="address"
              value={formik.values && formik.values.address}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.address && formik.errors.address
              )}
              helperText={
                formik.touched.address && formik.errors.address ? (
                  <span className="error">{formik.errors.address?.toString()}</span>
                ) : null
              }
              fullWidth
              onBlur={formik.handleBlur}
              InputLabelProps={{
                required: true,
              }}/>
            <Button
              variant="contained"
              color="info"
              type="submit"
              // loading={btnLoading}
              sx={{ mt: 2, float: "right" }}>Save</Button>
          </Grid >

        </Grid>
      </Form>
    </FormikProvider>

  )
};

export default Profile;