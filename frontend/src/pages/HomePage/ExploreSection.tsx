  import React from 'react'
  import { Box, Button, Grid, Typography, Paper, Container } from "@mui/material";
  import { useTheme, keyframes } from '@mui/material/styles';

  export default function ExploreSection() {

  const zoomIn = keyframes`
    0% {
      background-size: 100%;
    }
    100% {
      background-size: 120%;
    }
  `;
    return (
      <Box component="section" sx={{ p: 4, backgroundColor: '#FAFAFA', marginTop: '80px' }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundImage: 'url("https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Image-6-17-24-at-8.44-PM.jpg?fit=1024%2C758&ssl=1")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: { xs: 200, sm: 250, md: 300 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                zIndex: 1200,
                animation: `${zoomIn} 3s infinite alternate`,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center', my: 3 }}>
            <Typography sx={{ fontSize: { xs: '20px', sm: '24px' }, fontWeight: 800 }} variant="h4" gutterBottom>
              Explore Our Products
            </Typography>
            <Button size="large" variant="contained">Shop</Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
  }
