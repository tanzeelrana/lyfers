import { Box, Button, Typography, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import React, { useEffect, useState } from 'react'
import productsCover from '../../assets/images/productsCover.png'
import ProductComponent from "./ProductComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import baseUrl from '../../config/apiConfig';

interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;

}
function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>(`${baseUrl}/products`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }


    return (
        <Box width="100%" sx={{ flexGrow: 1, backgroundColor: '#FAFAFA' }}>
            <Grid container width="100%" direction="column" padding={{ xs: 2, sm: 3, md: 4 }} rowSpacing={2} flexShrink={0}>

                <Grid item xs={12} borderRadius={{ xs: '20px', sm: '30px', md: '40px' }}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    flexShrink={0}
                    sx={{
                        height: { xs: '300px', sm: '500px', md: '600px' },
                    }} >
                    <Carousel autoPlay={true}
                        showThumbs={false} swipeScrollTolerance={1}
                        infiniteLoop={true}
                        emulateTouch={true} >
                        <img
                            src={productsCover}
                            alt="Event"
                            style={{

                                objectFit: 'cover',
                            }}
                        />
                        <img
                            src={productsCover}
                            alt="Event"
                            style={{

                                objectFit: 'cover',
                            }}
                        />
                        <img
                            src={productsCover}
                            alt="Event"
                            style={{

                                objectFit: 'cover',
                            }}
                        />

                    </Carousel>
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
                                marginBottom: { xs: '10px', sm: '15px', md: '20px' },
                                padding: { xs: '8px', sm: '12px', md: '16px' },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Syne',
                                    fontSize: { xs: '16px', sm: '24px', md: '32px' },
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: '120%',
                                    textAlign: 'center',
                                    color: '#000000',
                                }}
                            >
                                Buy LYFERS Merchandise
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction={'row'} spacing={3}>
                    {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <ProductComponent product={product} />
                            </Grid>
                        ))}
                </Grid>
                    </Grid>
               
            </Grid>
        </Box>
    )
}

export default ProductsPage