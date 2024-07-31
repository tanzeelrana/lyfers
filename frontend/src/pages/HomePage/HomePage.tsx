  import React, { FC } from "react";
  import { Box, Button, Typography, Container } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import HeroSection from "./HeroSection";
  import { useTheme, keyframes } from '@mui/material/styles';
  import SixPillerSlider from "./SixPillerSlider";
  import ProductSlider from "./ProductSlider";
  import ExploreSection from "./ExploreSection";

  const zoomIn = keyframes`
    0% {
      background-size: 100%;
    }
    100% {
      background-size: 120%;
    }
  `;

  const HomePage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
      <>
        <HeroSection />

        <Box width={'100%'} >
          <Typography 
            sx={{ 
              textAlign: 'center', 
              color: '#000000', 
              fontFamily: 'cursive', 
              fontSize: { xs: '28px', sm: '36px', md: '52px' }, 
              fontWeight: '400' 
            }}
          >
            Illuminating The World Through The Six Pillars
          </Typography>
        </Box>

        <SixPillerSlider></SixPillerSlider>

        <Box component="section" sx={{ p: 2 }}>
          <Container sx={{ backgroundColor: '#FAFAFA' }}>
            <Box
              sx={{
                backgroundImage: 'url("https://lyfers.com/wp-content/uploads/2024/05/AdobeStock_385837423-scaled-1.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: { xs: 150, sm: 200, md: 200 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                zIndex: 1200,
                animation: `${zoomIn} 3s infinite alternate`,
              }}
            />
            <Box>
              <Typography sx={{ textAlign: 'center', my: 3 }}>
                Get a deeper understanding of what Lyfers is all about and discover how our six pillars—Love, Youthfulness, Forgiveness, Empowerment, Resilience, and Strength—can positively impact your life!
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="contained">Learn More</Button>
            </Box>
          </Container>
        </Box>
        <ExploreSection/>
      <ProductSlider/>
      </>
    );
  };

  export default HomePage;
