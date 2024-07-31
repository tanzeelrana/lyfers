  import { Button, IconButton, Typography, Box, Container } from '@mui/material';
  import React from 'react';
  import FacebookIcon from '@mui/icons-material/Facebook';
  import YouTubeIcon from '@mui/icons-material/YouTube';
  import InstagramIcon from '@mui/icons-material/Instagram';
  import './Common.css';

  function Footer() {
    return (
      <>
        <div className="elementor-shape elementor-shape-top" data-negative="false">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path className="elementor-shape-fill" d="M194,99c186.7,0.7,305-78.3,306-97.2c1,18.9,119.3,97.9,306,97.2c114.3-0.3,194,0.3,194,0.3s0-91.7,0-100c0,0,0,0,0-0 L0,0v99.3C0,99.3,79.7,98.7,194,99z"></path>
          </svg>
        </div>
        <Box 
          width="100%" 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url("https://lyfers.com/wp-content/uploads/2024/05/AdobeStock_385837423-scaled-1.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 380,
          }}
        >
          <Box 
            component="img"
            marginTop={'80px'}
            sx={{ height: 40, width: 150, marginBottom: 2 }}
            alt="Logo"
            src="https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Lyfers_Color_OW.webp?w=1536&ssl=1"
          />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              marginBottom: 2,
            }}
          >
            <IconButton
              sx={{
                backgroundColor: 'black',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FacebookIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'black',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
              href="https://www.youtube.com"
              target="_blank"
              aria-label="YouTube"
            >
              <YouTubeIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'black',
                borderRadius: '50%',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <InstagramIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} /> {/* This Box pushes the Container to the bottom */}
          <Container
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1,
              marginBottom: 2,
              backgroundColor: 'black',
              height: 80,
              alignItems: 'center',
              padding: 1,
            }}
          >
            <Button
              sx={{
                color: 'white',
                fontFamily: '"Montserrat", Sans-serif',
                fontSize: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Home
            </Button>
            <Button
              sx={{
                color: 'white',
                fontFamily: '"Montserrat", Sans-serif',
                fontSize: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              The 6 Pillars
            </Button>
            <Button
              sx={{
                color: 'white',
                fontFamily: '"Montserrat", Sans-serif',
                fontSize: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Events
            </Button>
            <Button
              sx={{
                color: 'white',
                fontFamily: '"Montserrat", Sans-serif',
                fontSize: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Community
            </Button>
            <Button
              sx={{
                color: 'white',
                fontFamily: '"Montserrat", Sans-serif',
                fontSize: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Become A Lyfer
            </Button>
            <Button
              sx={{
                color: 'white',
                fontFamily: '"Montserrat", Sans-serif',
                fontSize: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Shop
            </Button>
          </Container>
        </Box>
        <Box width="100%" sx={{ backgroundColor: '#FF5413', paddingTop: '5px', paddingBottom: '5px' }}>
          <Typography sx={{ textAlign: 'center' }}>
            Copyright © 2024 LYFERS. All Rights Reserved.
          </Typography>
        </Box>
      </>
    );
  }

  export default Footer;
