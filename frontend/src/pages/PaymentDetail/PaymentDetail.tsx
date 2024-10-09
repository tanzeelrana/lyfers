import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../../config/apiConfig";
import { toast } from "react-toastify";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { handleApiError } from "../common/Api-error-handler";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/actions";

interface PayPalOnApproveData {
  orderID: string;
}

export default function PaymentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = location.state?.cartItems || [];
  const currentUser = location.state?.currentUser;
  const paymentDetail = location.state?.paymentDetail;
  const shipping_address = location.state?.shipping_address;
  const orderType = location.state?.orderType;

  const count = paymentDetail.count;
  const subtotal = paymentDetail.subtotal;
  const discount = paymentDetail.discount;
  const tax = paymentDetail.tax;
  const grandTotal = paymentDetail.total;

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [venmoUsername, setVenmoUsername] = useState("");
  const [shippingCost] = useState(10);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(discount);
  const [total, setTotal] = useState(grandTotal);
  const [orderID, setOrderID] = useState<string | null>(null);
  const dispatch =useDispatch();

  const [errors, setErrors] = useState({
    paypalEmail: "",
    venmoUsername: "",
    discountCode: "",
  });

  // Example discount code and its value
  const DISCOUNT_CODE = "SAVE20";
  const DISCOUNT_VALUE = 20; // $20 off for the code SAVE20

  useEffect(() => {
    // Recalculate total when subtotal, applied discount, tax, or shipping cost changes
    const calculatedTotal = subtotal - appliedDiscount + tax + shippingCost;
    setTotal(calculatedTotal);
  }, [subtotal, appliedDiscount, tax, shippingCost]);


  const handleApplyDiscount = () => {
    if (discountCode === DISCOUNT_CODE) {
      setAppliedDiscount(DISCOUNT_VALUE);
    } else {
      setErrors({ ...errors, discountCode: "Invalid discount code" });
    }
  };

  const handleSubmit = async (paymentData: []) => {
    const orderData = {
      orderType: orderType,
      userId: currentUser.user?.id,
      totalAmount: total,
      shippingAddress: JSON.stringify(shipping_address),
      paymentDtails: paymentData,
      cartItems: cartItems,
    };

    try {
      // Call the order creation API
      const response = await axios.post(`${baseUrl}/orders`, orderData,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`, 
        },
      }
      );
      toast.success(response.data.message);

      // Navigate to the order confirmation page with relevant state data
      navigate("/order-confermation", {
        state: {
          count,
          subtotal,
          discount,
          tax,
          grandTotal: total, // Use calculated total
          orderId: response.data.orderId,
        },
      });
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
        toast.error(message);
        if (navigateTo) {
          if (navigateTo == "login") {
            dispatch(logout());
          }
          navigate(`/${navigateTo}`);
        }
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (): Promise<string> => {
    try {
      const orderData = {
        orderType: orderType,
        userId: currentUser.user?.id,
        totalAmount: total,
        shippingAddress: JSON.stringify(shipping_address),
        cartItems: cartItems,
      };
      const response = await axios.post(
        `${baseUrl}/orders/create-order-payment`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`, 
          },
        }
      );
      const data = await response.data;

      if (!data.id) {
        throw new Error("Order ID is missing from the response.");
      }

      setOrderID(data.id);
      return data.id;
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
        toast.error(message);
        if (navigateTo) {
          if (navigateTo == "login") {
            dispatch(logout());
          }
          navigate(`/${navigateTo}`);
        }
      throw error;
    }
  };

  // On approval function
  const onApprove = async (data: PayPalOnApproveData): Promise<void> => {
    try {
      const response = await fetch(
        `${baseUrl}/orders/create-order-payment-captured`,
        {
          method: "POST",
          body: JSON.stringify({
            orderID: data.orderID,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`, 
            }
        }
      );
      const result = await response.json();
      handleSubmit(result);
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo == "login") {
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
    }
  };
  return (
    <Container maxWidth={"xl"}>
      <Grid container width="100%" direction="column" rowSpacing={2}>
        <Grid
          item
          xs={12}
          display="flex"
          sx={{
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            margin: "40px 0px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Syne",
              fontSize: { xs: "20px", sm: "28px", md: "40px" },
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "120%",
            }}
          >
            Payment Details
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={3}
          sx={{ marginBottom: "40px" }}
        >
          <Grid item xs={12} md={7}>
            <Grid container direction="column" rowGap={3}>
              <Grid
                item
                xs={12}
                sx={{
                  border: "0.5px solid",
                  borderRadius: "20px",
                  padding: 2,
                }}
              >
                <Typography textAlign={"center"} variant="h6">
                  Select Payment Method
                </Typography>
                {/* <form onSubmit={handleSubmit}>
                    
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup
                        aria-label="payment-method"
                        name="payment-method"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <Box mb={2} display="flex" flexDirection="column">
                          <FormControlLabel
                            value="creditCard"
                            control={<Radio />}
                            label="Credit Card" 
                          />
                          {paymentMethod === "creditCard" && (
                            <Box mt={1} padding={4} bgcolor="background.paper">
                              <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
                            </Box>
                          )}
                        </Box>

                        <Box mb={2} display="flex" flexDirection="column">
                          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                          {paymentMethod === "paypal" && (
                            <Box mt={1} padding={2} bgcolor="background.paper">
                              <Typography variant="h6">PayPal Information</Typography>
                              <TextField
                                label="PayPal Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={paypalEmail}
                                onChange={(e) => setPaypalEmail(e.target.value)}
                                error={!!errors.paypalEmail}
                                helperText={errors.paypalEmail}
                              />
                            </Box>
                          )}
                        </Box>

                        <Box mb={2} display="flex" flexDirection="column">
                          <FormControlLabel value="venmo" control={<Radio />} label="Venmo" />
                          {paymentMethod === "venmo" && (
                            <Box mt={1} padding={2} bgcolor="background.paper">
                              <Typography variant="h6">Venmo Information</Typography>
                              <TextField
                                label="Venmo Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={venmoUsername}
                                onChange={(e) => setVenmoUsername(e.target.value)}
                                error={!!errors.venmoUsername}
                                helperText={errors.venmoUsername}
                              />
                            </Box>
                          )}
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </form> */}
                <PayPalScriptProvider
                  options={{
                    clientId:
                      "AQzhITg9UuWXVNAvZC7a5SHpSULaK_7zs7ShJnhRia4KkxELJrVjDPAPT7PMQOXjQXHv7MFfcNg9HUyC" ||
                      "",
                  }}
                >
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    style={{
                      layout: "vertical",
                      color: "gold",
                      shape: "pill",
                      label: "pay",
                    }}
                  />
                </PayPalScriptProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
              elevation={10}
              sx={{
                padding: { xs: 2, sm: 3, md: 4 },
                backgroundColor: "#FFE7DB",
                border: "1px solid",
                borderRadius: "15px",
              }}
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Your Order</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  container
                  justifyContent="flex-end"
                ></Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "24px" },
                      fontWeight: 600,
                    }}
                  >
                    Tickets x {count}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                  <Typography variant="body1">
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">Discount Code</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="Add Discount Code"
                      sx={{ backgroundColor: "transparent" }}
                      error={!!errors.discountCode}
                      helperText={errors.discountCode}
                    />
                  </Grid>
                  <Grid item xs={2} display={"flex"} justifyContent={"end"}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={handleApplyDiscount}
                    >
                      Apply
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      New Customer? Sign Up to get a better offer
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Subtotal</Typography>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                  <Typography variant="body1">
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Discount</Typography>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                  <Typography variant="body1">
                    ${discount.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Tax</Typography>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                  <Typography variant="body1">${tax.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Shipping Cost</Typography>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                  <Typography variant="body1">
                    ${shippingCost.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Grand Total</Typography>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "24px" },
                      fontWeight: 600,
                    }}
                  >
                    ${total.toFixed(2)}
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} textAlign="center">
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ padding: { xs: "10px", sm: "15px" } }}
                    onClick={handleSubmit}
                  >
                     {isLoading ? 'Processing...' : 'Pay Now'}
                  </Button>
                </Grid> */}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
