import { FC, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';

const HeroSection: FC = () => {  
  const theme = useTheme();

const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

return (
  <Box 
    sx={{ 
      backgroundImage: 'url("https://lyfers.com/wp-content/uploads/2024/05/AdobeStock_385837423-scaled-1.jpeg")',
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "relative",
      height: "550px", // Adjust height as needed
      "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
          zIndex: 1,
      },
    }}
  >
    <Grid 
      container 
      height={isMobile ? 'auto' : 600}
      display={'flex'}
      alignItems={'center'}
      flexDirection={isMobile ? 'column' : 'row'}
      spacing={isMobile ? 2 : 0}
    >
      <Grid 
        item 
        xs={12} 
        md={8} 
        display={'flex'} 
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid 
          container
          spacing={isMobile ? 2 : 0}
          marginLeft={isMobile ? 0 : '150px'}
          zIndex={3}
        >
          <Grid 
            item 
            xs={12} 
            md={1} 
            display={'flex'} 
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography 
              sx={{
                borderLeft: '8px solid #FF5A00',
                height: isMobile ? '100px' : '200px',
                display: isMobile ? 'none' : 'block'
              }}
            >
            </Typography>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={11} 
            display={'flex'} 
            alignItems={'center'}
          >
            <Typography 
              sx={{
                fontFamily: '"Urbanist", Sans-serif',
                fontSize: isMobile ? '24px' : '39px',
                fontWeight: '500',
                textAlign: isMobile ? 'center' : 'left',
                color:'white',
              }}
            >
              Love without limits, Youthful in spirit, Forgiving and free,<br /> Empowering each other, Resilient and Strong against all odds.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid 
        item 
        xs={12} 
        display={'flex'} 
        justifyContent={'center'}
        marginTop={isMobile ? 2 : 0}
      >
        <Button 
        
          variant="contained" 
          size={isMobile ? 'medium' : 'large'} 
          sx={{
            color: 'white', 
            backgroundColor: '#FF5A00', 
            fontWeight: '500',
            padding: isMobile ? '8px 16px' : '17px 45px',
            zIndex: 2,
          }}
        >
          Join us
        </Button>
      </Grid>
    </Grid>
  </Box>
);
}


export default HeroSection;
