import { FC, useState } from "react";
import { Box, Grid, Typography, Avatar, Card, CardContent, Button, Paper, MenuList, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ErrorIcon from '@mui/icons-material/Error';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BreadCrumbs from "../../components/BreadCrumbs";
import { useSelector } from "react-redux";

const Account: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  return (
    <Grid container>
      <BreadCrumbs title="Account" />
      <Grid item lg={1} md={2} sm={3} xs={3} sx={{ px: 2, py: 1 }}>
        <Avatar alt="picture" src={currentUser?.profileImage} sx={{ width: 56, height: 56 }}>{currentUser?.profileImage}</Avatar>
      </Grid>
      <Grid item lg={11} md={10} xs={9} sx={{ py: 1 }}>
        <Typography variant="body1">
          {currentUser?.firstName +' '+ currentUser?.lastName }
        </Typography>
        <Typography variant="caption" component={Link} to="/profile" color="blue">
          Edit Profile
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} xs={8} sx={{ px: 2, py: 2 }}>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Verification
            </Typography>
            <Card sx={{ backgroundColor: "lightgrey", boxShadow: 0, px: 2, py: 2 }}>
              <Grid container>
                <Grid item lg={1} md={2} xs={3} sx={{ px: 2 }}>
                  <Avatar sx={{ backgroundColor: "white", color: "black", boxShadow: 0 }}><EmailIcon /></Avatar>
                </Grid>
                <Grid item lg={9} md={8} xs={7} sx={{ px: 2 }}>
                  <Typography variant="body2" fontWeight={"900"}>
                    Email
                  </Typography>
                  <Typography variant="body2">
                    {currentUser?.email}
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} xs={2} sx={{ alignSelf: "center" }}>
                  <Box display="flex" sx={{ float: "right" }}>
                    <CheckCircleIcon color="success" fontSize="small">Verified</CheckCircleIcon>
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Verified
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
            <Card sx={{ backgroundColor: "lightgrey", boxShadow: 0, px: 2, py: 2, mt: 2 }}>
              <Grid container>
                <Grid item lg={1} md={2} xs={3} sx={{ px: 2 }}>
                  <Avatar sx={{ backgroundColor: "white", color: "black", boxShadow: 0 }}><PhoneIphoneIcon /></Avatar>
                </Grid>
                <Grid item lg={9} md={8} xs={7} sx={{ px: 2 }}>
                  <Typography variant="body2" fontWeight={"900"}>
                    Identity
                  </Typography>
                  <Box display="flex">
                    <Typography variant="body2">
                      Phone + ID
                    </Typography>
                    <ErrorIcon color="warning" fontSize="small" sx={{ ml: 1 }} />
                  </Box>
                </Grid>
                <Grid item lg={2} md={2} xs={2} sx={{ alignSelf: "center" }}>
                  <Button variant="outlined" size="small" color="info" sx={{ float: "right" }}>
                    Verify
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={8} md={8} xs={8} sx={{ px: 2, py: 2 }}>
        <MenuList>
          <MenuItem sx={{ py: 2 }} divider={true} component={Link} to="/profile">Profile <ChevronRightIcon sx={{ ml: "auto" }} /></MenuItem>
          <MenuItem sx={{ py: 2 }} divider={true} component={Link} to="/security">Security <ChevronRightIcon sx={{ ml: "auto" }} /></MenuItem>
          <MenuItem sx={{ py: 2 }} divider={true} component={Link} to="/notifications">Notifications <ChevronRightIcon sx={{ ml: "auto" }} /></MenuItem>
          <MenuItem sx={{ py: 2 }} divider={true} component={Link} to="/payments">Payments <ChevronRightIcon sx={{ ml: "auto" }} /></MenuItem>
        </MenuList>
      </Grid>
    </Grid>
  )
};

export default Account;