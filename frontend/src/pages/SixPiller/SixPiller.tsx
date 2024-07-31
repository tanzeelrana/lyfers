    import React from 'react'
    import { Grid, Typography, Box } from '@mui/material';
    import { Container } from '@mui/system';

    export default function SixPiller() {
        return (
            <Box width={'100%'} height={'100%'} sx={{ 
                backgroundImage: 'url(https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/LYFERS-Collage.png?fit=2000%2C1600&ssl=1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment:'fixed'
            }}>
            <Grid
            container
            sx={{
                backgroundImage: 'url(https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Screenshot-2024-05-27-at-8.17.08%E2%80%AFPM.png?fit=1110%2C1162&ssl=1)', // Replace with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: { xs: 200, sm: 250, md: 300,lg:450,xl:450},
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 78,
                    left: 0,
                    width: '100%',
                    height: { xs: 200, sm: 250, md: 300,lg:40,xl:450},
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
                    zIndex: 1, // Ensure overlay is above background but below content
                },
                '& > *': {
                    position: 'relative',
                    zIndex: 2, // Ensure content is above the overlay
                },
            }}
            >
            <Grid item>
                <Typography variant="h1" sx={{ fontSize: '117px',fontWeight:800 ,fontFamily: 'Readex Pro, Sans-serif'}}>THE SIX PILLARS</Typography> 
            </Grid>
            </Grid>

            <Box sx={{ 
                flexGrow: 1,
                marginTop: 4,
                backgroundImage: 'url(https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/orchid-bg-34.jpg?fit=1500%2C853&ssl=1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',

            }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box marginLeft={23}>
                    <Typography variant="h4" component="h2" sx={{ marginBottom: 2}}>
                        Love
                    </Typography>
                    </Box> 
                    <Box
                    
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                    }}
                    >
                        
                    <Box
                        sx={{
                        border: '1px solid #ddd', 
                        borderRadius: '8px',
                        padding: 3,
                        // marginTop:5,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '500px',
                        width: '100%',
                        }}
                    >
                        <Typography variant="body1" sx={{fontStyle:'inherit',verticalAlign:'baseline'}}>
                        Love is the heart of LYFERS, the bedrock of its six guiding principles. It’s like the soil that lets the others grow. The love we talk about here is boundless, selfless, and heavenly. It’s the kind that never tires of giving and sacrificing for others.
                        <br></br> <br></br>Love is fresh like youth, forgiving like a gentle breeze, empowering like a guiding light, resilient like a sturdy tree, and strong like a mountain.
                        </Typography>
                    </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} marginBottom={3}>
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    }}
                >
                    <img
                    src="https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Love-2.png?w=1080&ssl=1" 
                    alt="Descriptive Alt Text"
                    style={{
                        borderTop: '20px solid #FF5A00', 
                        borderRight: '20px solid #FF5A00', 
                        borderRadius: '10px',
                        maxWidth: '100%',
                        height: 'auto', 
                        maxHeight: 400,
                    }}
                    />
                </Box>
                </Grid>
            </Grid>
            </Box>
            <Box sx={{ 
                paddingTop:'100px',
                flexGrow: 1,
                width: '100%',
                backgroundColor:'#FAFAFA'

            }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} my={5}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        }}
                    >
                        <img
                        src="https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Love-2.png?w=1080&ssl=1" 
                        alt="Descriptive Alt Text"
                        style={{
                            borderTop: '20px solid #FF5A00', 
                            borderLeft: '20px solid #FF5A00', 
                            borderRadius: '10px',
                            maxWidth: '100%',
                            height: 'auto', 
                            maxHeight: 400,
                        }}
                        />
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h4" component="h2" sx={{ marginBottom: 2}}>
                            Youthfulness
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            // display: 'flex',
                            // flexDirection: 'column',
                            // alignItems: 'center',
                            // justifyContent: 'center',
                            // padding: 4,
                        }}
                        >
                        <Box
                            sx={{
                            border: '1px solid #ddd', 
                            borderRadius: '8px',
                            padding: 3,
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            maxWidth: '500px',
                            width: '100%',
                            }}
                        >
                            <Typography variant="body1" sx={{fontStyle:'inherit',verticalAlign:'baseline'}}>
                            Youthfulness is the catalyst for a happy soul. It is the key organic ingredient within that translates to a long-lasting and healthy life. Youthfulness also allows us to keep our sense of playfulness and humor, which socially attract others. It keeps us active and alive, and therefore could be considered the gateway to the mysterious, yet resourceful, Fountain of Youth!
                            </Typography>
                        </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12} md={6} my={5}>
                <Box height={500}>

                </Box>
            </Grid>
            <Box sx={{ 
                flexGrow: 1,
                marginTop: 4,
                backgroundImage: 'url(https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/orchid-bg-34.jpg?fit=1500%2C853&ssl=1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',

            }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box marginLeft={23}>
                    <Typography variant="h4" component="h2" sx={{ marginBottom: 2}}>
                    Empowering
                    </Typography>
                    </Box> 
                    <Box
                    
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                    }}
                    >
                        
                    <Box
                        sx={{
                        padding: 3,
                        maxWidth: '500px',
                        width: '100%',
                        }}
                    >
                        <Typography variant="body1" sx={{fontStyle:'inherit',textAlign:'start'}}>
                        Empowering others is essential to empowering oneself. It gives a sense of purpose and belonging and showcases that our existence, in fact, matters. The positive energy empowerment exudes becomes our essential fuel to feed off
                        <br></br>
                        when times are difficult, and gives us the added boost necessary to push through the same.
                        </Typography>
                    </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} marginBottom={3}>
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    }}
                >
                    <img
                    src="https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Empower-1.png?w=1080&ssl=1" 
                    alt="Descriptive Alt Text"
                    style={{
                        borderTop: '20px solid #FF5A00', 
                        borderRight: '20px solid #FF5A00', 
                        borderRadius: '10px',
                        maxWidth: '100%',
                        height: 'auto', 
                        maxHeight: 400,
                    }}
                    />
                </Box>
                </Grid>
            </Grid>
            
            </Box>
            <Box sx={{ 
                paddingTop:'100px',
                flexGrow: 1,
                width: '100%',
                backgroundColor:'#FAFAFA'

            }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        }}
                    >
                        <img
                        src="https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/LYFERS-Collage.png?fit=2000%2C1600&ssl=1" 
                        alt="Descriptive Alt Text"
                        style={{
                            borderTop: '20px solid #FF5A00', 
                            borderLeft: '20px solid #FF5A00', 
                            borderRadius: '10px',
                            maxWidth: '100%',
                            width:700,
                            height: 'auto', 
                            maxHeight: 350,
                        }}
                        />
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h4" component="h2" sx={{ marginBottom: 2}}>
                            Resilient
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            // display: 'flex',
                            // flexDirection: 'column',
                            // alignItems: 'center',
                            // justifyContent: 'center',
                            // padding: 4,
                        }}
                        >
                        <Box
                            sx={{
                            padding: 3,
                            maxWidth: '500px',
                            width: '100%',
                            }}
                        >
                            <Typography variant="body1" sx={{fontStyle:'inherit',verticalAlign:'baseline',textAlign:'start'}}>
                            Resilience has been the underrated yet prominent answer to bouncing back from trials, tribulations, and uncomfortable experiences that all of us will encounter at some point.
                            <br></br>
                            Resilience enables us to stand still and stand tall amidst tumultuous times, and in the end, solidifies character, similar to the symbolic progression of change that occurs when a caterpillar transforms into a beautiful butterfly.                            </Typography>
                        </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ 
                flexGrow: 1,
                marginTop: 4,
                backgroundImage: 'url(https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/orchid-bg-34.jpg?fit=1500%2C853&ssl=1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',

            }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box marginLeft={23}>
                    <Typography variant="h4" component="h2" sx={{ marginBottom: 2}}>
                    Strength
                    </Typography>
                    </Box> 
                    <Box
                    
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                    }}
                    >
                        
                    <Box
                        sx={{
                        padding: 3,
                        maxWidth: '500px',
                        width: '100%',
                        textAlign: 'center',
                        }}
                    >
                        <Typography variant="body1" sx={{fontStyle:'inherit',textAlign:'start'}}>
                        Strength for the purpose of LYFERS is a testament to inner willpower that is achieved through perseverance. It gives us the power to overcome life’s challenges from within. Mental fortitude is exactly what many of us could appreciate with today’s current events. Luckily for us, there is a substantial amount of boldness and
                        </Typography>
                    </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} marginBottom={3}>
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    }}
                >
                    <img
                    src="https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Strength-1.png?w=1080&ssl=1" 
                    alt="Descriptive Alt Text"
                    style={{
                        borderTop: '20px solid #FF5A00', 
                        borderRight: '20px solid #FF5A00', 
                        borderRadius: '10px',
                        maxWidth: '100%',
                        height: 'auto', 
                        maxHeight: 400,
                    }}
                    />
                </Box>
                </Grid>
            </Grid>
            </Box>
        </Box>
            
        );
    }
