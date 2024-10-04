import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles.scss";

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { window, children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine the active path
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <Container maxWidth="xl">
      <Box>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12} md={3} marginTop={{ xs: 4, md: 16 }}>
            <Box
              sx={{
                width: "auto",
                borderRadius: 5,
                border: "1px solid",
                bgcolor: "#ffece2",
                padding: '10px',
              }}
            >
              <Box>
                <Button
                  onClick={() => navigate("/admin/dashboard")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/admin/dashboard" ? "700" : "normal", 
                  }}
                >
                  Admin Dashboard
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => navigate("/admin/orders")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/admin/orders" ? "700" : "normal", 
                  }}
                >
                  Orders
                </Button>
              </Box>

              <Box>
                <Button
                  onClick={() => navigate("/admin/products")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/admin/products" ? "700" : "normal", 
                  }}
                >
                  Products
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => navigate("/admin/events")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/admin/events" ? "700" : "normal", 
                  }}
                >
                  Events
                </Button>
              </Box>

              <Box>
                <Button
                  onClick={() => navigate("/admin/sub-categories")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/admin/sub-categories" ? "700" : "normal", 
                  }}
                >
                  Categories
                </Button>
              </Box>

              <Box>
                <Button
                  onClick={() => navigate("/admin/colors")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/admin/colors" ? "700" : "normal", 
                  }}
                >
                  Colors
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => navigate("/admin/posts")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/admin/posts" ? "700" : "normal", 
                  }}
                >
                  Events
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => navigate("/admin/testimonials")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/admin/testimonials" ? "700" : "normal", 
                  }}
                >
                  Testimonials
                </Button>
              </Box>

              <Box>
                <Button
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    fontFamily: "Outfit",
                    textTransform: 'capitalize',
                    fontWeight: activePath === "/dashboard" ? "700" : "normal", 
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box>{children}</Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
