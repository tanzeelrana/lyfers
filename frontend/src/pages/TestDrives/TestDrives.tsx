import { FC } from "react";
import { Grid, Typography, Container, Card } from "@mui/material";
import { InlineWidget } from "react-calendly";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import BreadCrumbs from "../../components/BreadCrumbs";

const TestDrives: FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: -34.397,
    lng: 150.644,
  };

  return (
    <Container maxWidth="xl">
      <Grid container>
        <BreadCrumbs title="TestDrives" />
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <InlineWidget url="https://calendly.com/ajmal-gl4/30min" />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12} sx={{ mt: 3 }}>
          <LoadScript googleMapsApiKey="YOUR_API_KEY">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={8}
              center={defaultCenter}
            >
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestDrives;
