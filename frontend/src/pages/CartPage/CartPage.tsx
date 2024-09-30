import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Paper,
  Box,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import tshirt from "../../assets/images/tshirt.jpeg";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../config/apiConfig";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  selected: boolean;
  images: {
    fullPath: string;
    id: number;
    productId: number;
    image: string;
  }[];
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/cart/${currentUser.user.id}`
        );
        const items = response.data.CartItems.map((item: any) => ({
          id: item.id,
          image:
            item.Product.images[0]?.fullPath ??
            "https://via.placeholder.com/150",
          productId: item.Product.id,
          name: item.Product.title,
          price: parseFloat(item.Product.price),
          quantity: item.quantity,
          size: item.size ?? "N/A",
          color: item.color || "N/A",
          selected: false,
        }));
        setCartItems(items);
      } catch (error) {
        setError("Failed to fetch cart data");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleIncrease = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: checked }))
    );
  };

  const handleSelectItem = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleRemoveItem = async (id: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/cart/remove/${id}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to remove item from the cart.");
    }
  };

  // Calculate the subtotal
  const subtotal = cartItems
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Check if any items are selected
  const hasSelectedItems = cartItems.some((item) => item.selected);

  const handleContinueToPayment = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length > 0) {
      navigate("/shippingInfo", {
        state: {
          cartItems: selectedItems,
          currentUser: currentUser,
          subtotal: subtotal,
        },
      });
    }
  };

  return (
    <Container maxWidth={"xl"}>
      <Grid
        container
        width="100%"
        direction="column"
        rowSpacing={2}
        flexShrink={0}
        sx={{ margin: "40px 0px" }}
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
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Syne",
                  fontSize: { xs: "24px", sm: "24px", md: "32px" },
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "120%",
                  textAlign: "center",
                  color: "#000000",
                }}
              >
                Cart
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {loading ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="body1">Loading...</Typography>
          </Grid>
        ) : cartItems.length === 0 ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="body1">Your cart is empty.</Typography>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ margin: "40px 0px" }}>
            <Grid container direction={"row"} spacing={3}>
              <Grid item xs={12} md={8}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAll}
                            inputProps={{ "aria-label": "select all" }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Product
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Price
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={product.selected}
                              onChange={() => handleSelectItem(product.id)}
                              inputProps={{
                                "aria-label": `select ${product.name}`,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box
                                sx={{ display: { xs: "none", sm: "block" } }}
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  style={{
                                    width: "200px",
                                    height: "auto",
                                    marginRight: "16px",
                                    borderRadius: "20px",
                                  }}
                                />
                              </Box>

                              <Box>
                                <Typography variant="body1">
                                  {product.name}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "4px 8px",
                                    backgroundColor: "#ffece2",
                                    borderRadius: 2,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ marginRight: 1 }}
                                  >
                                    {product.color}
                                  </Typography>
                                  <Box
                                    sx={{
                                      border: "1px solid",
                                      height: "15px",
                                      marginRight: 1,
                                    }}
                                  />
                                  <Typography variant="body2">
                                    {product.size}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <IconButton
                                  onClick={() => handleDecrease(product.id)}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <Typography variant="body1" sx={{ marginX: 1 }}>
                                  {product.quantity}
                                </Typography>
                                <IconButton
                                  onClick={() => handleIncrease(product.id)}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                              <Button
                                variant="outlined"
                                color="error"
                                sx={{
                                  marginTop: 1,
                                  textTransform: "capitalize",
                                }}
                                startIcon={<DeleteIcon />}
                                onClick={() => handleRemoveItem(product.id)}
                              >
                                Remove
                              </Button>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography
                              sx={{
                                fontFamily: "Outfit",
                                fontSize: {
                                  xs: "16px",
                                  sm: "22px",
                                  md: "24px",
                                },
                                fontStyle: "normal",
                                lineHeight: "120%",
                                textAlign: "center",
                              }}
                            >
                              $ {(product.price * product.quantity).toFixed(2)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={4}>
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
                    {/* Display the selected items with dynamic quantities */}
                    {cartItems
                      .filter((item) => item.selected)
                      .map((item) => (
                        <React.Fragment key={item.id}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              sx={{
                                fontFamily: "Outfit",
                                fontSize: { xs: "12px", sm: "24px" },
                              }}
                            >
                              {item.name} x {item.quantity}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            justifyContent="flex-end"
                          >
                            <Typography variant="body1">
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </Grid>
                        </React.Fragment>
                      ))}
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">Subtotal</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      container
                      justifyContent="flex-end"
                    >
                      <Typography variant="body1">
                        ${subtotal.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        type="button"
                        disabled={!hasSelectedItems}
                        sx={{ padding: { xs: "10px", sm: "15px" } }}
                        onClick={() => handleContinueToPayment()}
                      >
                        {hasSelectedItems
                          ? "Continue to Payment"
                          : "Select items to process"}{" "}
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CartPage;
