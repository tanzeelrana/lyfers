import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import tshirt from "../../../assets/images/tshirt.jpeg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../config/apiConfig";
import { toast } from "react-toastify";
import { handleApiError } from "../../common/Api-error-handler";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/auth/actions";

interface ProductProps {
  product: {
    id: number;
    title: string;
    description: string;
    images: {
      fullPath: string;
      id: number;
      productId: number;
      image: string;
    }[];
    price: number;
  };
  onDelete: (id: number) => void;
}

const ProductsComponent: React.FC<ProductProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  const dispatch = useDispatch();

  const handleDeleteClick = (productId: number) => {
    setSelectedProductId(productId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    if (selectedProductId !== null) {
      try {
        const response = await axios.delete(
          `${baseUrl}/products/${selectedProductId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        toast.success("Product Deleted successfully");
        onDelete(selectedProductId);
        setOpenDialog(false);
      } catch (error) {
        const { message, navigateTo } = handleApiError(error);
        toast.error(message);
        if (navigateTo) {
          if (navigateTo =='login'){
            dispatch(logout());
          }
          navigate(`/${navigateTo}`);
        }
      }
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: {
            xs: "15px",
            sm: "20px",
            md: "36px",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{
              height: {
                xs: "115px",
                sm: "150px",
                md: "200px",
              },
            }}
            image={product.images?.[0]?.fullPath ?? tshirt}
            title={product.title}
          />
        </Box>
        <Box sx={{ padding: "12px 20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Outfit",
                fontSize: {
                  xs: "18px",
                  sm: "20px",
                  md: "25px",
                },
                fontWeight: 600,
                lineHeight: "38px",
              }}
            >
              {product.title}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontFamily: "Syne",
                fontSize: {
                  xs: "18px",
                  sm: "24px",
                  md: "30px",
                },
                fontWeight: 700,
                lineHeight: "35px",
                color: "#FF5A00",
              }}
            >
              ${product.price}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              sx={{
                display: "flex",
                marginTop: {
                  xs: "1px",
                  sm: "4px",
                  md: "8px",
                },
              }}
            >
              <Typography
                color="text.secondary"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: {
                    xs: "10px",
                    sm: "14px",
                    md: "18px",
                  },
                  color: "#FBB03A",
                }}
                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
              >
                Edit
              </Typography>
              <ArrowRightAltIcon
                sx={{
                  color: "#FBB03A",
                  fontSize: {
                    xs: "14px",
                    sm: "18px",
                    md: "20px",
                  },
                  marginTop: {
                    xs: "2px",
                    sm: "0px",
                    md: "4px",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: {
                  xs: "1px",
                  sm: "4px",
                  md: "8px",
                },
              }}
            >
              <Typography
                color="text.secondary"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: {
                    xs: "10px",
                    sm: "14px",
                    md: "18px",
                  },
                  color: "red",
                }}
                onClick={() => handleDeleteClick(product.id)}
              >
                Delete
              </Typography>
              <ArrowRightAltIcon
                sx={{
                  color: "red",
                  fontSize: {
                    xs: "14px",
                    sm: "18px",
                    md: "20px",
                  },
                  marginTop: {
                    xs: "2px",
                    sm: "0px",
                    md: "4px",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Confirmation Modal */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          textAlign={"center"}
          fontWeight={"bold"}
        >
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductsComponent;
