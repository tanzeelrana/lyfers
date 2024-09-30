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
import SixPiller from "../pages/SixPiller/SixPiller";
import ContactUs from "../pages/ContactUs/ContactUs";
import BecomeALyfer from "../pages/BecomeALyfer/BecomeALyfer";
import EventsPage from "../pages/Events/EventsPage";
import EventDetail from "../pages/Events/EventDetail";
import PaymentDetail from "../pages/PaymentDetail/PaymentDetail";
import OrderConfermation from "../pages/Orders/OrderConfermation";
import ProductsPage from "../pages/Shop/ProductsPage";
import ProductDetail from "../pages/Shop/ProductDetail";
import CartPage from "../pages/CartPage/CartPage";
import ShippinginfoPage from "../pages/ShippinginfoPage/ShippinginfoPage";
import { Component } from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import OrdersPage from "../pages/Orders/OrdersPage";
import Products from "../pages/admin/Shop/Products";
import CreateProductPage from "../pages/admin/Shop/CreateProductPage";
import SubCategories from "../pages/admin/Shop/SubCategories";
import Colors from "../pages/admin/Shop/Colors";
import AllEvents from "../pages/admin/Events/AllEvents";
import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import Wishlist from "../pages/Wishlist/Wishlist";
import AdminOrdersPage from "../pages/admin/Orders/OrdersPage";


const routes = [
  {
    path: "/login",
    component: <Login />,
    ispublic: false,
    isAuth: true,
  },
  {
    path: "/",
    component: <HomePage />,
    ispublic: true,
  },
  {
    path: "/six-piller",
    component: <SixPiller />,
    ispublic: true,
  },
  {
    path: "/become-a-lyfer",
    component: <BecomeALyfer />,
    ispublic: true,
  },
  {
    path: "/contact-us",
    component: <ContactUs />,
    ispublic: true,
  },
  {
    path: "/events",
    component: <EventsPage />,
    ispublic: true,
  },
  {
    path: "/event-detail/:id",
    component: <EventDetail />,
    ispublic: false,
    addlayout: false,
  },
  {
    path: "/order-confermation",
    component: <OrderConfermation />,
    ispublic: false,
    addlayout: false,
  },
  {
    path: "/payment-detail",
    component: <PaymentDetail />,
    ispublic: false,
    addlayout: false,
  },
  {
    path: "/products",
    component: <ProductsPage />,
    ispublic: true,
  },
  {
    path: "/productDetail/:id",
    component: <ProductDetail />,
    ispublic: false,
    addlayout: false,
  },
  {
    path: "/cart",
    component: <CartPage />,
    ispublic: false,
    addlayout: false,
  },
  {
    path: "/shippingInfo",
    component: <ShippinginfoPage />,
    ispublic: false,
    addlayout: false,
  },
  {
    path: "/register/:id?",
    component: <Signup />,
    ispublic: false,
    isAuth: true,
  },
  {
    path: "/forgotPassword",
    component: <ForgotPassword />,
    ispublic: false,
    isAuth: true,
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
    path: "/dashboard",
    component: <Dashboard />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/admin/dashboard",
    component: <AdminDashboard />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/dashboard/orders",
    component: <OrdersPage />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/availableListing",
    component: <AvailableListing />,
    ispublic: false,
  },

  {
    path: "/myGarage/saleDetails",
    component: <SaleDetails />,
    ispublic: false,
  },

  {
    path: "/availableListing/carDetails",
    component: <CarDetails />,
    ispublic: false,
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
  {
    path: "/admin/products",
    component: <Products />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/admin/products/create",
    component: <CreateProductPage />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/admin/sub-categories",
    component: <SubCategories />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/admin/colors",
    component: <Colors />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/admin/events",
    component: <AllEvents />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/admin/products/edit/:productId",
    component: <CreateProductPage />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/dashboard/wishlist",
    component: <Wishlist />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/dashboard/orders",
    component: <OrdersPage />,
    ispublic: false,
    addlayout: true,
  },
  {
    path: "/admin/orders",
    component: <AdminOrdersPage />,
    ispublic: false,
    addlayout: true,
  },

  { path: "*", component: <PageNotFound />, ispublic: true },
  { path: "/*", component: <PageNotFound />, ispublic: true },
  { path: "/*/*", component: <PageNotFound />, ispublic: true },
];

export default routes;
