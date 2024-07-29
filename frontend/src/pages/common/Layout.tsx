import * as React from "react";
import Box from "@mui/material/Box";
import Header from "./Header"
import Footer from "./Footer";
const drawerWidth = 280;

interface Props {
  window?: () => Window;
  children: any;
}

export default function Layout(props: Props) {
  const { window, children } = props;
 
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <Box>
        <Header></Header>
    </Box>
    
        {children}

    <Box sx={{left:'0',bottom:'0',width:'100%',}}>
        <Footer ></Footer>
    </Box>
    
    </>
  );
}
