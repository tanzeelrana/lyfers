import { FC, useState } from "react";
import { Box, Grid, Typography, Avatar, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EmailIcon from '@mui/icons-material/Email';
import BreadCrumbs from "../../components/BreadCrumbs";
import DeleteIcon from '@mui/icons-material/Delete';

const Security: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Grid container>
            <BreadCrumbs title="Security" />
            <Grid item lg={8} md={8} xs={8} sx={{ px: 2 }}>
                <Typography variant="body1">
                    Logged in with
                </Typography>
                <Card sx={{ backgroundColor: "lightgrey", boxShadow: 0, px: 2, py: 2, mt: 2 }}>
                    <Grid container>
                        <Grid item lg={1} md={2} xs={3} sx={{ px: 2 }}>
                            <Avatar sx={{ backgroundColor: "white", color: "black", boxShadow: 0 }}><EmailIcon /></Avatar>
                        </Grid>
                        <Grid item lg={8} md={7} xs={6} sx={{ px: 2 }}>
                            <Typography variant="body2" fontWeight={"900"}>
                                Email
                            </Typography>
                            <Typography variant="body2">
                                hillec20@gmail.com
                            </Typography>
                        </Grid>
                        <Grid item lg={3} md={3} xs={3} sx={{ alignSelf: "center" }}>
                            <Button variant="outlined" size="small" color="info" sx={{ float: "right" }}>
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item lg={8} md={8} xs={8} sx={{ px: 2, py: 2 }}>
                <Typography variant="body1">
                    Delete your account
                </Typography>
                <Card sx={{ backgroundColor: "lightgrey", boxShadow: 0, px: 2, py: 2, mt: 2 }}>
                    <Grid container>
                        <Grid item lg={4} md={4} xs={4} sx={{ px: 2 }}>
                            <Box display="flex">
                                <Avatar sx={{ backgroundColor: "white", color: "black", boxShadow: 0 }}><DeleteIcon /></Avatar>
                                <Typography variant="body2" fontWeight={"900"} sx={{ alignSelf: "center", px: 3 }}>
                                    Delete Account
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={8} md={8} xs={8} sx={{ alignSelf: "center" }}>
                            <Button variant="outlined" size="small" color="info" sx={{ float: "right" }}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
};

export default Security;