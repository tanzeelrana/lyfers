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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: 'auto',
    }}
  >
    <Grid 
      container 
      height={isMobile ? 'auto' : 500}
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
                textAlign: isMobile ? 'center' : 'left'
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
            padding: isMobile ? '8px 16px' : '12px 24px'
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
