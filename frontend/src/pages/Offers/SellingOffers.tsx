import React, { FC } from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Button,
  Avatar,
  Typography,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ padding: "12px", borderBottom: "1px solid #eee" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const SellingOffers: FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: { xs: 800, sm: 800, md: 500 },
        border: "1px solid #eee",
      }}
    >
      <Box className="offerListingTabsLayout">
        <Box
          className="offerListingRightSideMobile"
          sx={{
            width: "100%",
            display: { xs: "block", sm: "block", md: "none" },
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className="verticalTabsDesign"
          >
            <Tab
              label="2015 VW Passat"
              {...a11yProps(0)}
              className="aljskajsnd"
              sx={{ borderBottom: "1px solid #eee" }}
            />
            <Tab
              label="2024 honda civic"
              {...a11yProps(1)}
              sx={{ borderBottom: "1px solid #eee" }}
            />
            <Tab
              label="mercedes c63"
              {...a11yProps(2)}
              sx={{ borderBottom: "1px solid #eee" }}
            />
          </Tabs>
        </Box>
        <Box className="offerListingLeftIsde">
          <TabPanel value={value} index={0}>
            <Grid container>
              <Grid item lg={2} xs={12}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography variant="subtitle1" sx={{ marginTop: "6px" }}>
                  Taylor VW | Colorado Springs, CO
                </Typography>
              </Grid>
              <Grid item lg={2} xs={12}>
                <Typography variant="subtitle1" sx={{ marginTop: "6px" }}>
                  $7600
                </Typography>
              </Grid>
              <Grid item lg={2} xs={12}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ marginTop: "6px" }}
                >
                  View offer
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
        <Box
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          className="offerListingRightSide"
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className="verticalTabsDesign"
          >
            <Tab
              label="2015 VW Passat"
              {...a11yProps(0)}
              className="aljskajsnd"
              sx={{ borderBottom: "1px solid #eee" }}
            />
            <Tab
              label="2024 honda civic"
              {...a11yProps(1)}
              sx={{ borderBottom: "1px solid #eee" }}
            />
            <Tab
              label="mercedes c63"
              {...a11yProps(2)}
              sx={{ borderBottom: "1px solid #eee" }}
            />
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default SellingOffers;
