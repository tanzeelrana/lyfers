import { Grid, TextField, Button, Typography, Paper, Box, Checkbox, FormControlLabel, Container } from '@mui/material'
import React, { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface FormValues {
    shippingFullName: string
    shippingEmail: string
    shippingPhoneNumber: string
    shippingDeliveryAddress: string
    shippingCity: string
    shippingState: string
    shippingPostalCode: string
    billingFullName: string
    billingEmail: string
    billingPhoneNumber: string
    billingDeliveryAddress: string
    billingCity: string
    billingState: string
    billingPostalCode: string
}

interface ValidationErrors {
    shippingFullName?: string
    shippingEmail?: string
    shippingPhoneNumber?: string
    shippingDeliveryAddress?: string
    shippingCity?: string
    shippingState?: string
    shippingPostalCode?: string
    billingFullName?: string
    billingEmail?: string
    billingPhoneNumber?: string
    billingDeliveryAddress?: string
    billingCity?: string
    billingState?: string
    billingPostalCode?: string
    discountCode?: string
}

const ShippinginfoPage: React.FC = () => {
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState<FormValues>({
        shippingFullName: '',
        shippingEmail: '',
        shippingPhoneNumber: '',
        shippingDeliveryAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingPostalCode: '',
        billingFullName: '',
        billingEmail: '',
        billingPhoneNumber: '',
        billingDeliveryAddress: '',
        billingCity: '',
        billingState: '',
        billingPostalCode: '',
    })

    const [errors, setErrors] = useState<ValidationErrors>({})
    const [discountCode, setDiscountCode] = useState('')
    const [discountApplied, setDiscountApplied] = useState(false)
    const [sameAddress, setSameAddress] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSameAddress(e.target.checked)
        if (e.target.checked) {
            setFormValues({
                ...formValues,
                billingFullName: formValues.shippingFullName,
                billingEmail: formValues.shippingEmail,
                billingPhoneNumber: formValues.shippingPhoneNumber,
                billingDeliveryAddress: formValues.shippingDeliveryAddress,
                billingCity: formValues.shippingCity,
                billingState: formValues.shippingState,
                billingPostalCode: formValues.shippingPostalCode,
            })
        } else {
            setFormValues({
                ...formValues,
                billingFullName: '',
                billingEmail: '',
                billingPhoneNumber: '',
                billingDeliveryAddress: '',
                billingCity: '',
                billingState: '',
                billingPostalCode: '',
            })
        }
    }

    const validate = (): boolean => {
        const newErrors: ValidationErrors = {}

        // Shipping Address Validation
        if (!formValues.shippingFullName) newErrors.shippingFullName = 'Full Name is required'
        if (!formValues.shippingEmail) newErrors.shippingEmail = 'Email is required'
        if (!formValues.shippingPhoneNumber) newErrors.shippingPhoneNumber = 'Phone Number is required'
        if (!formValues.shippingDeliveryAddress) newErrors.shippingDeliveryAddress = 'Delivery Address is required'
        if (!formValues.shippingCity) newErrors.shippingCity = 'City is required'
        if (!formValues.shippingState) newErrors.shippingState = 'State is required'
        if (!formValues.shippingPostalCode) newErrors.shippingPostalCode = 'Postal Code is required'

        // Billing Address Validation
        if (!sameAddress) {
            if (!formValues.billingFullName) newErrors.billingFullName = 'Full Name is required'
            if (!formValues.billingEmail) newErrors.billingEmail = 'Email is required'
            if (!formValues.billingPhoneNumber) newErrors.billingPhoneNumber = 'Phone Number is required'
            if (!formValues.billingDeliveryAddress) newErrors.billingDeliveryAddress = 'Delivery Address is required'
            if (!formValues.billingCity) newErrors.billingCity = 'City is required'
            if (!formValues.billingState) newErrors.billingState = 'State is required'
            if (!formValues.billingPostalCode) newErrors.billingPostalCode = 'Postal Code is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleApplyDiscount = () => {
        if (discountCode === 'Save20') {
            setDiscountApplied(true)
            setErrors({});
        } else {
            setErrors({ ...errors, discountCode: 'Invalid discount code' })
        }
    }

    const handleSubmit = () => {
        if (validate()) {
            // Handle form submission logic here
            console.log('Form Submitted:', formValues)
        }
    }

    // Calculate order totals with discount
    const ticketsPrice = 50
    const count = 4
    const discount = discountApplied ? 20 : 0
    const tax = 10
    const shippingCost = 10
    const subtotal = ticketsPrice * count
    const total = subtotal - discount + tax + shippingCost

    return (
        <Container maxWidth={'xl'}>
            <Grid container width="100%" direction="row" padding={{ xs: 2, sm: 3, md: 4 }} spacing={2} flexShrink={0}>
                <Grid item xs={12} md={8}>
                    <Grid container xs={12} >
                        <Grid item xs={12} sx={{
                            border: '1px solid',
                            borderRadius: '20px',
                            padding: '20px'
                        }}>
                            <Typography variant="h6" sx={{
                                fontFamily: 'Outfit',
                                fontSize: '24px',
                                fontWeight: 600,
                                lineHeight: '60px'
                            }}>
                                Shipping Address
                            </Typography>
                            <TextField
                                name="shippingFullName"
                                label="Full Name"
                                value={formValues.shippingFullName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.shippingFullName}
                                helperText={errors.shippingFullName}
                            />
                            <Grid container spacing={2} margin="normal">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="shippingEmail"
                                        label="Email"
                                        value={formValues.shippingEmail}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.shippingEmail}
                                        helperText={errors.shippingEmail}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="shippingPhoneNumber"
                                        label="Phone Number"
                                        value={formValues.shippingPhoneNumber}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.shippingPhoneNumber}
                                        helperText={errors.shippingPhoneNumber}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                name="shippingDeliveryAddress"
                                label="Delivery Address"
                                value={formValues.shippingDeliveryAddress}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.shippingDeliveryAddress}
                                helperText={errors.shippingDeliveryAddress}
                            />
                            <Grid container spacing={2} margin="normal">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="shippingCity"
                                        label="City"
                                        value={formValues.shippingCity}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.shippingCity}
                                        helperText={errors.shippingCity}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="shippingState"
                                        label="State"
                                        value={formValues.shippingState}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.shippingState}
                                        helperText={errors.shippingState}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                name="shippingPostalCode"
                                label="Postal Code"
                                value={formValues.shippingPostalCode}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.shippingPostalCode}
                                helperText={errors.shippingPostalCode}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{
                            border: '1px solid',
                            borderRadius: '20px',
                            padding: '20px',
                            marginTop: '10px'
                        }}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant="h6" sx={{
                                    fontFamily: 'Outfit',
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    lineHeight: '60px'
                                }}>

                                    Billing Address
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={sameAddress}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Same as Shipping"
                                />

                            </Box>

                            <TextField
                                name="billingFullName"
                                label="Full Name"
                                value={formValues.billingFullName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.billingFullName}
                                helperText={errors.billingFullName}
                                disabled={sameAddress}
                            />
                            <Grid container spacing={2} margin="normal">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="billingEmail"
                                        label="Email"
                                        value={formValues.billingEmail}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.billingEmail}
                                        helperText={errors.billingEmail}
                                        disabled={sameAddress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="billingPhoneNumber"
                                        label="Phone Number"
                                        value={formValues.billingPhoneNumber}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.billingPhoneNumber}
                                        helperText={errors.billingPhoneNumber}
                                        disabled={sameAddress}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                name="billingDeliveryAddress"
                                label="Delivery Address"
                                value={formValues.billingDeliveryAddress}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.billingDeliveryAddress}
                                helperText={errors.billingDeliveryAddress}
                                disabled={sameAddress}
                            />
                            <Grid container spacing={2} margin="normal">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="billingCity"
                                        label="City"
                                        value={formValues.billingCity}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.billingCity}
                                        helperText={errors.billingCity}
                                        disabled={sameAddress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="billingState"
                                        label="State"
                                        value={formValues.billingState}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.billingState}
                                        helperText={errors.billingState}
                                        disabled={sameAddress}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                name="billingPostalCode"
                                label="Postal Code"
                                value={formValues.billingPostalCode}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.billingPostalCode}
                                helperText={errors.billingPostalCode}
                                disabled={sameAddress}
                            />
                        </Grid>
                    </Grid>
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
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" gutterBottom sx={{
                                    fontFamily: 'Outfit',
                                    fontSize: { xs: '12px', sm: '24px' },
                                    fontWeight: 600,
                                }}>
                                    Tickets x {count}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={12} container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Discount Code</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        placeholder="Add Discount Code"
                                        sx={{ backgroundColor: 'transparent' }}
                                        error={!!errors.discountCode}
                                        helperText={errors.discountCode}
                                    />
                                </Grid>
                                <Grid item xs={2} display={'flex'} justifyContent={'end'}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleApplyDiscount}
                                    >
                                        Apply
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">New Customer? Sign Up to get a better offer</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">Subtotal</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">Discount</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                <Typography variant="body1">${discount.toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">Tax</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                <Typography variant="body1">${tax.toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">Shipping Cost</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                <Typography variant="body1">${shippingCost.toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">Grand Total</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                <Typography variant="body1" gutterBottom sx={{
                                    fontFamily: 'Outfit',
                                    fontSize: { xs: '12px', sm: '24px' },
                                    fontWeight: 600,
                                }}>
                                    ${total.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} textAlign="center">
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ padding: { xs: '10px', sm: '15px' } }}
                                    onClick={handleSubmit}
                                >
                                    Place Your Order
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ShippinginfoPage
