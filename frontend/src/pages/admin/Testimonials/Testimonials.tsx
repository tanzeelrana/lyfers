import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MoreHoriz } from "@mui/icons-material";
import { handleApiError } from "../../common/Api-error-handler";
import { logout } from "../../../store/auth/actions";
dayjs.extend(relativeTime);

interface Testimonial {
  id: string;
  title: string;
  description: string;
  userId: number;
  image: string;
  createdAt: string;
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    Testimonial[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>("");
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<
    string | null
  >(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [newTestimonial, setNewTestimonial] = useState({
    title: "",
    description: "",
    image: "",
    userId: currentUser?.user?.id || null,
  });

  // Validation states
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
  });

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${baseUrl}/testimonials`);
      setTestimonials(response.data);
      setLoading(false);
      setFilteredTestimonials(response.data);
    } catch (error) {
      setLoading(false);
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo == "login") {
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
    }
  };

  const fetchTestimonialById = async (id: string) => {
    try {
      const response = await axios.get(`${baseUrl}/testimonials/${id}`);
      setNewTestimonial({
        title: response.data.title,
        description: response.data.description,
        image: response.data.image,
        userId: response.data.userId,
      });
      setOpen(true);
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo == "login") {
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
    }
  };

  useEffect(() => {
    fetchTestimonials();
    if (id) {
      fetchTestimonialById(id);
    }
  }, [id]);

  useEffect(() => {
    const filtered = testimonials.filter((testimonial) => {
      const fullName =
        `${testimonial.user.firstName} ${testimonial.user.lastName}`.toLowerCase();
      const titleMatch = testimonial.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = testimonial.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const nameMatch = fullName.includes(searchQuery.toLowerCase());
      return titleMatch || descriptionMatch || nameMatch;
    });
    setFilteredTestimonials(filtered);
  }, [searchQuery, testimonials]);

  const handleOpen = (id: string) => {
    setId(id);
    setOpen(true);
    if (id) {
      fetchTestimonialById(id);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewTestimonial({
      title: "",
      description: "",
      image: "",
      userId: currentUser?.user?.id || null,
    });
    setErrors({ title: "", description: "", image: "" });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = { title: "", description: "", image: "" };
    if (!newTestimonial.title) newErrors.title = "Title is required";
    if (!newTestimonial.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description && !newErrors.image;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (id) {
        const response = await axios.put(
          `${baseUrl}/testimonials/${id}`,
          newTestimonial,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        toast.success(response.data.message);
      } else {
        const response = await axios.post(
          `${baseUrl}/testimonials`,
          newTestimonial,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        toast.success(response.data.message);
      }
      fetchTestimonials();
      handleClose();
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo == "login") {
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTestimonial({ ...newTestimonial, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/testimonials/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      toast.success(response.data.message);
      fetchTestimonials();
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo == "login") {
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedTestimonialId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedTestimonialId(null);
  };

  const confirmDelete = (id: string) => {
    setSelectedTestimonialId(id);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTestimonialId) {
      handleDelete(selectedTestimonialId);
    }
    setConfirmationOpen(false);
    handleMenuClose();
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

  if (error) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    );
  }

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
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid
            item
            display="flex"
            alignItems="center"
            sx={{ padding: { xs: "8px", sm: "12px", md: "16px" } }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                fontWeight: 700,
                lineHeight: "120%",
                color: "#000000",
                marginLeft: { xs: 0, md: 20 },
              }}
            >
              Testimonials
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Search and Add New Button */}
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" marginBottom={3}>
          <Grid item display="flex" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "20px" },
                fontWeight: "bold",
              }}
            >
              LYFERS Testimonials
            </Typography>
          </Grid>
          <Grid item display="flex" justifyContent="flex-end" gap={2}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: { xs: "10px", sm: "15px" },
                textTransform: "capitalize",
              }}
              onClick={() => handleOpen("")}
            >
              Add New Testimonial
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial) => (
              <Grid item xs={12} key={testimonial.id}>
                <Card
                  sx={{ display: "flex", padding: 2, alignItems: "flex-start" }}
                >
                  <Box sx={{ marginRight: 2 }}>
                    <Avatar
                      src={
                        testimonial.image ||
                        "https://example.com/default-avatar.png"
                      }
                      alt={testimonial.user.firstName || testimonial.user.email}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      {testimonial.user.firstName || testimonial.user.email}{" "}
                      {testimonial.user.lastName || ""}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {testimonial.title}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ marginTop: 1 }}
                    >
                      <Typography variant="body1" sx={{ flex: 1 }}>
                        {testimonial.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Place Menu and Date in a row */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="textSecondary"
                      sx={{ marginRight: 1 }}
                    >
                      {dayjs(testimonial.createdAt).fromNow()}
                    </Typography>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, testimonial.id)}
                    >
                      <MoreHoriz />
                    </IconButton>

                    {/* Menu for Edit/Delete */}
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={
                        Boolean(menuAnchorEl) &&
                        selectedTestimonialId === testimonial.id
                      }
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleOpen(testimonial.id)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => confirmDelete(testimonial.id)}>
                        Delete
                      </MenuItem>{" "}
                    </Menu>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center">
                No Testimonials Found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Modal for creating a new testimonial */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle textAlign="center">
          {" "}
          {!id ? "Add New Testimonial" : "Edit Testimonial"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={newTestimonial.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={newTestimonial.description}
            onChange={handleChange}
            multiline
            rows={4}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this testimonial?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Testimonials;
