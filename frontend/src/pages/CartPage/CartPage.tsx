import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Paper, Box, Checkbox, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import tshirt from '../../assets/images/tshirt.jpeg';

// Define the Product type
interface Product {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
    selected: boolean;  // Add a selected property
}

// Sample product data
const initialProducts: Product[] = [
    { id: 1, image: 'https://via.placeholder.com/150', name: 'Product 1', price: 10.0, quantity: 1, selected: false },
    { id: 2, image: 'https://via.placeholder.com/150', name: 'Product 2', price: 20.0, quantity: 1, selected: false },
    { id: 3, image: 'https://via.placeholder.com/150', name: 'Product 3', price: 30.0, quantity: 1, selected: false },
    { id: 4, image: 'https://via.placeholder.com/150', name: 'Product 4', price: 40.0, quantity: 1, selected: false },
];

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>(initialProducts);
    const [selectAll, setSelectAll] = useState<boolean>(false);

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

    const handleRemoveItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Calculate the subtotal
    const subtotal = cartItems
        .filter((item) => item.selected)
        .reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Check if any items are selected
    const hasSelectedItems = cartItems.some(item => item.selected);

    return (
        <Box width="100%" sx={{ flexGrow: 1, backgroundColor: '#FAFAFA' }}>
            <Grid container width="100%" direction="column" padding={{ xs: 2, sm: 3, md: 4 }} rowSpacing={2} flexShrink={0}>
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
                                Cart
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction={'row'} spacing={3}>
                        <Grid item xs={12} md={8}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow >
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    inputProps={{ 'aria-label': 'select all' }}
                                                />
                                            </TableCell>
                                            <TableCell >Product</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={product.selected}
                                                        onChange={() => handleSelectItem(product.id)}
                                                        inputProps={{ 'aria-label': `select ${product.name}` }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src={tshirt} alt={product.name} style={{ width: '200px', height: 'auto', marginRight: '16px' }} />
                                                        <Typography variant="body1">{product.name}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <IconButton onClick={() => handleDecrease(product.id)}>
                                                                <RemoveIcon />
                                                            </IconButton>
                                                            <Typography variant="body1" sx={{ marginX: 1 }}>
                                                                {product.quantity}
                                                            </Typography>
                                                            <IconButton onClick={() => handleIncrease(product.id)}>
                                                                <AddIcon />
                                                            </IconButton>
                                                        </Box>
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            sx={{ marginTop: 1 }}
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => handleRemoveItem(product.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>${(product.price * product.quantity).toFixed(2)}</TableCell>
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
                                    backgroundColor: '#FFE7DB',
                                    border: '1px solid',
                                    borderRadius: '15px',
                                }}
                            >
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1">Your Order</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                    </Grid>
                                    {/* Display the selected items with dynamic quantities */}
                                    {cartItems
                                        .filter(item => item.selected)
                                        .map(item => (
                                            <React.Fragment key={item.id}>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Outfit', fontSize: { xs: '12px', sm: '24px' } }}>
                                                        {item.name} x {item.quantity}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                                    <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
                                                </Grid>
                                            </React.Fragment>
                                        ))
                                    }
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1">Subtotal</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                        <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} textAlign="center">
                                        <Button
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            disabled={!hasSelectedItems}  // Disable the button if no items are selected
                                            sx={{ padding: { xs: '10px', sm: '15px' } }}
                                        >
                                            {hasSelectedItems ? 'Continue to Payment' : 'Select items to process'}  {/* Change button text based on selection */}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CartPage;
