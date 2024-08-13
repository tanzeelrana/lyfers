import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import eventsCover from '../../assets/images/eventsCover.png';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import eventImage from '../../assets/images/eventImage.png';
import EventsComponent from './EventsComponent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';

interface TabData {
    id: string;
    name: string;
}
interface Category {
    id: number;
    name: string;
}
interface EventData {
    id: string;
    title: string;
    date: string;
    image: string;
    description: string;
    price: string;
    category: Category;
}

export default function EventsPage() {
    const [value, setValue] = useState<string>('all');
    const [tabsData, setTabsData] = useState<TabData[]>([]);
    const [events, setEvents] = useState<EventData[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);

    useEffect(() => {
        // Fetch data from API using Axios
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3003/eventCategories');
                const categories = response.data;
                setTabsData([{ id: 'all', name: 'All' }, ...categories]);
                const eventResponse = await axios.get('http://localhost:3003/events');
                setEvents(eventResponse.data);
                setFilteredEvents(eventResponse.data);
            } catch (error) {
                console.error('Error fetching tab data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        
        const filtered = value === 'all'
            ? events
            : events.filter(event => event.category.id.toString() == value);
            setFilteredEvents(filtered);
    }, [value, events]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
                            backgroundImage: `url(${eventsCover})`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: { xs: '300px', sm: '500px', md: '762px' },
                        }}
                    >
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    sx={{
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: { xs: '10px', sm: '15px', md: '20px' },
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Syne',
                            fontSize: { xs: '20px', sm: '28px', md: '40px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '120%',
                        }}
                    >
                        Join Our Events
                    </Typography>
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={3} padding={{ xs: 2, sm: 3, md: 4 }}>
                <Grid item xs={12}>
                    <Box>
                        <TabContext value={value}>
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    display: 'inline-block',
                                    overflowX: 'auto',
                                    '@media (max-width:600px)': {
                                        width: '100%',
                                    },
                                    '@media (min-width:600px)': {
                                        width: 'auto',
                                    },
                                }}
                            >
                                <TabList
                                    onChange={handleChange}
                                    aria-label="lab API tabs example"
                                    sx={{
                                        '& .MuiTabs-flexContainer': {
                                            justifyContent: { xs: 'center', sm: 'flex-start' },
                                        },
                                    }}
                                >
                                    {tabsData.map(tab => (
                                        <Tab
                                            key={tab.id}
                                            sx={{
                                                typography: 'body1',
                                                fontFamily: 'Outfit',
                                                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                                fontWeight: 600
                                            }}
                                            label={tab.name}
                                            value={tab.id}
                                        />
                                    ))}
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>
                </Grid>

                {filteredEvents.map(event => (
                    <EventsComponent
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        image={event.image}
                        description={event.description}
                        price={event.price}
                        category={event.category}
                    />
                ))}
            </Grid>
        </Box>
    );
}
