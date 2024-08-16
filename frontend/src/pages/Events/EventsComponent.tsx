
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import eventImage from '../../assets/images/eventImage.png';
import { format } from 'date-fns';

interface Category {
    id: number;
    name: string;
}
interface EventsComponentProps {
    id:number;
    title: string;
    date: string;
    image: string;
    description: string;
    price: string;
    category: Category;
}

const EventsComponent: React.FC<EventsComponentProps> = ({
    id,
    title,
    date,
    image,
    description,
    price,
    category,
}) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} md={6}>
            <Box
                sx={{
                    borderRadius: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: 'auto',
                            }}
                        >
                            <img
                                src={eventImage}
                                alt="Event"
                                style={{
                                    width: '100%',
                                    height: '296px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                padding: 2,
                                borderRadius: '8px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxSizing: 'border-box',
                            }}
                        >
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{
                                    fontFamily: 'Outfit',
                                    fontSize: { xs: '18px', sm: '24px' },
                                    fontWeight: 600
                                }}>
                                    {title}
                                </Typography>
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
                                <Typography variant="body1" gutterBottom sx={{
                                    fontFamily: 'Outfit',
                                    fontSize: { xs: '14px', sm: '18px' },
                                    fontWeight: 400
                                }}>
                                      {format(new Date(date), 'MMMM d, yyyy')}
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{
                                    fontFamily: 'Syne',
                                    fontSize: { xs: '24px', sm: '30px' },
                                    fontWeight: 600,
                                    color: '#FF5A00'
                                }}>
                                    {price}
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{
                                    fontFamily: 'Outfit',
                                    fontSize: { xs: '14px', sm: '16px' },
                                }}>
                                    {description}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: 'auto',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Typography onClick={() => navigate(`/event-detail/${id}`)}
                                    color="text.secondary"
                                    sx={{
                                        fontFamily: 'Outfit',
                                        fontSize: { xs: '14px', sm: '16px' },
                                        fontWeight: 400,
                                        lineHeight: '40px',
                                        color: '#FBB03A',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    View Detail
                                    <ArrowRightAltIcon sx={{ color: '#FBB03A', fontSize: { xs: 24, sm: 34 }, ml: 1 }} />
                                </Typography>

                                <FavoriteBorderIcon sx={{ color: 'black', fontSize: { xs: 20, sm: 24 } }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default EventsComponent;
