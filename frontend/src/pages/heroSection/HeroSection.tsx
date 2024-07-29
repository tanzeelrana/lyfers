import { FC, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../store/auth/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import Header from '../common/Header';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Container, fontSize, margin, maxHeight } from "@mui/system";



const HeroSection: FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     toast.success("Logout successfully");
//     dispatch(logout());
//     navigate("/login")
//   }




  return (
    <>
      {/* <Header></Header> */}
      <Box sx={{ backgroundImage: 'url("https://lyfers.com/wp-content/uploads/2024/05/AdobeStock_385837423-scaled-1.jpeg")'}}>
      <Grid container height={500}display={'flex'} justifyContent={'center'} alignItems={'center'} >
      <Grid container height={300} marginLeft={'150px'}>
        <Grid xl={1} lg={1} display={'flex'} justifyContent={'center'} alignItems={'center'} >
          <Typography sx={{borderLeft: '8px solid #FF5A00', height:'200px'}}> </Typography>
        </Grid>
        <Grid xl={11} lg={11} display={'flex'}  alignItems={'center'}>
          <Typography sx={{fontFamily:'"Urbanist", Sans-serif',fontSize:'39px',fontWeight:'500'}}>
          Love without limits, Youthful in spirit, Forgiving and free,<br></br> Empowering each other, Resilient and Strong against all odds.
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" size="large" sx={{color:'white', backgroundColor:'#FF5A00' ,fontWeight:'500'}}>Join us</Button>
     
      </Grid>
      </Box>
    </>
  );
};

export default HeroSection;
