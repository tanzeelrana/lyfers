import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import { Box } from "@mui/system";
import ImageIcon from "@mui/icons-material/Image";
import { toast } from "react-toastify";
import { handleApiError } from "../../common/Api-error-handler";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/auth/actions";

interface Category {
  id: number;
  name: string;
}

interface Event {
  id?: number;
  title: string;
  date: string;
  description: string;
  location: string;
  ticketPrice: string;
  categoryId: number;
  image?: string; // Image URL if editing an existing event
}

const EventsForm: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>(); // Get eventId from route
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ticketPrice, setTicketPrice] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [categoryId, setCategoryId] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Set image preview from existing event
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Fetch categories dynamically from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/eventCategories`);
        setCategories(response.data);
      } catch (err) {
        const { message, navigateTo } = handleApiError(error);
        toast.error(message);
        if (navigateTo) {
          if (navigateTo =='login'){
            dispatch(logout());
          }
          navigate(`/${navigateTo}`);
        }
      }
    };

    fetchCategories();
  }, []);

  // Fetch existing event details if eventId is present
  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        try {
          const response = await axios.get(`${baseUrl}/events/${eventId}`,{
            headers: { Authorization: `Bearer ${currentUser?.token}` },
          });
          const event = response.data;
          console.log(event);
          setTitle(event.title);
          setDate(new Date(event.date).toISOString().split("T")[0]);
          setDescription(event.description);
          setTicketPrice(event.ticketPrice);
          setLocation(event.location);
          setCategoryId(event.categoryId);
          setImagePreview(event.image || null);
        } catch (err) {
          const { message, navigateTo } = handleApiError(err);
        toast.error(message);
        if (navigateTo) {
          if (navigateTo =='login'){
            dispatch(logout());
          }
          navigate(`/${navigateTo}`);
        }
        }
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("ticketPrice", ticketPrice);
    formData.append("categoryId", categoryId.toString());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (eventId) {
        // Update existing event
        const response = await axios.put(
          `${baseUrl}/events/${eventId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        toast.success(response.data.message);
        navigate("/admin/events");
      } else {
        // Create new event
        const response = await axios.post(`${baseUrl}/events`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        toast.success(response.data.message);
        navigate("/admin/events");
      }
      setLoading(false);
      // Clear form
      setTitle("");
      setDate("");
      setDescription("");
      setTicketPrice("");
      setCategoryId(0);
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setLoading(false);
      const { message, navigateTo } = handleApiError(err);
        toast.error(message);
        if (navigateTo) {
          if (navigateTo =='login'){
            dispatch(logout());
          }
          navigate(`/${navigateTo}`);
        }
    }
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
      <Grid item xs={12}>
        <Grid container direction="column" flexShrink={0}>
          <Grid
            item
            xs={12}
            display="flex"
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
                marginLeft: { xs: 0, md: 20 },
              }}
            >
              {eventId ? "Edit Event" : "Add Event"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ borderRadius: 4, border: "1px solid", padding: 2 }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <ImageIcon sx={{ fontSize: 50, color: "#ccc" }} />
                </IconButton>
                <Typography
                  sx={{
                    position: "absolute",
                    marginTop: "130px",
                    color: "#999",
                  }}
                >
                  Upload Pictures
                </Typography>
              </Box>
            </Grid>

            {/* Image Preview */}
            {imagePreview && (
              <Grid item xs={12} display="flex" justifyContent="center">
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Grid>

            {/* Category Dropdown */}
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  label="Category"
                >
                  <MenuItem value={0} disabled>
                    Select Category
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Ticket Price"
                variant="outlined"
                type="number"
                fullWidth
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Event Location"
                variant="outlined"
                type="text"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : eventId ? "Update Event" : "Add Event"}
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            {successMessage && (
              <Grid item xs={12}>
                <Typography color="success.main">{successMessage}</Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default EventsForm;
