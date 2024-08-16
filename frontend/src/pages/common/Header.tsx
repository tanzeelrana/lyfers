import React, { FC } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { ReactComponent as LogoBlackSvg } from "../../assets/logos/LogoDefault.svg";

import styles from "./header.module.css";
import { Stack, width } from "@mui/system";

const pages = [
  "Events",
  "Community",
  "Become A Lyfer",
  "Shop",
  "Wishlist",
  "CartItems",
];
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const HomePage: FC = (props: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = 240;
  const { window } = props;
    const navigate = useNavigate(); 

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
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
        <Button onClick={()=> navigate('/events')} id={styles.headerButtonText}>Events</Button>
        <Divider variant="middle" />

        <Button id={styles.headerButtonText}>Community</Button>
        <Divider variant="middle" />

        <Button onClick={()=> navigate('/become-a-lyfer')} id={styles.headerButtonText}>Become A Lyfer</Button>
        <Divider variant="middle" />

        <Button onClick={()=> navigate('/products')} id={styles.headerButtonText}>Shop</Button>
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box id={styles.headerBanner}>
                <Typography id={styles.headerBannerTextNormal} component="span">
                  WANT TO BECOME A LYFER?
                  <Typography
                    id={styles.headerBannerTextClickable}
                    component="span"
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
              md={0}
              lg={0}
              xl={0}
              sx={{
                display: {
                  xs: "flex",
                  sm: "none",
                  md: "none",
                  lg: "none",
                  xl: "none",
                },
              }}
              display={"flex"}
              justifyContent={"start"}
              alignSelf={"center"}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: {
                    xs: "flex",
                    sm: "none",
                    md: "none",
                    lg: "none",
                    xl: "none",
                  },
                }}
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
            </Grid>

            <Grid item xs={6} sm={3} md={3} lg={4} xl={2} marginY={2}>
              <Box
                width={"inherit"}
                display={"flex"}
                justifyContent={"center"}
                alignSelf={"center"}
                sx={{
                  height: {
                    xs: 80,
                    sm: 80,
                    md: 80,
                    lg: 80,
                    xl: 80,
                  },
                }}
              >
                <Box onClick={()=> navigate('/')} height={"inherit"} component={LogoBlackSvg} />
              </Box>
            </Grid>

            <Grid
              item
              xs={0}
              sm={6}
              md={7}
              lg={5}
              xl={4}
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            >
              <Grid container>
                <Grid item sm={3} md={3} lg={3} xl={3}>
                  <Button onClick={()=> navigate('/events')} id={styles.headerButtonText}>Events</Button>
                </Grid>
                <Grid item sm={3} md={3} lg={3} xl={3}>
                  <Button id={styles.headerButtonText}>Community</Button>
                </Grid>
                <Grid item sm={3} md={3} lg={3} xl={3}>
                  <Button onClick={()=> navigate('/become-a-lyfer')} id={styles.headerButtonText}>Become A Lyfer</Button>
                </Grid>
                <Grid item sm={3} md={3} lg={3} xl={3}>
                  <Button onClick={()=> navigate('/products')} id={styles.headerButtonText}>Shop</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={0}
              sm={2}
              md={2}
              lg={3}
              xl={3}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            >
              <Box>
                <Button size="large"
                  startIcon={<ShoppingCartCheckoutIcon />}
                  variant="contained"
                  id={styles.cartButton}
                >
                  cart
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
