
// import React, { useState } from 'react'
// import { Button, Grid, Paper, Typography, IconButton } from '@mui/material'
// import { Box } from '@mui/system'
// import detailEventCover from '../../assets/images/detailEventCover.png'
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import EventsComponent from './EventsComponent';
// import { useNavigate } from 'react-router-dom';
// import teamImage from '../../assets/images/teamImage.png';

// export default function EventDetail() {
//     const navigate = useNavigate();

//     const ticketPrice = 50; // Price per ticket
//     const [count, setCount] = useState(0);
//     const [isDisabled, setIsDisabled] = useState(true);

//     // Calculate totals based on count and ticketPrice
//     const subtotal = count * ticketPrice;
//     const discount = 0;
//     const tax = subtotal * 0.1;
//     const grandTotal = subtotal - discount + tax;

//     const handleUpdate = () => {
//         if (count > 0) {
//             setIsDisabled(false);
//         }
//     };

//     const handleContinueToPayment = () => {
//         navigate('/payment-detail', {
//             state: {
//                 count,
//                 subtotal,
//                 discount,
//                 tax,
//                 grandTotal
//             }
//         });
//     };

//     const increment = () => setCount(count + 1);
//     const decrement = () => setCount(count > 0 ? count - 1 : 0);

//     return (
//         <Box width="100%" sx={{ flexGrow: 1, backgroundColor: '#FAFAFA' }}>
//             <Grid container width="100%" direction="column" padding={{ xs: 2, sm: 3, md: 4 }} rowSpacing={2} flexShrink={0}>
//                 <Grid item xs={12}>
//                     <Grid
//                         container
//                         borderRadius={{ xs: '20px', sm: '30px', md: '40px' }}
//                         justifyContent="center"
//                         alignItems="center"
//                         display="flex"
//                         flexShrink={0}
//                         padding={{ xs: 2, sm: 4, md: 6 }}
//                         sx={{
//                             backgroundImage: `url(${detailEventCover})`,
//                             backgroundPosition: 'center center',
//                             backgroundRepeat: 'no-repeat',
//                             backgroundSize: 'cover',
//                             height: { xs: '300px', sm: '500px', md: '762px' },
//                         }}
//                     >
//                     </Grid>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Grid container direction="row" spacing={3} padding={{ xs: 2, sm: 3, md: 4 }}>
//                         <Grid item xs={12} md={7}>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <Typography variant="body1" gutterBottom sx={{
//                                         fontFamily: 'Outfit',
//                                         fontSize: { xs: '14px', sm: '18px' },
//                                         fontWeight: 400
//                                     }}>
//                                         August 15, 2024
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography sx={{
//                                         fontFamily: 'Syne',
//                                         fontSize: { xs: '18px', sm: '28px', md: '40px' },
//                                         fontWeight: 'bold',
//                                     }} variant="h3">
//                                         LYFERS Annual Charity Meet Up
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Grid container spacing={1}>
//                                         <Grid item>
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '24px' },
//                                                 textAlign: 'center',
//                                             }}>
//                                                 ACM-001-E-M24
//                                             </Typography>
//                                         </Grid>
//                                         <Grid item>
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '14px' },
//                                                 fontWeight: 600,
//                                                 backgroundColor: '#FF5A00',
//                                                 width: 'fit-content',
//                                                 padding: '5px 10px',
//                                                 textAlign: 'center',
//                                                 borderRadius: '20px',
//                                                 color: 'white',
//                                             }}>
//                                                 Community Meetup
//                                             </Typography>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                                 <Grid item xs={12}>

//                                     <Grid container spacing={2} alignItems="center">
//                                         <Grid item>
//                                             <Typography
//                                                 sx={{
//                                                     fontFamily: 'Syne',
//                                                     fontSize: { xs: '16px', sm: '20px', md: '24px' },

//                                                 }}
//                                                 variant="h3"
//                                             >
//                                                 Price
//                                             </Typography>
//                                         </Grid>
//                                         <Grid item>
//                                             <Typography
//                                                 sx={{
//                                                     fontFamily: 'Syne',
//                                                     fontSize: { xs: '18px', sm: '28px', md: '40px' },
//                                                     fontWeight: 'bold',
//                                                     color: '#FF5A00',
//                                                 }}
//                                                 variant="h3"
//                                             >
//                                                 ${ticketPrice}
//                                             </Typography>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                                 <Grid item xs={12}>

//                                     <Grid container spacing={2} alignItems="center">
//                                         <Grid item>
//                                             <img
//                                                 src={teamImage}
//                                                 alt='IMAGE'
//                                                 style={{
//                                                     width: 'auto',
//                                                     height: 'auto',
//                                                     maxHeight: '40px',
//                                                 }}
//                                             />
//                                         </Grid>
//                                         <Grid item>
//                                             <Typography
//                                                 sx={{
//                                                     fontFamily: 'Outfit',
//                                                     fontSize: { xs: '12px', sm: '12px', md: '18px' },
//                                                 }}
//                                             >
//                                                 150+ LYFERS are coming to this event
//                                             </Typography>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Box display="flex" alignItems="center" justifyContent="flex-end">
//                                         <IconButton onClick={decrement} aria-label="decrement">
//                                             <RemoveIcon />
//                                         </IconButton>
//                                         <Typography variant="h6" sx={{ mx: 2 }}>
//                                             {count}
//                                         </Typography>
//                                         <IconButton onClick={increment} aria-label="increment">
//                                             <AddIcon />
//                                         </IconButton>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} textAlign="center">
//                                     <Button fullWidth size="large" variant="contained" onClick={handleUpdate} color="primary" type="submit" sx={{
//                                         padding: { xs: '10px', sm: '15px' }
//                                     }}>
//                                         Get Tickets Now
//                                     </Button>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Accordion defaultExpanded>
//                                         <AccordionSummary
//                                             expandIcon={<ExpandMoreIcon />}
//                                             aria-controls="panel1-content"
//                                             id="panel1-header"
//                                         >
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '18px' },
//                                                 fontWeight: 600,
//                                                 textAlign: 'center',
//                                             }}>
//                                                 Event Detail
//                                             </Typography>
//                                         </AccordionSummary>
//                                         <AccordionDetails>
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '18px' },
//                                             }}>
//                                                 The Satan Design T-Shirt offers an elevated crew neck style crafted from 100% premium cotton. This slim-fit garment features rib knit trims at the neckline, cuffs, and hem, providing a refined finish. The defining design element is the bold contrasting edging, making this shirt a standout piece in any wardrobe.
//                                             </Typography>
//                                         </AccordionDetails>
//                                     </Accordion>
//                                     <Accordion>
//                                         <AccordionSummary
//                                             expandIcon={<ExpandMoreIcon />}
//                                             aria-controls="panel1-content"
//                                             id="panel1-header"
//                                         >
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '18px' },
//                                                 fontWeight: 600,
//                                                 textAlign: 'center',
//                                             }}>
//                                                 Location Detail
//                                             </Typography>
//                                         </AccordionSummary>
//                                         <AccordionDetails>
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '18px' },
//                                             }}>
//                                                 The Satan Design T-Shirt offers an elevated crew neck style crafted from 100% premium cotton. This slim-fit garment features rib knit trims at the neckline, cuffs, and hem, providing a refined finish. The defining design element is the bold contrasting edging, making this shirt a standout piece in any wardrobe.
//                                             </Typography>
//                                         </AccordionDetails>
//                                     </Accordion>
//                                     <Accordion>
//                                         <AccordionSummary
//                                             expandIcon={<ExpandMoreIcon />}
//                                             aria-controls="panel1-content"
//                                             id="panel1-header"
//                                         >
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '18px' },
//                                                 fontWeight: 600,
//                                                 textAlign: 'center',
//                                             }}>
//                                                 Why join the Event?
//                                             </Typography>
//                                         </AccordionSummary>
//                                         <AccordionDetails>
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '18px' },
//                                             }}>
//                                                 The Satan Design T-Shirt offers an elevated crew neck style crafted from 100% premium cotton. This slim-fit garment features rib knit trims at the neckline, cuffs, and hem, providing a refined finish. The defining design element is the bold contrasting edging, making this shirt a standout piece in any wardrobe.
//                                             </Typography>
//                                         </AccordionDetails>
//                                     </Accordion>
//                                     <Accordion>
//                                         <AccordionSummary
//                                             expandIcon={<ExpandMoreIcon />}
//                                             aria-controls="panel1-content"
//                                             id="panel1-header"
//                                         >
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '18px' },
//                                                 fontWeight: 600,
//                                                 textAlign: 'center',
//                                             }}>
//                                                 About Lyfers
//                                             </Typography>
//                                         </AccordionSummary>
//                                         <AccordionDetails>
//                                             <Typography variant="body1" gutterBottom sx={{
//                                                 fontFamily: 'Outfit',
//                                                 fontSize: { xs: '12px', sm: '18px' },
//                                             }}>
//                                                 The Satan Design T-Shirt offers an elevated crew neck style crafted from 100% premium cotton. This slim-fit garment features rib knit trims at the neckline, cuffs, and hem, providing a refined finish. The defining design element is the bold contrasting edging, making this shirt a standout piece in any wardrobe.
//                                             </Typography>
//                                         </AccordionDetails>
//                                     </Accordion>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                         <Grid item xs={12} md={5}>
//                             <Paper
//                                 elevation={10}
//                                 sx={{
//                                     padding: { xs: 2, sm: 3, md: 4 },
//                                     backgroundColor: '#FFE7DB',
//                                     border: '1px solid',
//                                     borderRadius: '15px',
//                                     opacity: isDisabled ? 0.5 : 1, // Adjust opacity to indicate disabled state
//                                 }}
//                             >
//                                 <Grid container alignItems="center" spacing={4}>
//                                     <Grid item xs={12} sm={6}>
//                                         <Typography variant="body1">Your Order</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6} container justifyContent="flex-end">
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <Typography variant="body1" gutterBottom sx={{
//                                             fontFamily: 'Outfit',
//                                             fontSize: { xs: '12px', sm: '24px' },
//                                             fontWeight: 600,
//                                         }}>
//                                             Tickets x {count}
//                                         </Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6} container justifyContent="flex-end">
//                                         <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <Typography variant="body1">Subtotal</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6} container justifyContent="flex-end">
//                                         <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <Typography variant="body1">Discount</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6} container justifyContent="flex-end">
//                                         <Typography variant="body1">${discount.toFixed(2)}</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <Typography variant="body1">Tax</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6} container justifyContent="flex-end">
//                                         <Typography variant="body1">${tax.toFixed(2)}</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <Typography variant="body1">Grand Total</Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm={6} container justifyContent="flex-end">
//                                         <Typography variant="body1" gutterBottom sx={{
//                                             fontFamily: 'Outfit',
//                                             fontSize: { xs: '12px', sm: '24px' },
//                                             fontWeight: 600,
//                                         }}>
//                                             ${grandTotal.toFixed(2)}
//                                         </Typography>
//                                     </Grid>
//                                     <Grid item xs={12} textAlign="center">
//                                         <Button
//                                             fullWidth
//                                             size="large"
//                                             variant="contained"
//                                             color="primary"
//                                             type="button"
//                                             disabled={isDisabled}
//                                             onClick={handleContinueToPayment}
//                                             sx={{
//                                                 padding: { xs: '10px', sm: '15px' }
//                                             }}
//                                         >
//                                             Continue to Payment
//                                         </Button>
//                                     </Grid>
//                                 </Grid>
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid
//                     item
//                     xs={12}
//                     display="flex"
//                     sx={{
//                         gap: '10px',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         marginBottom: { xs: '10px', sm: '15px', md: '20px' },
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             fontFamily: 'Syne',
//                             fontSize: { xs: '20px', sm: '28px', md: '40px' },
//                             fontStyle: 'normal',
//                             fontWeight: 700,
//                             lineHeight: '120%',
//                         }}
//                     >
//                         More Events
//                     </Typography>
//                 </Grid>
//                 {/* <Grid item xs={12} >
//                     <Carousel autoPlay={true}
//                         showThumbs={false} swipeScrollTolerance={1}
//                         infiniteLoop={true}
//                         emulateTouch={true} >
//                         <Grid container xs={12} spacing={3}>
//                             <EventsComponent />
//                             <EventsComponent />
//                         </Grid>
//                         <Grid container xs={12} spacing={3}>
//                             <EventsComponent />
//                             <EventsComponent />
//                         </Grid>
//                         <Grid container xs={12} spacing={3}>
//                             <EventsComponent />
//                             <EventsComponent />
//                         </Grid>
//                     </Carousel>
//                 </Grid> */}
//             </Grid>
//         </Box>
//     )
// }
import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import detailEventCover from '../../assets/images/detailEventCover.png';
import teamImage from '../../assets/images/teamImage.png';
import { format } from 'date-fns';


// Define TypeScript interface for Event
interface Category {
    id: number;
    name: string;
}
interface Event {
    id: number;
    title: string;
    date: string;
    description: string;
    ticketPrice: number;
    location: string;
    about: string;
    category: Category;
}

export default function EventDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [count, setCount] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

    // Fetch event data on component mount
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get<Event>(`http://localhost:3003/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEvent();
    }, [id]);

    // Ensure event data is available before proceeding
    if (!event) {
        return <Typography justifyContent={'center'} display={'flex'} alignItems={'center'}>Loading...</Typography>;
    }

    const { title, date, ticketPrice, description, location, about, category } = event;

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
        navigate('/payment-detail', {
            state: {
                count,
                subtotal,
                discount,
                tax,
                grandTotal
            }
        });
    };

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);

    return (
        <Box width="100%" sx={{ flexGrow: 1, backgroundColor: '#FAFAFA' }}>
            <Grid container width="100%" direction="column" padding={{ xs: 2, sm: 3, md: 4 }} rowSpacing={2} flexShrink={0}>
                <Grid item xs={12}>
                    <Grid
                        container
                        borderRadius={{ xs: '20px', sm: '30px', md: '40px' }}
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        flexShrink={0}
                        padding={{ xs: 2, sm: 4, md: 6 }}
                        sx={{
                            backgroundImage: `url(${detailEventCover})`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: { xs: '300px', sm: '500px', md: '762px' },
                        }}
                    >
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" spacing={3} padding={{ xs: 2, sm: 3, md: 4 }}>
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom sx={{
                                        fontFamily: 'Outfit',
                                        fontSize: { xs: '14px', sm: '18px' },
                                        fontWeight: 400
                                    }}>
                                        {format(new Date(date), 'MMMM d, yyyy')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{
                                        fontFamily: 'Syne',
                                        fontSize: { xs: '18px', sm: '28px', md: '40px' },
                                        fontWeight: 'bold',
                                    }} variant="h3">
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '14px' },
                                                fontWeight: 600,
                                                backgroundColor: '#FF5A00',
                                                width: 'fit-content',
                                                padding: '5px 10px',
                                                textAlign: 'center',
                                                borderRadius: '20px',
                                                color: 'white',
                                            }}>
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
                                                    fontFamily: 'Syne',
                                                    fontSize: { xs: '16px', sm: '20px', md: '24px' },
                                                }}
                                                variant="h3"
                                            >
                                                Price
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Syne',
                                                    fontSize: { xs: '18px', sm: '28px', md: '40px' },
                                                    fontWeight: 'bold',
                                                    color: '#FF5A00',
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
                                                alt='IMAGE'
                                                style={{
                                                    width: 'auto',
                                                    height: 'auto',
                                                    maxHeight: '40px',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Outfit',
                                                    fontSize: { xs: '12px', sm: '12px', md: '18px' },
                                                }}
                                            >
                                                150+ LYFERS are coming to this event
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" justifyContent="flex-end">
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
                                    <Button fullWidth size="large" variant="contained" onClick={handleUpdate} color="primary" type="submit" sx={{
                                        padding: { xs: '10px', sm: '15px' }
                                    }}>
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
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '18px' },
                                                fontWeight: 600,
                                                textAlign: 'center',
                                            }}>
                                                Event Detail
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '18px' },
                                            }}>
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
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '18px' },
                                                fontWeight: 600,
                                                textAlign: 'center',
                                            }}>
                                                Location
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '18px' },
                                            }}>
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
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '18px' },
                                                fontWeight: 600,
                                                textAlign: 'center',
                                            }}>
                                                Why Join the Event?
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '18px' },
                                            }}>
                                                The Satan Design T-Shirt offers an elevated crew neck style crafted from 100% premium cotton. This slim-fit garment features rib knit trims at the neckline, cuffs, and hem, providing a refined finish. The defining design element is the bold contrasting edging, making this shirt a standout piece in any wardrobe.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '18px' },
                                                fontWeight: 600,
                                                textAlign: 'center',
                                            }}>
                                                About Lyfers
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body1" gutterBottom sx={{
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '12px', sm: '18px' },
                                            }}>
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
                                    backgroundColor: '#FFE7DB',
                                    border: '1px solid',
                                    borderRadius: '15px',
                                    opacity: isDisabled ? 0.5 : 1, 
                                }}
                            >
                                <Grid container alignItems="center" spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1">Your Order</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1" gutterBottom sx={{
                                            fontFamily: 'Outfit',
                                            fontSize: { xs: '12px', sm: '24px' },
                                            fontWeight: 600,
                                        }}>
                                            Tickets x {count}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                        <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1">Subtotal</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                        <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1">Discount</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                        <Typography variant="body1">${discount.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1">Tax</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                        <Typography variant="body1">${tax.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1">Grand Total</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                        <Typography variant="body1" gutterBottom sx={{
                                            fontFamily: 'Outfit',
                                            fontSize: { xs: '12px', sm: '24px' },
                                            fontWeight: 600,
                                        }}>
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
                                                padding: { xs: '10px', sm: '15px' }
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
        </Box>
    );
}

