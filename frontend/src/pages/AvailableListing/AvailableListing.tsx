import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import CarCard from "../MyGarage/CarCard";
import BreadCrumbs from "../../components/BreadCrumbs";

function AvailableListing() {
  return (
    <Container>
      <Grid container>
      <BreadCrumbs title="Available Listings"></BreadCrumbs>
        <Grid item lg={12} md={12} xs={12} sx={{ mb: 5 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              style={{ width: "700px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "lightgreen" }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Search"
            />
          </div>
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          xs={12}
          sx={{ display: "flex", gap: "30px", marginTop: "30px" }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "lightgreen",
              color: "black",
              ":hover": {
                backgroundColor: "lightgreen",
              },
            }}
          >
            Current Listing (6)
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "lightGray",
              color: "black",
              ":hover": {
                backgroundColor: "lightgray",
              },
            }}
          >
            Sold (6)
          </Button>
        </Grid>

        <Grid item lg={12} md={12} xs={12} sx={{ display: "flex" }}>
          <CarCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AvailableListing;
