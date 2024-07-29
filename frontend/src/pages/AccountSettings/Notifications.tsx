import { FC, useState } from "react";
import { Box, Grid, Typography, Avatar, Button, TextField, Checkbox } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ErrorIcon from '@mui/icons-material/Error';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BreadCrumbs from "../../components/BreadCrumbs";

const Notification: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Grid container>
            <BreadCrumbs title="Notifications" />
            <Grid item lg={6} md={6} xs={6}></Grid>
            <Grid item lg={4} md={4} xs={4} sx={{ px: 2, py: 1 }}>
                <Typography variant="body1" fontWeight={"900"} display="inline">
                    Email
                </Typography>
                <Typography variant="body1" fontWeight={"900"} display="inline" sx={{ ml: 5 }}>
                    SMS
                </Typography>
            </Grid>
            <Grid item lg={6} md={6} xs={6} sx={{ px: 2, py: 1 }}>
                <Typography variant="body1" fontWeight={"900"}>
                    Transactions
                </Typography>
                <Typography variant="body2">
                    Offers, messages, payments, services etc
                </Typography>
            </Grid>
            <Grid item lg={4} md={4} xs={4} sx={{ px: 2, py: 1 }}>
                <Checkbox defaultChecked />
                <Checkbox defaultChecked sx={{ml: 5}}/>
            </Grid>
            <Grid item lg={6} md={6} xs={6} sx={{ px: 2, py: 1 }}>
                <Typography variant="body1" fontWeight={"900"}>
                    Marketing
                </Typography>
                <Typography variant="body2">
                    New listings, deals from PrivateAuto
                </Typography>
            </Grid>
            <Grid item lg={4} md={4} xs={4} sx={{ px: 2, py: 1 }}>
                <Checkbox defaultChecked />
                <Checkbox sx={{ml: 5}}/>
            </Grid>
            {/* <Grid item lg={6} md={6} xs={6} sx={{ px: 2, py: 2 }}>
                <TextField id="legalFirstName" label="Legal First Name" variant="filled" margin="dense" fullWidth />
                <TextField id="legalLastName" label="Legal Last Name" variant="filled" margin="dense" fullWidth />
                <TextField id="nickname" label="Nickname" variant="filled" margin="dense" fullWidth />
                <TextField id="phoneNumber" label="Phone Number" variant="filled" margin="dense" fullWidth />
                <TextField id="email" label="Email" variant="filled" margin="dense" fullWidth />
                <TextField id="address" label="Address" variant="filled" margin="dense" fullWidth />
                <Button variant="contained" color="info" sx={{ mt: 2, float: "right" }}>Save</Button>
            </Grid> */}
        </Grid>
    )
};

export default Notification;