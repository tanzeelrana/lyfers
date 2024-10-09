import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography, IconButton, CircularProgress } from "@mui/material";
import { Box, Container } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import detailEventCover from "../../assets/images/detailEventCover.png";
import teamImage from "../../assets/images/teamImage.png";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { handleApiError } from "../../pages/common/Api-error-handler";
import { toast } from "react-toastify";
import baseUrl from "../../config/apiConfig";
import { logout } from "../../store/auth/actions";
import EventsPage from "./EventsPage";
import EventsComponent from "./EventsComponent";

// Define TypeScript interface for Event
interface Category {
  id: number;
  name: string;
}
interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
  ticketPrice: number;
  location: string;
  about: string;
  category: Category;
}
interface EventData {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
  price: string;
  category: Category;
}

export default function EventDetail() {
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const [events, setEvents] = useState<EventData[]>([]);


  // Fetch event data on component mount
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<Event>(`${baseUrl}/events/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        setEvent(response.data);

        const eventResponse = await axios.get(`${baseUrl}/events/upcoming`);
        setEvents(eventResponse.data);
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

    fetchEvent();
  }, [id]);

  // Ensure event data is available before proceeding
  if (!event) {
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

  const {
    title,
    date,
    ticketPrice,
    description,
    location,
    about,
    category,
    image,
  } = event;

  // Calculate totals based on count and ticketPrice
  const subtotal = count * ticketPrice;
  const discount = 0;
  const tax = subtotal * 0.1;
  const grandTotal = subtotal - discount + tax;

  const handleUpdate = () => {
    if (count > 0) {
      setIsDisabled(false);
    }
  };

  const handleContinueToPayment = () => {
    navigate("/payment-detail", {
      state: {
        orderType: "event",
        currentUser: currentUser,
        paymentDetail: {
          count: count,
          discount: discount,
          tax: tax,
          subtotal: grandTotal,
          total: subtotal - discount + tax,
        },
      },
    });
  };

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={11} md={11} lg={11} xl={9.2}>
          <Box
            borderRadius={{ xs: "20px", sm: "30px", md: "40px" }}
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexShrink={0}
            padding={{ xs: 2, sm: 4, md: 6 }}
            sx={{
              backgroundImage: `url(${image ? image : detailEventCover})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: { xs: "200px", sm: "400px", md: "700px" },
              margin: "40px 0px",
            }}
          ></Box>
        </Grid>
      </Grid>
      <Container maxWidth={"xl"}>
        <Grid
          container
          width="100%"
          direction="column"
          rowSpacing={2}
          flexShrink={0}
          sx={{ margin: "40px 0px" }}
        >
          <Grid item xs={12}>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: { xs: "14px", sm: "18px" },
                        fontWeight: 400,
                      }}
                    >
                      {format(new Date(date), "MMMM d, yyyy")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "Syne",
                        fontSize: { xs: "18px", sm: "28px", md: "40px" },
                        fontWeight: "bold",
                      }}
                      variant="h3"
                    >
                      {title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "14px" },
                            fontWeight: 600,
                            backgroundColor: "#FF5A00",
                            width: "fit-content",
                            padding: "5px 10px",
                            textAlign: "center",
                            borderRadius: "20px",
                            color: "white",
                          }}
                        >
                          {category.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontFamily: "Syne",
                            fontSize: { xs: "16px", sm: "20px", md: "24px" },
                          }}
                          variant="h3"
                        >
                          Price
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{
                            fontFamily: "Syne",
                            fontSize: { xs: "18px", sm: "28px", md: "40px" },
                            fontWeight: "bold",
                            color: "#FF5A00",
                          }}
                          variant="h3"
                        >
                          ${ticketPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <img
                          src={teamImage}
                          alt="IMAGE"
                          style={{
                            width: "auto",
                            height: "auto",
                            maxHeight: "40px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "12px", md: "18px" },
                          }}
                        >
                          150+ LYFERS are coming to this event
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <IconButton onClick={decrement} aria-label="decrement">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="h6" sx={{ mx: 2 }}>
                        {count}
                      </Typography>
                      <IconButton onClick={increment} aria-label="increment">
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleUpdate}
                      color="primary"
                      type="submit"
                      sx={{
                        padding: { xs: "10px", sm: "15px" },
                      }}
                    >
                      Get Tickets Now
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "18px" },
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Event Detail
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "18px" },
                          }}
                        >
                          {description}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "18px" },
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Location
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "18px" },
                          }}
                        >
                          {location}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "18px" },
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Why Join the Event?
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "18px" },
                          }}
                        >
                          The Satan Design T-Shirt offers an elevated crew neck
                          style crafted from 100% premium cotton. This slim-fit
                          garment features rib knit trims at the neckline,
                          cuffs, and hem, providing a refined finish. The
                          defining design element is the bold contrasting
                          edging, making this shirt a standout piece in any
                          wardrobe.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "18px" },
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          About Lyfers
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: "Outfit",
                            fontSize: { xs: "12px", sm: "18px" },
                          }}
                        >
                          {about}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper
                  elevation={10}
                  sx={{
                    padding: { xs: 2, sm: 3, md: 4 },
                    backgroundColor: "#FFE7DB",
                    border: "1px solid",
                    borderRadius: "15px",
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    spacing={{ xs: 1, md: 4 }}
                  >
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">Your Order</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      container
                      justifyContent="flex-end"
                    ></Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{
                          fontFamily: "Outfit",
                          fontSize: { xs: "12px", sm: "24px" },
                          fontWeight: 600,
                        }}
                      >
                        Tickets x {count}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      container
                      justifyContent="flex-end"
                    >
                      <Typography variant="body1">
                        ${subtotal.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">Subtotal</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      container
                      justifyContent="flex-end"
                    >
                      <Typography variant="body1">
                        ${subtotal.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">Discount</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      container
                      justifyContent="flex-end"
                    >
                      <Typography variant="body1">
                        ${discount.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">Tax</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      container
                      justifyContent="flex-end"
                    >
                      <Typography variant="body1">${tax.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">Grand Total</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      container
                      justifyContent="flex-end"
                    >
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{
                          fontFamily: "Outfit",
                          fontSize: { xs: "12px", sm: "24px" },
                          fontWeight: 600,
                        }}
                      >
                        ${grandTotal.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        type="button"
                        disabled={isDisabled}
                        onClick={handleContinueToPayment}
                        sx={{
                          padding: { xs: "10px", sm: "15px" },
                        }}
                      >
                        Continue to Payment
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container direction="column" flexShrink={0}>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  marginBottom: { xs: "10px", sm: "15px", md: "20px" },
                  padding: { xs: "8px", sm: "12px", md: "16px" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Syne",
                    fontSize: { xs: "16px", sm: "24px", md: "32px" },
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "120%",
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  Upcoming Events
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        <Grid
          container
          direction="row"
          spacing={3}
          padding={{ xs: 2, sm: 3, md: 4 }}
          marginBottom={6}
        >

          {events.length === 0 ? (
            
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              height="30vh"
            >
              <Typography variant="h6">Records not found</Typography>
            </Grid>
          ) : (
            events.map((event) => (
              <EventsComponent
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                image={event.image}
                description={event.description}
                price={event.price}
                category={event.category}
              />
            ))
          )}
        </Grid>
      </Container>
    </>
  );
}
