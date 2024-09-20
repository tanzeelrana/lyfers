import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,InputAdornment, IconButton 
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import ProductsComponent from "./ProductsComponent";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

interface Product {
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
}

export default function Products() {
    const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

    fetchProducts();
  }, []);

  const handleProductDelete = (deletedProductId: number) => {
    setProducts(products.filter(product => product.id !== deletedProductId));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
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
            sx={{
              padding: { xs: "8px", sm: "12px", md: "16px" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                color: "#000000",
                marginLeft: { xs: 0, md: 20 },
              }}
            >
              All Products
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent={"space-between"} marginBottom={3}>
          <Grid item alignItems={"center"} display={"flex"}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "20px" },
                fontWeight: "bold",
              }}
            >
              All Products
            </Typography>
          </Grid>
          <Grid item display={"flex"} justifyContent={"flex-end"} gap={2}>

          <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
            
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: { xs: "10px", sm: "15px" },
                textTransform:'capitalize'
              }}
              onClick={() => navigate('/admin/products/create')}
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
        <Grid container direction={"row"} spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductsComponent product={product} onDelete={handleProductDelete} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center">
                No Products Found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
