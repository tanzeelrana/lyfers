import {
  Box,
  Button,
  Typography,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Sort";
import React, { useEffect, useState } from "react";
import productsCover from "../../assets/images/productsCover.png";
import ProductComponent from "./ProductComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import baseUrl from "../../config/apiConfig";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  colors: { name: string; code: string }[];
  size: string[];
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

function ProductsPage() {
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${baseUrl}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${baseUrl}/subcategories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchProducts();
    fetchCategories();
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

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.subcategoryId === selectedCategory)
    : products;

  // Function to handle sorting
  const sortedProducts = () => {
    switch (sortOrder) {
      case "priceLowToHigh":
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case "nameAtoZ":
        return [...filteredProducts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case "nameZtoA":
        return [...filteredProducts].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      default:
        return filteredProducts;
    }
  };

  const handleCategorySelect = (
    categoryId: number | null,
    categoryName: string
  ) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName);
    setSidebarOpen(false);
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    setSelectedCategoryName(null);
  };
  const removeFromWishlist = (productId: number) => {};

  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid
          item
          xs={9.2}
          borderRadius={{ xs: "20px", sm: "30px", md: "40px" }}
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexShrink={0}
          sx={{ height: { xs: "300px", sm: "500px", md: "600px" } }}
        >
          <Box>
            <Carousel
              autoPlay={true}
              showThumbs={false}
              swipeScrollTolerance={1}
              infiniteLoop={true}
              emulateTouch={true}
            >
              <img
                src={productsCover}
                alt="Event"
                style={{ objectFit: "cover" }}
              />
              <img
                src={productsCover}
                alt="Event"
                style={{ objectFit: "cover" }}
              />
              <img
                src={productsCover}
                alt="Event"
                style={{ objectFit: "cover" }}
              />
            </Carousel>
          </Box>
        </Grid>
      </Grid>

      {/* Sidebar Filter */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <Box
          sx={{ width: 200, padding: 2 }}
          onClick={() => setSidebarOpen(false)}
        >
          <Typography textAlign={"center"} variant="h6">
            Filter by Category
          </Typography>
          <List>
            <ListItem button onClick={() => handleCategorySelect(null, "All")}>
              <ListItemText sx={{ textAlign: "center" }} primary="All" />
            </ListItem>
            {categories.map((category) => (
              <ListItem
                button
                key={category.id}
                onClick={() => handleCategorySelect(category.id, category.name)}
              >
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={category.name}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth={"xl"}>
        <Grid container direction="column" rowSpacing={2} flexShrink={0}>
          <Grid item xs={12}>
            <Grid container direction="column" flexShrink={0}>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ marginBottom: { xs: "10px", sm: "15px", md: "20px" } }}
              >
                <Typography
                  sx={{
                    fontFamily: "Syne",
                    fontSize: { xs: "16px", sm: "24px", md: "32px" },
                    fontWeight: 700,
                    lineHeight: "120%",
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  Buy LYFERS Merchandise
                </Typography>
              </Grid>
              <Grid item>
                {/* Filters Button with Selected Category Name */}
                <Box display="flex" alignItems="center" sx={{ margin: 2 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setSidebarOpen(true)}
                  >
                    Filters
                  </Button>
                  {selectedCategoryName && (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ marginLeft: 2 }}
                    >
                      <Typography variant="body1">
                        {selectedCategoryName}
                      </Typography>
                      <IconButton onClick={clearFilter}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                  {/* Sorting Dropdown */}
                  <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    displayEmpty
                    sx={{ marginLeft: "auto", minWidth: 150 }}
                  >
                    <MenuItem value="" disabled>
                      Sorting
                    </MenuItem>
                    <MenuItem value="priceLowToHigh">
                      Price: Low to High
                    </MenuItem>
                    <MenuItem value="priceHighToLow">
                      Price: High to Low
                    </MenuItem>
                    <MenuItem value="nameAtoZ">Name: A to Z</MenuItem>
                    <MenuItem value="nameZtoA">Name: Z to A</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Products Grid */}
          <Grid item xs={12} sx={{ marginBottom: "80px" }}>
            <Grid container direction={"row"} spacing={4}>
              {sortedProducts().length > 0 ? (
                sortedProducts().map((product) => (
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
      </Container>
    </>
  );
}

export default ProductsPage;
