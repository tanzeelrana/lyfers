import {
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../../config/apiConfig";
import { toast } from "react-toastify";

export default function PaymentDetail() {
  const navigate = useNavigate();

  const location = useLocation();
    const cartItems = location.state?.cartItems || [];
    const currentUser = location.state?.currentUser;
    const paymentDetail = location.state?.paymentDetail;
    const shipping_address = location.state?.shipping_address;


   const count = paymentDetail.count;
   const subtotal = paymentDetail.subtotal;
   const discount = paymentDetail.discount;
   const tax = paymentDetail.tax;
   const grandTotal = paymentDetail.total;

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [venmoUsername, setVenmoUsername] = useState("");
  const [shippingCost] = useState(10); // Static shipping cost
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(discount);
  const [total, setTotal] = useState(grandTotal);

  const [errors, setErrors] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
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

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {
      cardNumber: "",
      nameOnCard: "",
      expiryDate: "",
      cvv: "",
      paypalEmail: "",
      venmoUsername: "",
      discountCode: "",
    };

    if (paymentMethod === "creditCard") {
      if (!cardNumber) {
        errors.cardNumber = "Card number is required";
        isValid = false;
      }
      if (!nameOnCard) {
        errors.nameOnCard = "Name on card is required";
        isValid = false;
      }
      if (!expiryDate) {
        errors.expiryDate = "Expiry date is required";
        isValid = false;
      }
      if (!cvv) {
        errors.cvv = "CVV is required";
        isValid = false;
      }
    } else if (paymentMethod === "paypal" && !paypalEmail) {
      errors.paypalEmail = "PayPal email is required";
      isValid = false;
    } else if (paymentMethod === "venmo" && !venmoUsername) {
      errors.venmoUsername = "Venmo username is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleApplyDiscount = () => {
    if (discountCode === DISCOUNT_CODE) {
      setAppliedDiscount(DISCOUNT_VALUE);
    } else {
      setErrors({ ...errors, discountCode: "Invalid discount code" });
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      console.log(cartItems, currentUser, paymentDetail, shipping_address);
  
      // Prepare the data to send to the order creation API
      const orderData = {
        userId: currentUser.user.id,
        totalAmount: grandTotal,
        shippingAddress: JSON.stringify(shipping_address),
        paymentDtails: {
          paymentMethod: "credit card",
          cardNumber: cardNumber,
          nameOnCard:nameOnCard,
          expiryDate:expiryDate,
          cvv:cvv,
        },
        cartItems: cartItems,
      };
  
      try {
        // Call the order creation API
        const response = await axios.post(`${baseUrl}/orders`, orderData);
        toast.success( response.data.message);
  
        // Navigate to the order confirmation page with relevant state data
        navigate("/order-confermation", {
          state: {
            count,
            subtotal,
            discount,
            tax,
            grandTotal,
            orderId: response.data.orderId,
          },
        });
      } catch (error) {
        console.error("Error creating order:", error);
      }
  };
}

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
                <Typography variant="h6">Select Payment Method</Typography>
                <form onSubmit={handleSubmit}>
                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      aria-label="payment-method"
                      name="payment-method"
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                    >
                      {/* Credit Card Option */}
                      <Box mb={2} display="flex" flexDirection="column">
                        <FormControlLabel
                          value="creditCard"
                          control={<Radio />}
                          label="Credit Card"
                        />
                        {paymentMethod === "creditCard" && (
                          <Box mt={1} padding={2} bgcolor="background.paper">
                            <Typography variant="h6">
                              Credit Card Information
                            </Typography>
                            <TextField
                              label="Card Number"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              error={!!errors.cardNumber}
                              helperText={errors.cardNumber}
                            />
                            <TextField
                              label="Name On Card"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={nameOnCard}
                              onChange={(e) => setNameOnCard(e.target.value)}
                              error={!!errors.nameOnCard}
                              helperText={errors.nameOnCard}
                            />
                            <Grid container spacing={2} mt={1}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Expiry Date"
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  value={expiryDate}
                                  onChange={(e) =>
                                    setExpiryDate(e.target.value)
                                  }
                                  error={!!errors.expiryDate}
                                  helperText={errors.expiryDate}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="CVV"
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  value={cvv}
                                  onChange={(e) => setCvv(e.target.value)}
                                  error={!!errors.cvv}
                                  helperText={errors.cvv}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Box>

                      {/* PayPal Option */}
                      <Box mb={2} display="flex" flexDirection="column">
                        <FormControlLabel
                          value="paypal"
                          control={<Radio />}
                          label="PayPal"
                        />
                        {paymentMethod === "paypal" && (
                          <Box mt={1} padding={2} bgcolor="background.paper">
                            <Typography variant="h6">
                              PayPal Information
                            </Typography>
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

                      {/* Venmo Option */}
                      <Box mb={2} display="flex" flexDirection="column">
                        <FormControlLabel
                          value="venmo"
                          control={<Radio />}
                          label="Venmo"
                        />
                        {paymentMethod === "venmo" && (
                          <Box mt={1} padding={2} bgcolor="background.paper">
                            <Typography variant="h6">
                              Venmo Information
                            </Typography>
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
                </form>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  border: "0.5px solid",
                  borderRadius: "20px",
                  padding: 2,
                }}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontFamily: "Outfit",
                    fontSize: { xs: "12px", sm: "24px" },
                    fontWeight: 600,
                  }}
                >
                  Save Information
                </Typography>
                <Box mt={2}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Save my information for future transactions"
                  />
                </Box>
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
                <Grid item xs={12} textAlign="center">
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ padding: { xs: "10px", sm: "15px" } }}
                    onClick={handleSubmit}
                  >
                    Place Your Order
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
