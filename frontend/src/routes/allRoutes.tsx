import Account from "../pages/AccountSettings/Account";
import ForgotPassword from "../pages/ForgetPassword/ForgetPassword";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import Offers from "../pages/Offers/Offers";
import Payment from "../pages/AccountSettings/Payment";
import Profile from "../pages/AccountSettings/Profile";
import Services from "../pages/Services/Services";
import Signup from "../pages/Signup/Signup";
import PageNotFound from "./PageNotFound";
import AvailableListing from "../pages/AvailableListing/AvailableListing";
import CarGarage from "../pages/MyGarage/CarGarage";
import SaleDetails from "../pages/MyGarage/SaleDetails";
import CarDetails from "../pages/AvailableListing/CarDetails";
// import CarGarage from "../pages/Listing/CarGarage";
import Chat from "../pages/Chat/Chat";
import Security from "../pages/AccountSettings/Security";
import Notification from "../pages/AccountSettings/Notifications";
import TestDrives from "../pages/TestDrives/TestDrives";

const routes = [
  {
    path: "/",
    component: <Login />,
    ispublic: true,
  },
  {
    path: "/home",
    component: <HomePage />,
    ispublic: true,
  },
  {
    path: "/register",
    component: <Signup />,
    ispublic: true,
  },
  {
    path: "/forgotPassword",
    component: <ForgotPassword />,
    ispublic: true,
  },
  {
    path: "/services",
    component: <Services />,
    ispublic: true,
  },
  {
    path: "/myGarage",
    component: <CarGarage />,
    ispublic: false,
  },
  {
    path: "/availableListing",
    component: <AvailableListing />,
    ispublic:false
  },

  {
    path: "/myGarage/saleDetails",
    component: <SaleDetails/>,
    ispublic:false
  },

  {
    path:"/availableListing/carDetails",
    component:<CarDetails/>,
    ispublic:false
  },

  {
    path: "/offers",
    component: <Offers />,
    ispublic: false,
  },
  {
    path: "/account",
    component: <Account />,
    ispublic: false,
  },
  {
    path: "/profile",
    component: <Profile />,
    ispublic: false,
  },
  {
    path: "/chat",
    component: <Chat />,
    ispublic: false,
  },
  {
    path: "/security",
    component: <Security />,
    ispublic: false,
  },
  {
    path: "/notifications",
    component: <Notification />,
    ispublic: false,
  },
  {
    path: "/payments",
    component: <Payment />,
    ispublic: false,
  },
  {
    path: "/testDrives",
    component: <TestDrives />,
    ispublic: false,
  },
  { path: "*", component: <PageNotFound />, ispublic: true },
  { path: "/*", component: <PageNotFound />, ispublic: true },
  { path: "/*/*", component: <PageNotFound />, ispublic: true },
];

export default routes;
