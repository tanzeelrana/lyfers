import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import baseUrl from "../../config/apiConfig";
import ProductComponent from "../Shop/ProductComponent";
import { useDispatch, useSelector } from "react-redux";
import { handleApiError } from "../common/Api-error-handler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/auth/actions";

interface Product  {
    id: number;
    title: string;
    description: string;
    image: string;
    is_soldout: boolean;
    colors: { name: string; code: string }[];
    size: [];
    images: {
      fullPath: string;
      id: number;
      productId: number;
      image: string;
    }[];
    price: number;
  
}

interface WishlistItem {
  userId: number;
  productId: number;
  Product: Product;
  createdAt: string;
  updatedAt: string;
}

export default function Wishlist() {
    const currentUser = useSelector((state: any) => state?.Auth?.currentUser);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate =useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = currentUser?.user?.id ?? 0; 
        const response = await axios.get(`${baseUrl}/wishlist/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`, 
          },
        }
        );
        setWishlistItems(response.data);
        setLoading(false);
      } catch (error) {
        const { message, navigateTo } = handleApiError(error);
        toast.error(message);
        if (navigateTo) {
          if (navigateTo == "login") {
            dispatch(logout());
          }
          navigate(`/${navigateTo}`);
        }
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.Product.id !== productId)
    );
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid
      container
      width="100%"
      direction="column"
      padding={{ xs: 0, sm: 0, md: 4 }}
      rowSpacing={3}
      flexShrink={0}
      sx={{ marginBottom: "40px" }}
    >
      <Grid item xs={12}>
        <Grid container direction="column" flexShrink={0}>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{ padding: { xs: "8px", sm: "12px", md: "16px" } }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                fontWeight: 700,
                lineHeight: "120%",
                color: "#000000",
                marginLeft: { xs: 0, md: 20 },
              }}
            >
              Wishlist
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Display wishlist items */}
      <Grid item xs={12}>
        {wishlistItems.length > 0 ? (
          <Grid container spacing={3}>
            {wishlistItems.map((wishlistItem) => (
                <Grid item xs={12} sm={6} md={4} key={wishlistItem.Product.id}>
                    <ProductComponent product={wishlistItem.Product} userId={currentUser?.user?.id ?? 0}  removeFromWishlist={removeFromWishlist}/>
                 </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No items in your wishlist</Typography>
        )}
      </Grid>
    </Grid>
  );
}
