import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import EventCard from './EventCard';
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import baseUrl from '../../../config/apiConfig';
import { useNavigate } from 'react-router-dom';

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

const AllEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate  = useNavigate()

  // Fetch events from API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {

        const response = await axios.get<Event[]>(`${baseUrl}/events`);
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const handleEventDelete = (deletedEventId: number) => {
    setEvents(events.filter(event => event.id !== deletedEventId));
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    );
  }

  return (
    <div>
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
                All Events
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <Grid container justifyContent={"space-between"} marginBottom={3}>
            <Grid item alignItems={"center"} display={"flex"}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: { xs: "20px" },
                  fontWeight: "bold",
                }}
              >
                All Events
              </Typography>
            </Grid>
            <Grid item display={"flex"}  justifyContent={"flex-end"} gap={2}>
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
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
                onClick={() => navigate('/admin/events/create')}

              >
                Add New Event
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Event Listing */}
        <Grid container spacing={2}>
          {filteredEvents.length > 0 ? (
          filteredEvents.map((event: Event) => (
            <Grid item xs={12} key={event.id}>
              <EventCard event={event} onDelete={handleEventDelete} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No Event Found
            </Typography>
          </Grid>
        )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AllEvents;

