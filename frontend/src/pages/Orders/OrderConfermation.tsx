import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoBlackSvg from "../../assets/logos/LogoDefault.svg";

export default function OrderConfermation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const {
    orderNumber = "123456789",
    orderDate = "August 12, 2024",
    shippingAddress = "1234 Elm Street, Springfield, IL",
    billingAddress = "1234 Elm Street, Springfield, IL",
    items = [
      { name: "Product 1", quantity: 1, price: 19.99 },
      { name: "Product 2", quantity: 2, price: 29.99 },
    ],
    subtotal = 20,
    discount = 0,
    shippingCost = 5,
    tax = 5,
    grandTotal = 30,
  } = state || {};

  return (
    <Box width="100%">
      <Grid
        container
        width="100%"
        direction="column"
        padding={{ xs: 2, sm: 3, md: 4 }}
        rowSpacing={2}
        sx={{ marginBottom: "40px" }}
      >
        <Grid
          item
          xs={12}
          display="flex"
          sx={{
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: { xs: "10px", sm: "15px", md: "20px" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Syne",
              fontSize: { xs: "20px", sm: "28px", md: "40px" },
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "120%",
            }}
          >
            Order Confirmation
          </Typography>
        </Grid>
        <Container
          component="main"
          sx={{
            border: "1px solid",
            boxShadow: "2",
            borderRadius: "20px",
          }}
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            padding={{ xs: 2, sm: 3, md: 4 }}
          >
            <Grid item xs={12}>
              <Box display={"flex"} justifyContent={"center"}>
                <img
                  src={LogoBlackSvg}
                  alt="logo"
                  style={{ width: "40%", height: "auto" }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Outfit",
                    fontSize: { xs: "24px", sm: "28px", md: "32px" },
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Thank You for Ordering
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Outfit",
                    fontSize: { xs: "10px", sm: "14px", md: "18px" },
                    textAlign: "center",
                  }}
                >
                  The order confirmation has been sent to lorem.ipsum@gmail.com
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Transaction Date:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: "18px",
                }}
              >
                Monday, August 5, 2024
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Payment Method:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: "18px",
                }}
              >
                Visa Card ending with 5432
              </Typography>

              <Box mt={3}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Sub Total</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      $ {subtotal.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Discount</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      $ {discount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Shipping Cost</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      $ {shippingCost.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Tax</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      $ {tax.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6">Grand Total</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      $ {grandTotal.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={3} textAlign="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
}
