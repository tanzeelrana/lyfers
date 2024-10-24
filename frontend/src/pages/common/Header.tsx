
import React, { FC, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { ReactComponent as LogoBlackSvg } from "../../assets/logos/LogoDefault.svg";

import styles from "./header.module.css";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/actions";

const pages = [
  { name: "Events", path: "/events" },
  { name: "Community", path: "/community" },
  { name: "Become A Lyfer", path: "/become-a-lyfer" },
  { name: "Shop", path: "/products" },
];

interface Props {
  window?: () => Window;
}

const HomePage: FC<Props> = (props: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const auth = useSelector((state: any) => state?.Auth);

  const { window } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const drawerWidth = 240;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    if(auth.currentUser.user.user_type == 'admin'){
      navigate('/admin/orders');

    }else{
      navigate('/dashboard');
    }
    handleClose();
  };
  const handleProfile = () => {
    if(auth.currentUser.user.user_type == 'admin'){
      navigate('/admin/profile');

    }else{
      navigate('/profile');

    }
   
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      height={"100%"}
      paddingY={2}
      sx={{ textAlign: "center", backgroundColor: "white" }}
    >
      <Stack spacing={3}>
        {pages.map((page) => (
          <React.Fragment key={page.name}>
            <Button
              onClick={() => navigate(page.path)}
              id={styles.headerButtonText}
              sx={{
                backgroundColor:
                  location.pathname === page.path ? "lightgray" : "transparent",
              }}
            >
              {page.name}
            </Button>
            <Divider variant="middle" />
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid
            container
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignSelf={"center"}
          >
            <Grid item xs={12}>
              <Box id={styles.headerBanner}>
                <Typography
                  id={styles.headerBannerTextNormal}
                  component="span"
                  sx={{
                    fontSize: { xs: "10px", sm: "12px", md: "16px" },
                  }}
                >
                  WANT TO BECOME A LYFER?
                  <Typography
                    id={styles.headerBannerTextClickable}
                    component="span"
                    sx={{
                      fontSize: { xs: "10px", sm: "12px", md: "16px" },
                    }}
                    onClick={() => navigate("/become-a-lyfer")}
                  >
                    {" "}
                    CLICK HERE
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              sm={0}
              sx={{
                display: {
                  xs: "flex",
                  sm: "none",
                },
              }}
              display={"flex"}
              justifyContent={"center"}
              alignSelf={"center"}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
            </Grid>

            <Grid item xs={6} sm={3} md={4} marginY={1}>
              <Box
                width={"inherit"}
                display={"flex"}
                justifyContent={"center"}
                alignSelf={"center"}
                sx={{
                  height: {
                    xs: 60,
                    sm: 60,
                    md: 60,
                  },
                }}
              >
                <Box
                  onClick={() => navigate("/")}
                  height={"inherit"}
                  component={LogoBlackSvg}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={0}
              sm={6}
              md={4}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              display={"flex"}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            >
              <Grid container>
                {pages.map((page) => (
                  <Grid item sm={3} key={page.name}>
                    <Button
                      onClick={() => navigate(page.path)}
                      id={styles.headerButtonText}
                      sx={{
                        fontFamily: "Outfit",
                        color:
                          location.pathname === page.path ? "#FF5A00" : " #000",
                        fontWeight: location.pathname === page.path ? 700 : 500,
                      }}
                    >
                      {page.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={0}
              sm={2}
              md={4}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            >
            
              <Box display={"flex"} gap={2}>
                {auth.currentUser != null ? (
                  <>
                    <Avatar
                      onClick={handleClick}
                      src="/broken-image.jpg"
                      style={{ cursor: "pointer" }}
                    />
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                      <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                      <MenuItem onClick={handleProfile}>Profile</MenuItem>

                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    onClick={() => navigate("/login")}
                    id={styles.headerButtonText}
                    sx={{ fontFamily: "Outfit" }}
                  >
                    Login
                  </Button>
                )}

                <Button
                  size="large"
                  startIcon={<ShoppingCartCheckoutIcon />}
                  variant="contained"
                  id={styles.cartButton}
                  onClick={() => navigate("/cart")}
                >
                  Cart
                </Button>
              </Box>
            </Grid>
          </Grid>

          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomePage;
