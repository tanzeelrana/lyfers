import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import { Link, useNavigate } from "react-router-dom";
import GarageOutlinedIcon from "@mui/icons-material/GarageOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MiscellaneousServicesOutlinedIcon from "@mui/icons-material/MiscellaneousServicesOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { logout } from "../store/auth/actions";
import { Button, Typography } from "@mui/material";
import CheckDriveLogo from "../assets/images/checkdrive-Logocopy.png";
import "./styles.scss";

const drawerWidth = 280;

interface Props {
  window?: () => Window;
  children: any;
}

const MenuItems = [
  {
    name: "My Garage",
    path: "/myGarage",
    icon: <GarageOutlinedIcon />
  },
  {
    name: "Available Listings",
    path: "/availableListing",
    icon: <SearchOutlinedIcon />
  },
  {
    name: "Services",
    path: "/services",
    icon: <MiscellaneousServicesOutlinedIcon />
  },
  {
    name: "Chat",
    path: "/chat",
    icon: <InboxIcon />
  },
  {
    name: "Test Drives",
    path: "/testDrives",
    icon: <CalendarTodayOutlinedIcon />
  },
  {
    name: "Offers",
    path: "/offers",
    icon: <LocalOfferOutlinedIcon />
  },
];

export default function Layout(props: Props) {
  const { window, children } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const selectedPath = useSelector((state: any) => state?.Auth.selectedPath);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sideMenuHandler = (item: any) => {
    navigate(item?.path);
  };

  const drawer = (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <img src={CheckDriveLogo} alt="logo" width="120px" />
      </Box>
      <Divider />
      <Box
        sx={{
          height: "75vh",
          overflow: "scroll",
        }}
      >
        <List>
          {MenuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 64,
                  px: 2.5,
                  color: "#fff",
                  "&.activeTab": {
                    backgroundColor: "#39483C6A",
                  },
                }}
                onClick={() => sideMenuHandler(item)}
                className={item?.path === selectedPath ? "activeTab" : ""}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ width: "100px", mx: "auto" }}>
        <Button sx={{ color: "#fff" }} component={Link} to="/account">Account</Button>
        <Button sx={{ color: "#fff" }}>Help</Button>
        <Button onClick={() => dispatch(logout())} sx={{ color: "#fff" }}>
          Logout
        </Button>
        <Typography sx={{ color: "#D6D6D6" }} variant="caption">
          Terms | Privacy
        </Typography>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "none" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
        className="drawerDesign"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ display: { xs: "block", sm: "none" } }} />
        {children}
      </Box>
    </Box>
  );
}
