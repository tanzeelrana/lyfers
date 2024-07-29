import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";

function CarGarage() {
  const [value, setValue] = useState("1");

  let navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleNavigate = () => {
    navigate("/myGarage/saleDetails");
  };

  return (
    <Container>
      <Grid container>
        <BreadCrumbs title="My Garage" />
        <Grid item lg={12} md={12} xs={12} sx={{ mb: 5 }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="All" value="1" />
                  <Tab label="For Sale" value="2" />
                  <Tab label="Not Listed" value="3" />
                  <Tab label="Sold" value="4" />
                  <Button
                    variant="outlined"
                    sx={{ marginLeft: "auto", marginBottom: "8px" }}
                    startIcon={<AddIcon />}
                    color="success"
                    size="small"
                    onClick={handleNavigate}
                  >
                    Add Vehicle
                  </Button>
                </TabList>
              </Box>
            </TabContext>
            <CarCard />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CarGarage;
