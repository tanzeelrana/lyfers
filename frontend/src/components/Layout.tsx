import Box from "@mui/material/Box";

import { Button, Grid, Typography } from "@mui/material";
import "./styles.scss";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


interface Props {
  window?: () => Window;
  children: any;
}

export default function Layout(props: Props) {
  const { window, children } = props;
  const navigate = useNavigate();
  const location = useLocation();


  const [activePath, setActivePath] = useState<string>("");
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
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
              bgcolor: "#ffece2",
              padding:'10px'
            }}
          >
            <Box>
            <Button
              onClick={() => navigate("/dashboard")}
              sx={{
                fontFamily: "Outfit",
                textTransform: 'capitalize',
                fontWeight: activePath === "/dashboard" ? "700" : "normal", 
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
                textTransform:'capitalize',
                fontWeight: activePath === "/dashboard" ? "700" : "normal", 

              }}
            >
              Account Detail
            </Button>
            </Box>
            <Box>
            <Box>
                <Button
                  onClick={() => navigate("/dashboard/wishlist")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/dashboard/wishlist" ? "700" : "normal", 
                  }}
                >
                  Wishlist
                </Button>
              </Box>
            </Box>
            <Box>
            <Button
              onClick={() => navigate("/dashboard/orders")}
              sx={{
                fontFamily: "Outfit",
                textTransform:'capitalize',
                fontWeight: activePath === "/dashboard/orders" ? "700" : "normal", 
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
                textTransform:'capitalize',
                fontWeight: activePath === "/dashboard" ? "700" : "normal", 
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
                textTransform:'capitalize',
                fontWeight: activePath === "/dashboard" ? "700" : "normal", 
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
