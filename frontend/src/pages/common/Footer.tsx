import { Button, IconButton, Typography } from '@mui/material'
import { Box, Container, textAlign } from '@mui/system'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <>
  <Box
      sx={{
        backgroundImage: 'url("https://lyfers.com/wp-content/uploads/2024/05/AdobeStock_385837423-scaled-1.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2, // Add padding as needed
        bottom: 0,
        left: 0,
        zIndex: 1200, // Ensure the footer is on top
      }}
    >
        <Box>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
	<path></path>
</svg>
        </Box>
      <Box
        component="img"
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
        >
          <InstagramIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          marginBottom: 2,
          backgroundColor:'black',
          height:80
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
          The 6 Pillers
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
    <Box sx={{backgroundColor:'#FF5413', padding:'8px'}}>
        <Typography sx={{textAlign:'center'}}>
        Copyright © 2024 LYFERS. All Rights Reserved.
        </Typography>
    </Box>
    </>
  );
}

export default Footer