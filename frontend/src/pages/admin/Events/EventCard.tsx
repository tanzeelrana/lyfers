import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import eventsimg from "../../../assets/images/eventImage.png";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import { toast } from "react-toastify";
import { Box } from "@mui/system";

interface Category {
  id: number;
  name: string;
}
interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  categoryId: number;
  description: string;
  ticketPrice: string;
  category: Category;
}

interface EventCardProps {
  event: Event;
  onDelete: (id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleDeleteClick = (eventId: number) => {
    setSelectedEventId(eventId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    if (selectedEventId !== null) {
      try {
        const response = await axios.delete(
          `${baseUrl}/events/${selectedEventId}`
        );
        toast.success(response.data.message);
        onDelete(selectedEventId);
        setOpenDialog(false);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  return (
    <>
      <Card sx={{ display: "flex", boxShadow: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: 200, height:200, borderRadius: 2 }}
          image={event.image ? event.image : eventsimg}
          alt={event.title}
        />
        <CardContent sx={{ flex: "1 0 auto", paddingLeft: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sm={6}>
              <Grid container display={"flex"}>
                <Grid item xs={12} md={10}>
                  <Typography
                    sx={{
                      fontFamily: "Syne",
                      fontSize: { xs: "18px", sm: "18px", md: "20px" },
                      fontWeight: "bold",
                    }}
                    variant="h3"
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "14px", sm: "18px" },
                      fontWeight: 400,
                    }}
                  >
                    {format(new Date(event.date), "MMMM d, yyyy")}
                  </Typography>
                  <Grid item xs={12} sm={4}>
                    <Typography
                      sx={{
                        fontFamily: "Syne",
                        fontSize: { xs: "16px", sm: "20px", md: "24px" },
                      }}
                      variant="h3"
                      color="error"
                      component="div"
                    >
                      ${event.ticketPrice}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Chip label={event.category.name} color="warning" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} sm={6}>
              <Box display="flex" flexDirection="column" height="100%"  >
                <Box flexGrow={1}>
                  <Typography
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "14px", sm: "18px" },
                      fontWeight: 400,
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {event.description}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ marginTop: 1 }}
                >
                  <Button
                    variant="text"
                    endIcon="→"
                    onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    endIcon="→"
                    onClick={() => handleDeleteClick(event.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          textAlign={"center"}
          fontWeight={"bold"}
        >
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Event? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventCard;
