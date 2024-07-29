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
import { Container, fontSize, maxHeight } from "@mui/system";
import HeroSection from "../heroSection/HeroSection";



const HomePage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    toast.success("Logout successfully");
    dispatch(logout());
    navigate("/login")
  }


  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/');
        console.log(response);
      } catch (error) {

      }
    };

    // Call the fetch function
    fetchData();
  }, []);



  return (
    <>
      {/* <HeroSection></HeroSection> */}
      {/* <Box sx={{margin:'50px'}}>
        <Typography sx={{textAlign:'center',color:'#000000',fontFamily:'cursive', fontSize:'52px', fontWeight:'400'}}>
        Illuminating The World Through The Six Pillars
        </Typography>
      </Box> */}
    </>
  );
};

export default HomePage;
