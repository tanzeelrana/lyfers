import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import tshirt from "../../assets/images/tshirt.jpeg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  product: {
    id: number;
    title: string;
    description: string;
    image: string;
    images: {
      fullPath: string;
      id: number;
      productId: number;
      image: string;
    }[];
    price: number;
  };
}

const ProductComponent: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ borderRadius: "36px", position: "relative" }}>
      <CardMedia
        sx={{ height: 270, objectFit: "cover" }}
        image={product.images?.[0]?.fullPath ?? tshirt}
        title={product.title}
      />
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
        }}
      >
        <FavoriteBorderIcon style={{ color: "black", fontSize: 34 }} />
      </Box>
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
      >
        <AddCircleOutlineOutlinedIcon
          style={{ color: "black", fontSize: 34 }}
        />
      </Box>

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
