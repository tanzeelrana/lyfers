import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";
import ImageGallery from "react-image-gallery";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import tshirt from "../../assets/images/tshirt.jpeg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../config/apiConfig";
import axios from "axios";
import CartPage from "../CartPage/CartPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleApiError } from "../common/Api-error-handler";
import { logout } from "../../store/auth/actions";
import ProductComponent from "./ProductComponent";

interface ProductDetailItem {
  id: number;
  title: string;
  description: string;
  price: string;
  is_soldout: boolean;
  colors: { name: string; code: string }[];
  size: string[];
  image: string;
  subcategoryId: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  colors: { name: string; code: string }[];
  size: string[];
  is_soldout: boolean;
  images: {
    fullPath: string;
    id: number;
    productId: number;
    image: string;
  }[];
  price: number;
  subcategoryId: number;
}

interface Category {
  id: number;
  name: string;
}
const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);

  const { id } = useParams<{ id: string }>();
  const [productDetailItem, setProductDetailItem] =
    useState<ProductDetailItem | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [openSizeChart, setOpenSizeChart] = useState<boolean>(false);
  const [images, setImages] = useState<
    { original: string; thumbnail: string }[]
  >([]);
  const [inCart, setInCart] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/${id}`, {
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        });
        const data = response.data;
        const colors = data.colors.map((color: any) => ({
          name: color.name,
          code: color.code,
        }));

        const sizes = data.size ? JSON.parse(data.size) : [];

        setProductDetailItem({
          ...data,
          colors,
          size: sizes,
        });

        // Set default color and size
        if (colors.length > 0) setSelectedColor(colors[0].name);
        if (sizes.length > 0) setSelectedSize(sizes[0]);

        const imageGallery = data.images.map((image: any) => ({
          original: image.fullPath,
          thumbnail: image.fullPath,
        }));
        setImages(imageGallery);

        if (response.data?.subcategoryId) {
          const responseData = await axios.get(
            `${baseUrl}/products/category/${response.data?.subcategoryId}`,
            {
              headers: { Authorization: `Bearer ${currentUser?.token}` },
            }
          );
          setProducts(responseData.data);
        } else {
          const responseData = await axios.get(`${baseUrl}/products/random`, {
            headers: { Authorization: `Bearer ${currentUser?.token}` },
          });
          setProducts(responseData.data);
        }
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

    fetchProductDetail();
  }, []);

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

  if (!productDetailItem) {
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
          Product Not Found
        </Typography>{" "}
      </Grid>
    );
  }
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleOpenSizeChart = () => {
    setOpenSizeChart(true);
  };

  const handleCloseSizeChart = () => {
    setOpenSizeChart(false);
  };

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size.");
      return;
    }

    try {
      const userId = currentUser.user?.id;
      const quantity = 1;

      await axios.post(
        `${baseUrl}/cart/add`,
        {
          userId,
          productId: productDetailItem.id,
          quantity,
          color: selectedColor,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      setInCart(true);
      toast.success("Item added to cart successfully!");
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

  const handleRemoveFromCart = async () => {
    try {
      const userId = currentUser.user?.id;

      // Remove from cart
      await axios.delete(
        `${baseUrl}/cart/remove/${userId}/${productDetailItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      setInCart(false); // Update the cart status
      toast.success("Item removed from cart successfully!");
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

  const handleCartToggle = () => {
    if (inCart) {
      handleRemoveFromCart();
    } else {
      handleAddToCart();
    }
  };
  const handleFavoriteClick = async () => {
    try {
      const userId = currentUser.user?.id;

      if (isFavorited) {
        // Remove product from wishlist
        const response = await axios.delete(
          `${baseUrl}/wishlist/${userId}/${productDetailItem.id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        toast.success(response.data.message);
      } else {
        // Add product to wishlist
        const response = await axios.post(
          `${baseUrl}/wishlist`,
          {
            userId,
            productId: productDetailItem.id,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        toast.success(response.data.message);
      }

      setIsFavorited(!isFavorited);
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
  const removeFromWishlist = (productId: number) => {};

  return (
    <>
      <Box padding={4} sx={{ marginBottom: "40px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <ImageGallery
                items={images}
                disableSwipe={true}
                showThumbnails={true}
                showPlayButton={false}
                autoPlay={true}
                showNav={false}
                showBullets={true}
              />
            </Paper>

            <Grid item xs={12} marginTop={4}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "18px" },
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    Product Detail
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "18px" },
                    }}
                  >
                    {productDetailItem.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "18px" },
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    Why join the Event?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "18px" },
                    }}
                  >
                    The Satan Design T-Shirt offers an elevated crew neck style
                    crafted from 100% premium cotton. This slim-fit garment
                    features rib knit trims at the neckline, cuffs, and hem,
                    providing a refined finish. The defining design element is
                    the bold contrasting edging, making this shirt a standout
                    piece in any wardrobe.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "18px" },
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    About Lyfers
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "12px", sm: "18px" },
                    }}
                  >
                    The Satan Design T-Shirt offers an elevated crew neck style
                    crafted from 100% premium cotton. This slim-fit garment
                    features rib knit trims at the neckline, cuffs, and hem,
                    providing a refined finish. The defining design element is
                    the bold contrasting edging, making this shirt a standout
                    piece in any wardrobe.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontFamily: "Outfit",
                fontSize: "40px",
                fontWeight: 600,
              }}
            >
              {productDetailItem.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Outfit",
                fontSize: "24px",
              }}
            >
              STS-001-M-SML
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{
                fontFamily: "Syne",
                fontSize: "40px",
                fontWeight: 700,
              }}
            >
              $ {productDetailItem.price}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Outfit",
                fontSize: "18px",
              }}
            >
              Shipping calculated at checkout
            </Typography>

            <Box marginTop={2}>
              <Typography variant="h6">Color</Typography>
              <RadioGroup
                value={selectedColor}
                onChange={handleColorChange}
                row
              >
                {productDetailItem.colors.map((color) => (
                  <FormControlLabel
                    key={color.code}
                    value={color.name}
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          backgroundColor: color.code,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "& svg": {
                            width: "50%",
                            height: "50%",
                          },
                        }}
                      >
                        {selectedColor === color.name && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              backgroundColor: "white",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </Box>

            <Box marginTop={2}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Size
              </Typography>
              <RadioGroup value={selectedSize} onChange={handleSizeChange} row>
                {productDetailItem.size.map((size) => (
                  <FormControlLabel
                    key={size}
                    value={size}
                    control={
                      <Radio
                        sx={{
                          display: "none",
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          border: `2px solid ${
                            selectedSize === size ? "transparent" : "gray"
                          }`,
                          backgroundColor:
                            selectedSize === size
                              ? "primary.main"
                              : "transparent",
                          color: selectedSize === size ? "white" : "gray",
                          "&:hover": {
                            backgroundColor:
                              selectedSize === size
                                ? "primary.main"
                                : "lightgray",
                          },
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {size}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </Box>
            <Box marginTop={2}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: "18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "primary.main",
                }}
                onClick={handleOpenSizeChart}
              >
                Show Chart{" "}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.854 24H5.83335C5.55497 23.8692 5.48841 23.6452 5.49084 23.363C5.50007 22.1995 5.49473 21.0361 5.49473 19.8727C5.49473 19.5249 5.49278 19.5319 5.13327 19.4513C3.67627 19.125 2.34461 18.5588 1.2719 17.5191C0.548987 16.8183 0.024778 15.9985 0.0174905 14.9864C-0.00728673 11.6283 0.00291568 8.27065 7.06186e-07 4.913C-0.000485123 4.13863 0.249717 3.44347 0.707853 2.81347C1.38364 1.88441 2.30769 1.25441 3.3702 0.811445C5.52242 -0.0857408 7.74897 -0.216053 10.0139 0.30754C11.5355 0.659102 12.9041 1.30316 13.9452 2.47597C14.5112 3.11347 14.8907 3.84238 14.9062 4.69691C14.929 5.96159 14.9203 7.22675 14.9247 8.49143C14.9247 8.58049 14.9247 8.66956 14.9247 8.77081C15.0651 8.77081 15.1617 8.77081 15.2584 8.77081C17.3703 8.77174 19.4817 8.76518 21.5936 8.77643C22.8471 8.78299 23.9718 9.83252 23.9839 11.0396C24.0072 13.3739 23.997 15.7088 23.998 18.0436C23.998 19.2853 24.0082 20.527 23.9825 21.7683C23.9689 22.4142 23.6511 22.9448 23.1634 23.3831C22.7907 23.7178 22.3321 23.8767 21.854 23.9995V24ZM14.1099 22.9617C14.1099 22.5867 14.107 22.2291 14.1109 21.8714C14.1153 21.4659 14.1109 21.0595 14.1381 20.6555C14.1556 20.3995 14.3519 20.257 14.6157 20.2547C14.88 20.2523 15.0656 20.3963 15.1069 20.6447C15.1234 20.7441 15.1302 20.8463 15.1307 20.947C15.1326 21.5325 15.1311 22.118 15.1321 22.7034C15.1321 22.7864 15.1399 22.8694 15.1438 22.9566H16.9909C16.9909 22.8492 16.9909 22.7569 16.9909 22.6645C16.9933 22.0088 16.989 21.353 17.0016 20.6977C17.0064 20.4361 17.1833 20.2781 17.4432 20.2566C17.7041 20.2345 17.913 20.3667 17.9718 20.602C17.9961 20.6995 18.0077 20.8022 18.0082 20.902C18.0116 21.4795 18.0097 22.0575 18.0097 22.635C18.0097 22.7414 18.0097 22.8473 18.0097 22.957H19.8646C19.8646 22.2333 19.8631 21.5245 19.8651 20.8153C19.866 20.453 20.0438 20.2561 20.364 20.2538C20.6832 20.2514 20.8736 20.4497 20.8775 20.8069C20.8829 21.3375 20.879 21.8686 20.879 22.3997C20.879 22.5844 20.879 22.7691 20.879 22.972C21.0359 22.972 21.1642 22.9678 21.2915 22.973C21.7622 22.9908 22.1912 22.8877 22.5391 22.5628C22.9248 22.2023 23.0608 21.7144 23.0662 21.2428C23.0944 18.6436 23.0798 16.0434 23.0793 13.4438C23.0793 13.3627 23.0715 13.282 23.0652 13.1639C22.421 13.6135 21.7195 13.6463 20.9995 13.6449C16.3078 13.6383 11.6162 13.6416 6.92452 13.6416H6.63157V22.958H8.36209C8.36209 22.8675 8.36209 22.7911 8.36209 22.7147C8.36209 22.0669 8.35626 21.4186 8.365 20.7708C8.36986 20.4384 8.57925 20.2458 8.89116 20.2547C9.1948 20.2631 9.37115 20.452 9.37553 20.7825C9.37941 21.0713 9.3765 21.36 9.3765 21.6492C9.3765 22.0838 9.3765 22.5183 9.3765 22.9589H11.2329C11.2329 22.8614 11.2329 22.7775 11.2329 22.6936C11.2329 22.1081 11.2324 21.5227 11.2338 20.9372C11.2338 20.8519 11.2358 20.7652 11.2513 20.6813C11.3043 20.3925 11.5035 20.2378 11.7877 20.2561C12.066 20.2744 12.239 20.4403 12.2443 20.7342C12.255 21.3197 12.2497 21.9052 12.2507 22.4906C12.2507 22.6444 12.2507 22.7981 12.2507 22.9617H14.1104H14.1099ZM5.49473 18.5077C5.49473 18.375 5.49473 18.2897 5.49473 18.2049C5.49473 16.5811 5.49473 14.9569 5.49473 13.3331C5.49473 12.7908 5.62881 12.6633 6.19966 12.6633C11.2154 12.6633 16.2306 12.6633 21.2463 12.6633C21.3269 12.6633 21.4081 12.6656 21.4887 12.6614C22.6872 12.5995 23.3669 11.4394 22.7723 10.4555C22.4613 9.94034 21.9677 9.74955 21.3638 9.75002C16.7932 9.75377 12.2225 9.76362 7.65229 9.74159C6.84144 9.73784 6.02185 9.6469 5.22315 9.50674C3.90266 9.27424 2.69829 8.75299 1.65376 7.92237C1.44437 7.75596 1.2549 7.56706 1.0319 7.36643C1.02607 7.43581 1.01878 7.47893 1.01878 7.52159C1.01878 9.96518 1.01976 12.4088 1.02073 14.8528C1.02073 15.3094 1.15482 15.7322 1.40599 16.1138C2.35044 17.5463 3.85019 18.0961 5.49473 18.5081V18.5077ZM7.79318 8.77456C8.16921 8.72628 8.91448 8.67471 9.63788 8.52753C10.9384 8.26221 12.1239 7.75362 13.0625 6.80019C14.0958 5.75066 14.1852 4.35191 13.2753 3.20488C12.6665 2.43801 11.8455 1.94816 10.9292 1.60504C9.04176 0.898633 7.10573 0.811445 5.14347 1.25535C3.89635 1.53754 2.75902 2.03535 1.86267 2.95504C1.00275 3.83769 0.780728 4.93456 1.28016 5.97378C1.64307 6.7294 2.26688 7.26003 2.99611 7.67721C4.36129 8.45909 5.8625 8.73799 7.79367 8.77456H7.79318ZM13.8976 7.37862C13.5775 7.64534 13.2942 7.90971 12.9804 8.13518C12.6699 8.35831 12.3294 8.54299 11.9587 8.77128H13.8976V7.37862Z"
                    fill="#0B0A0A"
                  />
                  <path
                    d="M7.49197 6.62394C6.87351 6.62581 6.32501 6.50019 5.81877 6.20722C4.73635 5.5805 4.64258 4.44566 5.61424 3.67785C6.58395 2.91144 8.46848 2.95316 9.40419 3.76128C10.2529 4.49488 10.1529 5.56691 9.1812 6.16222C8.65456 6.48519 8.07788 6.62956 7.49197 6.62347V6.62394ZM7.39772 5.64331C7.93019 5.64519 8.35917 5.53409 8.6531 5.33394C9.05585 5.05972 9.06022 4.73206 8.66476 4.44847C8.04436 4.00363 6.89197 3.99285 6.25845 4.42644C5.87173 4.69128 5.86396 5.03066 6.24825 5.29784C6.60727 5.54769 7.01683 5.648 7.39772 5.64284V5.64331Z"
                    fill="#0B0A0A"
                  />
                </svg>
              </Typography>
            </Box>
            <Box marginTop={2}>
              {productDetailItem.is_soldout ? (
                // Display the 'Sold Out' box if the item is sold
                <Box
                  sx={{
                    height: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "lightgray",
                    borderRadius: "20px",
                    fontFamily: "Outfit",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  Sold Out
                </Box>
              ) : (
                // Display buttons if the item is not sold
                <>
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid",
                        borderRadius: "20px",
                        fontFamily: "Outfit",
                        fontSize: "20px",
                      }}
                      onClick={handleCartToggle}
                    >
                      {inCart ? "Remove from Cart" : "Add to Cart"}
                    </Button>

                    <Box
                      sx={{
                        marginLeft: "20px",
                        border: "1px solid",
                        borderRadius: "20px",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={handleFavoriteClick}
                    >
                      {isFavorited ? (
                        <FavoriteBorderIcon
                          style={{ color: "red", fontSize: 34 }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{ color: "black", fontSize: 34 }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box marginTop={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{
                        borderRadius: "20px",
                        fontFamily: "Outfit",
                        fontSize: "20px",
                        fontWeight: 600,
                        padding: "15px",
                      }}
                    >
                      Buy It Now
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
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
                  Related Products
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item width={"100%"}>
            <Grid container spacing={3}>
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <ProductComponent
                      product={product}
                      userId={currentUser?.user?.id ?? 0}
                      removeFromWishlist={removeFromWishlist}
                    />
                  </Grid>
                ))
              ) : (
                <Typography
                  variant="h6"
                  sx={{ width: "100%", textAlign: "center" }}
                >
                  No records found
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Size Chart Popup */}
      <Modal
        open={openSizeChart}
        onClose={handleCloseSizeChart}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleCloseSizeChart}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Size Chart
          </Typography>
          <Typography variant="body2">
            <strong>XS:</strong> 18 inch <br />
            <strong>S:</strong> 20 inch <br />
            <strong>M:</strong> 22 inch <br />
            <strong>L:</strong> 32 inch <br />
            <strong>XL:</strong> 34 inch <br />
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ProductDetail;
