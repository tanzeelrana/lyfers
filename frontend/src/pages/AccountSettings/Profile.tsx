import { FC, useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../../config/apiConfig";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");

  // Track whether form is editable or not
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    securityQuestion: "",
    answer: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    securityQuestion: "",
    answer: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // UseEffect to set initial form values from currentUser
  useEffect(() => {
    if (currentUser) {
      setFormValues({
        firstName: currentUser.user.firstName || "",
        lastName: currentUser.user.lastName || "",
        email: currentUser.user.email || "",
        dateOfBirth: currentUser.user.dateOfBirth || "",
        password: "",
        securityQuestion: currentUser.user.security_question_id || "",
        answer: currentUser.user.security_answer || "",
        fullName: currentUser.user.fullname || "",
        phone: currentUser.user.phone || "",
        address: currentUser.user.address || "",
        city: currentUser.user.city || "",
        state: currentUser.user.state || "",
        postalCode: currentUser.user.postalCode || "",
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: any = {};

    // Validation
    if (!formValues.firstName) errors.firstName = "First Name is required";
    if (!formValues.lastName) errors.lastName = "Last Name is required";
    if (!formValues.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      errors.email = "Email is invalid";
    if (!formValues.dateOfBirth)
      errors.dateOfBirth = "Date of Birth is required";
    if (!formValues.password) errors.password = "Password is required";
    if (!formValues.securityQuestion)
      errors.securityQuestion = "Security Question is required";
    if (!formValues.answer) errors.answer = "Answer is required";
    if (!formValues.fullName) errors.fullName = "Full Name is required";
    if (!formValues.phone) errors.phone = "Phone number is required";
    if (!formValues.address) errors.address = "Address is required";
    if (!formValues.city) errors.city = "City is required";
    if (!formValues.state) errors.state = "State is required";
    if (!formValues.postalCode) errors.postalCode = "Postal Code is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formValues);

      const errors: any = {};

      setFormErrors(errors);

      if (Object.keys(errors).length === 0) {
        setBtnLoading(true);

        try {
          const response = await axios.put(
            `${baseUrl}/auth/update-profile/${currentUser.user.id}`,
            formValues,
          );

          toast.success(response.data.message);
        } catch (error) {
          console.error("Error updating profile", error);
          toast.error("Failed to update profile. Please try again.");
        } finally {
          setBtnLoading(false);
        }
      }
      // toast.success("Profile updated successfully!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Grid
      container
      width="100%"
      direction="column"
      padding={{ xs: 0, sm: 0, md: 4 }}
      rowSpacing={3}
      flexShrink={0}
      sx={{ marginBottom: "40px" }}
    >
      {/* Account Details */}
      <Grid item xs={12}>
        <Grid container direction="column" flexShrink={0}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: { xs: "8px", sm: "12px", md: "16px" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                color: "#000000",
              }}
            >
              Account Details
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Form */}
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            padding: { xs: 1, sm: 2, md: 3 },
            borderRadius: 4,
            border: "1px solid",
          }}
        >
          {/* Personal Details */}
          <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <IconButton
              onClick={() => setIsEditable((prev) => !prev)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2} alignItems="center">
            <Grid item md={2}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                variant="square"
                src="/avatar-url.png"
              />
            </Grid>
            <Grid item md={10}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="dateOfBirth"
                    type="date"
                    value={formValues.dateOfBirth}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!formErrors.dateOfBirth}
                    helperText={formErrors.dateOfBirth}
                    disabled={!isEditable}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.password}
                helperText={formErrors.password}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Security Question"
                name="securityQuestion"
                value={formValues.securityQuestion}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.securityQuestion}
                helperText={formErrors.securityQuestion}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Answer"
                name="answer"
                value={formValues.answer}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.answer}
                helperText={formErrors.answer}
                disabled={!isEditable}
              />
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2 }} />

          {/* Shipping Details */}
          <Typography variant="h6" gutterBottom>
            Shipping Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formValues.fullName}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.email}
                helperText={formErrors.email}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.address}
                helperText={formErrors.address}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                name="city"
                value={formValues.city}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.city}
                helperText={formErrors.city}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="State"
                name="state"
                value={formValues.state}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.state}
                helperText={formErrors.state}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Postal Code"
                name="postalCode"
                value={formValues.postalCode}
                onChange={handleInputChange}
                fullWidth
                error={!!formErrors.postalCode}
                helperText={formErrors.postalCode}
                disabled={!isEditable}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isEditable}
            >
              {btnLoading ? "Updating..." : "save"}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
