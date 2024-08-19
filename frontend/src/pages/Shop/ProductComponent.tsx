import React from 'react'
import { Box, Button, Typography, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import tshirt from '../../assets/images/tshirt.jpeg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
    product: {
        id: number;
        title: string;
        description: string;
        image: string;
        price: number; // Added price field
    };
}

const ProductComponent: React.FC<ProductProps> = ({ product }) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ borderRadius: '36px', position: 'relative' }}>
            <CardMedia
                sx={{ height: 290, objectFit: 'cover', }}
                image={tshirt}
                title="product"

            />
            {/* Wishlist Icon */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 230,
                    right: 30,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '5px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <FavoriteBorderIcon style={{ color: 'black', fontSize: 34 }} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 157,
                    right: 30,
                    backgroundColor: 'white',
                    height: '50px',
                    display: 'flex',
                    padding: '6px',
                    borderTopLeftRadius: '45%',
                    borderTopRightRadius: '45%',
                    justifyContent: 'center',
                    alignItems: 'start',
                }}
            >
                <AddCircleOutlineOutlinedIcon style={{ color: 'black', fontSize: 34, }} />
            </Box>
            <CardContent sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography gutterBottom component="div"
                    sx={{
                        fontFamily: 'Outfit',
                        fontSize: '30px',
                        fontWeight: 500,
                        lineHeight: '60px',
                    }}>
                    {product.title}
                </Typography>
                <Typography color="text.secondary"
                    sx={{
                        fontFamily: 'Syne',
                        fontSize: '30px',
                        fontWeight: 700,
                        lineHeight: '75px',
                        color: '#FF5A00'
                    }}>

                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography color="text.secondary"
                    sx={{
                        fontFamily: 'Outfit',
                        fontSize: '28px',
                        fontWeight: 400,
                        lineHeight: '40px',
                        color: '#FBB03A'
                    }}
                    onClick={() => navigate(`/productDetail/${product.id}`)}>

                    View Detail
                </Typography>
                <span> <ArrowRightAltIcon style={{ color: '#FBB03A', fontSize: 34 }} /></span>
            </CardActions>
        </Card>
        // <Grid container spacing={3} padding={{ xs: 0, sm: 0, md: 4 }}>
        //     <Grid item xs={12} md={6}>
        //         <Grid container spacing={3}>

        //             <Grid item xs={12} sm={12} md={6} >
        //                 <Card sx={{ borderRadius: '36px', position: 'relative' }}>
        //                     <CardMedia
        //                         sx={{ height: 290, objectFit: 'cover', }}
        //                         image={tshirt}
        //                         title="product"

        //                     />
        //                     {/* Wishlist Icon */}
        //                     <Box
        //                         sx={{
        //                             position: 'absolute',
        //                             bottom: 230,
        //                             right: 30,
        //                             backgroundColor: 'white',
        //                             borderRadius: '50%',
        //                             padding: '5px',
        //                             justifyContent: 'center',
        //                             alignItems: 'center'
        //                         }}
        //                     >
        //                         <FavoriteBorderIcon style={{ color: 'black', fontSize: 34 }} />
        //                     </Box>
        //                     <Box
        //                         sx={{
        //                             position: 'absolute',
        //                             bottom: 157,
        //                             right: 30,
        //                             backgroundColor: 'white',
        //                             height: '50px',
        //                             display: 'flex',
        //                             padding: '6px',
        //                             borderTopLeftRadius: '45%',
        //                             borderTopRightRadius: '45%',
        //                             justifyContent: 'center',
        //                             alignItems: 'start',
        //                         }}
        //                     >
        //                         <AddCircleOutlineOutlinedIcon style={{ color: 'black', fontSize: 34, }} />
        //                     </Box>
        //                     <CardContent sx={{
        //                         display: 'flex',
        //                         justifyContent: 'space-between',
        //                     }}>
        //                         <Typography gutterBottom component="div"
        //                             sx={{
        //                                 fontFamily: 'Outfit',
        //                                 fontSize: '50px',
        //                                 fontWeight: 400,
        //                                 lineHeight: '60px'
        //                             }}>
        //                             {product.title}
        //                         </Typography>
        //                         <Typography color="text.secondary"
        //                             sx={{
        //                                 fontFamily: 'Syne',
        //                                 fontSize: '60px',
        //                                 fontWeight: 700,
        //                                 lineHeight: '75px',
        //                                 color: '#FF5A00'
        //                             }}>

        //                             ${product.price}
        //                         </Typography>
        //                     </CardContent>
        //                     <CardActions>
        //                         <Typography color="text.secondary"
        //                             sx={{
        //                                 fontFamily: 'Outfit',
        //                                 fontSize: '28px',
        //                                 fontWeight: 400,
        //                                 lineHeight: '40px',
        //                                 color: '#FBB03A'
        //                             }}
        //                             onClick={() => navigate('/productDetail')}>

        //                             View Detail
        //                         </Typography>
        //                         <span> <ArrowRightAltIcon style={{ color: '#FBB03A', fontSize: 34 }} /></span>
        //                     </CardActions>
        //                 </Card>
        //             </Grid>

        //         </Grid>
        //     </Grid>
        //     <Grid item xs={12} md={6}>
        //         <Card sx={{ borderRadius: '36px', position: 'relative' }}>
        //             <CardMedia
        //                 sx={{ height: 718 }}
        //                 image={tshirt}
        //                 title="green iguana"
        //             />
        //             <Box
        //                 sx={{
        //                     position: 'absolute',
        //                     bottom: 300,
        //                     right: 30,
        //                     backgroundColor: 'white',
        //                     borderRadius: '50%',
        //                     padding: '5px',
        //                     justifyContent: 'center',
        //                     alignItems: 'center'
        //                 }}
        //             >
        //                 <FavoriteBorderIcon style={{ color: 'black', fontSize: 34 }} />
        //             </Box>
        //             <Box
        //                 sx={{
        //                     position: 'absolute',
        //                     bottom: 230,
        //                     right: 30,
        //                     backgroundColor: 'white',
        //                     height: '50px',
        //                     display: 'flex',
        //                     padding: '6px',
        //                     borderTopLeftRadius: '45%',
        //                     borderTopRightRadius: '45%',
        //                     justifyContent: 'center',
        //                     alignItems: 'start',
        //                 }}
        //             >
        //                 <AddCircleOutlineOutlinedIcon style={{ color: 'black', fontSize: 34, }} />
        //             </Box>
        //             <CardContent sx={{ height: 50, display: 'flex', justifyContent: 'space-between' }}>
        //                 <Typography gutterBottom component="div"
        //                     sx={{
        //                         fontFamily: 'Outfit',
        //                         fontSize: '50px',
        //                         fontWeight: 400,
        //                         lineHeight: '60px'
        //                     }}>
        //                     Lizard
        //                 </Typography>
        //                 <Typography color="text.secondary"
        //                     sx={{
        //                         fontFamily: 'Syne',
        //                         fontSize: '60px',
        //                         fontWeight: 700,
        //                         lineHeight: '75px',
        //                         color: '#FF5A00'
        //                     }}>

        //                     $50
        //                 </Typography>
        //             </CardContent>
        //             <CardActions>
        //                 <Typography
        //                     color="text.secondary"
        //                     sx={{
        //                         fontFamily: 'Outfit',
        //                         fontSize: { xs: '20px', sm: '28px' }, // Responsive font size
        //                         fontWeight: 400,
        //                         lineHeight: '40px',
        //                         color: '#FBB03A',
        //                         display: 'flex',
        //                         alignItems: 'center',
        //                     }}
        //                     onClick={() => navigate('/productDetail')}
        //                 >
        //                     View Detail
        //                     <ArrowRightAltIcon sx={{ color: '#FBB03A', fontSize: { xs: 24, sm: 34 }, ml: 1 }} />
        //                 </Typography>
        //             </CardActions>
        //             <CardContent >
        //                 <Typography gutterBottom component="div"
        //                     sx={{
        //                         fontFamily: 'Outfit',
        //                         fontSize: '18px',
        //                     }}>
        //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel odio est. Cras vestibulum sit amet leo quis tristique.
        //                 </Typography>
        //             </CardContent>
        //         </Card>
        //     </Grid>
        //     <Grid item xs={12} md={6}>
        //         <Card sx={{ borderRadius: '36px', position: 'relative' }}>
        //             <CardMedia
        //                 sx={{ height: 718 }}
        //                 image={tshirt}
        //                 title="green iguana"
        //             />
        //             <Box
        //                 sx={{
        //                     position: 'absolute',
        //                     bottom: 300,
        //                     right: 30,
        //                     backgroundColor: 'white',
        //                     borderRadius: '50%',
        //                     padding: '5px',
        //                     justifyContent: 'center',
        //                     alignItems: 'center'
        //                 }}
        //             >
        //                 <FavoriteBorderIcon style={{ color: 'black', fontSize: 34 }} />
        //             </Box>
        //             <Box
        //                 sx={{
        //                     position: 'absolute',
        //                     bottom: 230,
        //                     right: 30,
        //                     backgroundColor: 'white',
        //                     height: '50px',
        //                     display: 'flex',
        //                     padding: '6px',
        //                     borderTopLeftRadius: '45%',
        //                     borderTopRightRadius: '45%',
        //                     justifyContent: 'center',
        //                     alignItems: 'start',
        //                 }}
        //             >
        //                 <AddCircleOutlineOutlinedIcon style={{ color: 'black', fontSize: 34, }} />
        //             </Box>
        //             <CardContent sx={{ height: 50, display: 'flex', justifyContent: 'space-between' }}>
        //                 <Typography gutterBottom component="div"
        //                     sx={{
        //                         fontFamily: 'Outfit',
        //                         fontSize: '50px',
        //                         fontWeight: 400,
        //                         lineHeight: '60px'
        //                     }}>
        //                     Lizard
        //                 </Typography>
        //                 <Typography color="text.secondary"
        //                     sx={{
        //                         fontFamily: 'Syne',
        //                         fontSize: '60px',
        //                         fontWeight: 700,
        //                         lineHeight: '75px',
        //                         color: '#FF5A00'
        //                     }}>

        //                     $50
        //                 </Typography>
        //             </CardContent>
        //             <CardActions>
        //                 <Typography
        //                     color="text.secondary"
        //                     sx={{
        //                         fontFamily: 'Outfit',
        //                         fontSize: { xs: '20px', sm: '28px' }, // Responsive font size
        //                         fontWeight: 400,
        //                         lineHeight: '40px',
        //                         color: '#FBB03A',
        //                         display: 'flex',
        //                         alignItems: 'center',
        //                     }}
        //                     onClick={() => navigate('/productDetail')}>
        //                     View Detail
        //                     <ArrowRightAltIcon sx={{ color: '#FBB03A', fontSize: { xs: 24, sm: 34 }, ml: 1 }} />
        //                 </Typography>
        //             </CardActions>
        //             <CardContent >
        //                 <Typography gutterBottom component="div"
        //                     sx={{
        //                         fontFamily: 'Outfit',
        //                         fontSize: '18px',
        //                     }}>
        //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel odio est. Cras vestibulum sit amet leo quis tristique.
        //                 </Typography>
        //             </CardContent>
        //         </Card>
        //     </Grid>
        //     <Grid item xs={12} md={6}>
        //         <Grid container spacing={3}>
        //             {[1, 2, 3, 4].map((index) => (
        //                 <Grid item xs={12} sm={12} md={6} key={index}>
        //                     <Card sx={{ borderRadius: '36px', position: 'relative' }}>
        //                         <CardMedia
        //                             sx={{ height: 290 }}
        //                             image={tshirt}
        //                             title="product"
        //                         />
        //                         <Box
        //                             sx={{
        //                                 position: 'absolute',
        //                                 bottom: 230,
        //                                 right: 30,
        //                                 backgroundColor: 'white',
        //                                 borderRadius: '50%',
        //                                 padding: '5px',
        //                                 justifyContent: 'center',
        //                                 alignItems: 'center'
        //                             }}
        //                         >
        //                             <FavoriteBorderIcon style={{ color: 'black', fontSize: 34 }} />
        //                         </Box>
        //                         <Box
        //                             sx={{
        //                                 position: 'absolute',
        //                                 bottom: 157,
        //                                 right: 30,
        //                                 backgroundColor: 'white',
        //                                 height: '50px',
        //                                 display: 'flex',
        //                                 padding: '6px',
        //                                 borderTopLeftRadius: '45%',
        //                                 borderTopRightRadius: '45%',
        //                                 justifyContent: 'center',
        //                                 alignItems: 'start',
        //                             }}
        //                         >
        //                             <AddCircleOutlineOutlinedIcon style={{ color: 'black', fontSize: 34, }} />
        //                         </Box>
        //                         <CardContent sx={{
        //                             display: 'flex',
        //                             justifyContent: 'space-between',
        //                         }}>
        //                             <Typography gutterBottom component="div"
        //                                 sx={{
        //                                     fontFamily: 'Outfit',
        //                                     fontSize: '50px',
        //                                     fontWeight: 400,
        //                                     lineHeight: '60px'
        //                                 }}>
        //                                 Lizard
        //                             </Typography>
        //                             <Typography color="text.secondary"
        //                                 sx={{
        //                                     fontFamily: 'Syne',
        //                                     fontSize: '60px',
        //                                     fontWeight: 700,
        //                                     lineHeight: '75px',
        //                                     color: '#FF5A00'
        //                                 }}>

        //                                 $50
        //                             </Typography>
        //                         </CardContent>
        //                         <CardActions>
        //                             <Typography color="text.secondary"
        //                                 sx={{
        //                                     fontFamily: 'Outfit',
        //                                     fontSize: '28px',
        //                                     fontWeight: 400,
        //                                     lineHeight: '40px',
        //                                     color: '#FBB03A'
        //                                 }}
        //                                 onClick={() => navigate('/productDetail')}
        //                             >

        //                                 View Detail
        //                             </Typography>
        //                             <span> <ArrowRightAltIcon style={{ color: '#FBB03A', fontSize: 34 }} /></span>
        //                         </CardActions>
        //                     </Card>
        //                 </Grid>
        //             ))}
        //         </Grid>
        //     </Grid>
        // </Grid>
    )
}

export default ProductComponent;
