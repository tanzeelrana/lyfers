import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import baseUrl from "../../../config/apiConfig";
import { useSelector } from "react-redux";

// Define Product, OrderItem, and Order interfaces
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  size: string;
  color: string | null;
  images: {
    fullPath: string;
    id: number;
    productId: number;
    image: string;
  }[];
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  size: string;
  color: string;
  product: Product;
}

interface Order {
  id: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
  orderItems: OrderItem[];
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);

  // Fetch orders data from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (axios.isAxiosError(err) && err.response) {
          // Handle different status codes
          switch (err.response.status) {
            case 404:
              setError(err.response.data.message || "No orders found.");
              break;
            case 400:
              setError("Bad request. Please check your input.");
              break;
            case 500:
              setError("Server error. Please try again later.");
              break;
            default:
              setError("An unknown error occurred.");
              break;
          }
        } else {
          setError("Failed to fetch orders.");
        }
      }
    };

    fetchOrders();
  }, []);

  // Display loading and error states
  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    );
  }

  // Check if there are no orders
  if (orders.length === 0) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontSize: "24px",
            fontWeight: 600,
            textAlign: "center",
            color: "#000",
          }}
        >
          You don't have any orders yet.
        </Typography>
      </Grid>
    );
  }

  return (
    <Box width="100%">
      <Grid
        container
        width="100%"
        direction="column"
        padding={{ xs: 2, sm: 3, md: 3 }}
        rowSpacing={2}
        flexShrink={0}
        sx={{ marginBottom: "40px" }}
      >
        <Grid item xs={12}>
          <Grid container direction="column" flexShrink={0}>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                marginBottom: { xs: "10px", sm: "15px", md: "20px" },
                padding: { xs: "8px", sm: "12px", md: "16px" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Syne",
                  fontSize: { xs: "16px", sm: "24px", md: "32px" },
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "120%",
                  textAlign: "center",
                  color: "#000000",
                }}
              >
                Orders
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction={"row"}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <Typography
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "16px", sm: "24px", md: "32px" },
                      fontWeight: 700,
                      color: "#4E4949",
                    }}
                  >
                    Order Details
                  </Typography>
                  <TableBody>
                    {orders.map((order) => {
                      const shippingInfo = JSON.parse(order.shippingAddress);

                      // Check if there are no items in the order
                      if (order.orderItems.length === 0) {
                        return (
                          <TableRow key={order.id}>
                            <TableCell colSpan={3} align="center">
                              <Typography
                                sx={{
                                  fontFamily: "Outfit",
                                  fontSize: "20px",
                                  color: "#000",
                                }}
                              >
                                Items are deleted.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      }

                      return (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Box display={"flex"} alignItems={"center"}>
                              {/* Show image of the first order item */}
                              <Box marginRight={4}>
                                <img
                                  src={
                                    order.orderItems[0].product.images[0]
                                      ?.fullPath
                                  }
                                  alt={order.orderItems[0].product?.title}
                                  style={{
                                    width: "200px",
                                    height: "150px",
                                    borderRadius: "20px",
                                  }}
                                />
                              </Box>

                              {/* Loop through order items */}
                              <Box>
                                {order.orderItems.map((item) => (
                                  <Box
                                    key={item.id}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    {/* Product title and quantity */}
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontFamily: "Outfit",
                                          fontSize: {
                                            xs: "16px",
                                            sm: "24px",
                                            md: "28px",
                                          },
                                          fontWeight: 600,
                                        }}
                                      >
                                        {item.product.title} x {item.quantity}
                                      </Typography>
                                    </Box>

                                    {/* Color and size */}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "4px 8px",
                                        backgroundColor: "#ffece2",
                                        borderRadius: 2,
                                        marginLeft: 5,
                                      }}
                                    >
                                      <Typography
                                        variant="body1"
                                        sx={{ marginRight: 1 }}
                                      >
                                        {item.color}
                                      </Typography>
                                      <Box
                                        sx={{
                                          border: "1px solid",
                                          height: "15px",
                                          marginRight: 1,
                                        }}
                                      />
                                      <Typography variant="body1">
                                        {item.size}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box maxWidth={200}>
                              <Typography
                                sx={{
                                  fontFamily: "Outfit",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "20px",
                                    textAlign:'center'
                                  },
                                }}
                              >
                                {shippingInfo.shippingFullName}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "Outfit",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "20px",
                                    textAlign:'center'
                                  },
                                }}
                              >
                                {shippingInfo.shippingDeliveryAddress}, {shippingInfo.shippingCity} , {shippingInfo.shippingState}  , {shippingInfo.shippingPostalCode}  
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "Outfit",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "20px",
                                  },
                                }}
                              >
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography
                              sx={{
                                fontFamily: "Outfit",
                                fontSize: {
                                  xs: "16px",
                                  sm: "20px",
                                },
                                fontWeight: 400,
                                backgroundColor: "#FF5A00",
                                textAlign: "center",
                                borderRadius: "10px",
                                color: "white",
                              }}
                            >
                              {order.status}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              sx={{
                                fontFamily: "Outfit",
                                fontSize: {
                                  xs: "16px",
                                  sm: "24px",
                                  md: "26px",
                                },
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "120%",
                                textAlign: "center",
                                color: "#000000",
                              }}
                            >
                              $
                              {order.orderItems
                                .reduce(
                                  (total, item) =>
                                    total + item.price * item.quantity,
                                  0
                                )
                                .toFixed(2)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrdersPage;
