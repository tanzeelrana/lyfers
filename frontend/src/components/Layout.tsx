import Box from "@mui/material/Box";

import { Button, Grid, Typography } from "@mui/material";
import "./styles.scss";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";


interface Props {
  window?: () => Window;
  children: any;
}



export default function Layout(props: Props) {
  const { window, children } = props;
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
    <Box>
      <Grid
        container
        direction="row"
        spacing={1}
        
      >
        <Grid item xs={12} md={3} marginTop={{xs:4, md:16}}>
          <Box
            sx={{
              width: "auto",
              borderRadius: 5,
              border: "1px solid",
              bgcolor: "#FFB892",
              padding:'10px'
            }}
          >
            <Box>
            <Button
              onClick={() => navigate("/dashboard")}
              sx={{
                fontFamily: "Outfit",
                textTransform:'capitalize'
              }}
            >
              Dashboard
            </Button>
            </Box>
            <Box>
            <Button
              onClick={() => navigate("/dashboard")}
              sx={{
                fontFamily: "Outfit",
                textTransform:'capitalize'
              }}
            >
              Account Detail
            </Button>
            </Box>
            <Box>
            <Button
              onClick={() => navigate("/dashboard")}
              sx={{
                fontFamily: "Outfit",
                textTransform:'capitalize'
              }}
            >
              Wishlist
            </Button>
            </Box>
            <Box>
            <Button
              onClick={() => navigate("/dashboard")}
              sx={{
                fontFamily: "Outfit",
                textTransform:'capitalize'
              }}
            >
              Orders
            </Button>
            </Box>
            <Box>
            <Button
              onClick={() => navigate("/dashboard")}
              sx={{
                fontFamily: "Outfit",
                textTransform:'capitalize'
              }}
            >
              Payment Details
            </Button>
            </Box>
            <Box>
            <Button
              onClick={() => navigate("/dashboard")}
              sx={{
                fontFamily: "Outfit",
                textTransform:'capitalize'
              }}
            >
              Logout
            </Button>
            </Box>
          
            
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box >{children}</Box>
        </Grid>
      </Grid>
    </Box>
  </Container>

  );
}
