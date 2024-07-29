import React, { FC } from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { margin } from "@mui/system";
import Logo from '../../assets/images/logo.webp'
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';



  const pages = ['Home', 'The 6 Pillers', 'Events','Community','Become A Lyfer', 'Shop','Wishlist','CartItems'];
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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container = window !== undefined ? () => window().document.body : undefined;


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' ,backgroundColor:'white'}}>
      <Box
            component="img"
            sx={{ 
              width: 100,
              height:40,
              display: {md: 'flex' },
            }}
            alt="Logo"
            src={Logo}
          />
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              width: 200,
              height:60,
              display: { xs: 'none', md: 'flex' },
            }}
            alt="Logo"
            src={Logo}
          />
           <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{color:'black'}} />
          </IconButton>

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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',  marginLeft:'100px'} }}>
            {/* {pages.map((page) => (
              
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' ,fontFamily:' "Montserrat", Sans-serif',fontSize:'15px',marginLeft:'25px'}}
              >
               {page === 'Wishlist' && <FavoriteBorderIcon/>}
               {page === 'CartItems' && <ShoppingCartCheckoutIcon/>}
                {page}
              </Button>
              
            ))} */}

          <Button 
            sx={{ my: 2, color: 'black', display: 'block' ,fontFamily:' "Montserrat", Sans-serif',fontSize:'15px',marginLeft:'25px'}}
          >
            Home
          </Button>
          <Button 
            sx={{ my: 2, color: 'black', display: 'block' ,fontFamily:' "Montserrat", Sans-serif',fontSize:'15px',marginLeft:'25px'}}
          >
            The 6 Pillers
          </Button>
          <Button 
            sx={{ my: 2, color: 'black', display: 'block' ,fontFamily:' "Montserrat", Sans-serif',fontSize:'15px',marginLeft:'25px'}}
          >
            Events
          </Button>
          <Button 
            sx={{ my: 2, color: 'black', display: 'block' ,fontFamily:' "Montserrat", Sans-serif',fontSize:'15px',marginLeft:'25px'}}
          >
            Commiunity
          </Button><Button 
            sx={{ my: 2, color: 'black', display: 'block' ,fontFamily:' "Montserrat", Sans-serif',fontSize:'15px',marginLeft:'25px'}}
          >
            Become A Lyfer
          </Button>
          <Button 
            sx={{ my: 2, color: 'black', display: 'block' ,fontFamily:' "Montserrat", Sans-serif',fontSize:'15px',marginLeft:'25px'}}
          >
            Shop
          </Button>
          <Button 
            sx={{ my: 2, color: 'black', display: 'block' ,marginLeft:'25px'}}
          >
            <FavoriteBorderIcon/>
          </Button>
          <Button 
            sx={{ my: 2, color: 'black', display: 'block' ,fontFamily:' "Montserrat", Sans-serif',fontSize:'15px',marginLeft:'25px'}}
          >
            <ShoppingCartCheckoutIcon/> 0 items
          </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
    
  );
};

export default HomePage;
