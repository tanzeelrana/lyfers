
import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import tshirt from "../../assets/images/tshirt.jpeg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../config/apiConfig";
import { toast } from "react-toastify";

interface ProductProps {
  product: {
    id: number;
    title: string;
    description: string;
    image: string;
    is_soldout: boolean;
    colors: { name: string; code: string }[];
    size: string[];
    images: {
      fullPath: string;
      id: number;
      productId: number;
      image: string;
    }[];
    price: number;
  };
  userId: number;
  removeFromWishlist: (productId: number) => void;
}

const ProductComponent: React.FC<ProductProps> = ({
  product,
  userId,
  removeFromWishlist,
}) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${baseUrl}/wishlist/${userId}`);
        const wishlistProductIds = response.data.map(
          (item: any) => item.productId
        );

        // Check if the current product is in the wishlist
        if (wishlistProductIds.includes(product.id)) {
          setIsFavorited(true);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId, product.id]);

  // Handle adding/removing the product from the wishlist
  const handleFavoriteClick = async () => {
    try {
      if (isFavorited) {
        // Remove product from wishlist
        const response = await axios.delete(
          `${baseUrl}/wishlist/${userId}/${product.id}`
        );
        removeFromWishlist(product.id);
        toast.success(response.data.message);
      } else {
        // Add product to wishlist
        const response = await axios.post(`${baseUrl}/wishlist`, {
          userId,
          productId: product.id,
        });
        toast.success(response.data.message);
      }

      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`${baseUrl}/cart/add`, {
        userId,
        productId: product.id,
        quantity: 1,
        color: product.colors[0]?.name ?? "N/A",
        size: product?.size[2] + "" + product?.size[3] ?? "N/A",
      });

      toast.success(response.data.message);
      setIsAddedToCart(true);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("There was an error adding the item to your cart.");
    }
  };

  const handleRemoveFromCart = async (pId: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/cart/remove/${userId}/${pId}`);
      toast.success(response.data.message);
      setIsAddedToCart(false); 
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("There was an error removing the item from your cart.");
    }
  };

  return (
    <Card sx={{ borderRadius: "36px", position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{
            height: 270,
            objectFit: "cover",
            transition: "0.5s ease-in-out",
            ...(product.is_soldout && {
              filter: "grayscale(100%)", // Optional: To give a sold-out feel
            }),
          }}
          image={product.images?.[0]?.fullPath ?? tshirt}
          title={product.title}
        />

        {/* Sold Out Overlay */}
        {product.is_soldout && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              textTransform: "uppercase",
              transition: "background-color 0.3s ease",
            }}
          >
            Sold Out
          </Box>
        )}
      </Box>

      {/* Favorite Icon */}
      <Box
        sx={{
          position: "absolute",
          bottom: 167,
          right: 17,
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "5px",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleFavoriteClick}
      >
        {isFavorited ? (
          <FavoriteIcon style={{ color: "red", fontSize: 34 }} />
        ) : (
          <FavoriteBorderIcon style={{ color: "black", fontSize: 34 }} />
        )}
      </Box>

      {/* Add/Remove from Cart */}
      {!product.is_soldout && (
        <Box
          sx={{
            position: "absolute",
            bottom: 93,
            right: 17,
            backgroundColor: "white",
            height: "50px",
            display: "flex",
            padding: "6px",
            borderTopLeftRadius: "45%",
            borderTopRightRadius: "45%",
            justifyContent: "center",
            alignItems: "start",
          }}
          onClick={() =>
            isAddedToCart ? handleRemoveFromCart(product.id) : handleAddToCart()
          }
        >
          {isAddedToCart ? (
            <RemoveCircleOutlineOutlinedIcon
              style={{ color: "black", fontSize: 34 }}
            />
          ) : (
            <AddCircleOutlineOutlinedIcon
              style={{ color: "black", fontSize: 34 }}
            />
          )}
        </Box>
      )}

      <Box sx={{ padding: "12px 20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Outfit",
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "38px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "70%",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontFamily: "Syne",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "35px",
              color: "#FF5A00",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            ${product.price}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: "8px" }}>
          <Typography
            color="text.secondary"
            sx={{
              fontFamily: "Outfit",
              fontSize: "18px",
              color: "#FBB03A",
            }}
            onClick={() => navigate(`/productDetail/${product.id}`)}
          >
            View Detail
          </Typography>
          <ArrowRightAltIcon
            style={{
              color: "#FBB03A",
              fontSize: 20,
              marginTop: "4px",
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default ProductComponent;
