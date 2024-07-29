import React, { FC } from "react";
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Container,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SellingOffers from "./SellingOffers";
import "./styles.scss";
import BuyingOffers from "./BuyingOffers";
import BreadCrumbs from "../../components/BreadCrumbs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Offers: FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Grid container>
        <BreadCrumbs title="Offers" />
        <Grid item lg={12} md={12} xs={12} className="offerPageDesign">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Selling" {...a11yProps(0)} />
                <Tab label="Buying" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SellingOffers />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <BuyingOffers />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Offers;
