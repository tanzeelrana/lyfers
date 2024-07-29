import { FC, useEffect } from "react";
import Parse from "parse";
import { Grid, Typography, Container, Card } from "@mui/material";
import suv from "../../assets/images/suv.png";
import BreadCrumbs from "../../components/BreadCrumbs";

const Services: FC = () => {
  return (
    <Container>
      <Grid container>
        <BreadCrumbs title="Services" />
        <Grid item lg={3} md={6} xs={10}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: "16px",
              cursor: "pointer",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <img
              src={suv}
              alt="suv"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Create Listing
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Services;
