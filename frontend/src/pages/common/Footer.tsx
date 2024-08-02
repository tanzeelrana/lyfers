import {
  Button,
  IconButton,
  Typography,
  Box,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./Common.css";
import styles from "./footer.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import LogoBlack from "../../assets/logos/LogoBlack";
import { ReactComponent as LogoBlackSvg } from "../../assets/logos/LogoBlack.svg";
function Footer() {
  return (
    <Grid container id={styles.mainContainer}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        xl={12}
        sx={{
          paddingTop: 10,
          paddingBottom: 4,
          paddingLeft: {
            xs: 3,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 4,
          },
        }}
      >
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"start"}
          alignSelf={"center"}
          sx={{
            height: {
              xs: 80,
              sm: 90,
              md: 100,
              lg: 100,
              xl: 120,
            },
          }}
        >
          <Box height={"inherit"} component={LogoBlackSvg} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Divider variant="middle" />
        <Grid
          container
          sx={{ padding: 2 }}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <Grid
            item
            xs={0}
            sm={0}
            md={0}
            lg={1.5}
            xl={1.5}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={2.4}
            md={2.4}
            lg={1.5}
            xl={1.5}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography component={"span"} id={styles.clickAbleText}>
              Become a Lyfer
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2.4}
            md={2.4}
            lg={1}
            xl={1}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography component={"span"} id={styles.clickAbleText}>
              Shop
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2.4}
            md={2.4}
            lg={1}
            xl={1}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography component={"span"} id={styles.clickAbleText}>
              Community
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2.4}
            md={2.4}
            lg={1}
            xl={1}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography component={"span"} id={styles.clickAbleText}>
              Events
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={2.4}
            md={2.4}
            lg={1.5}
            xl={1.5}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography component={"span"} id={styles.clickAbleText}>
              Contact
            </Typography>
          </Grid>
          <Grid
            item
            xs={0}
            sm={0}
            md={0}
            lg={1.5}
            xl={1.5}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          ></Grid>
        </Grid>
        <Divider variant="middle" flexItem />
      </Grid>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Grid
          container
          sx={{ padding: 2 }}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <Grid
            item
            xs={12}
            sm={2.4}
            md={2.4}
            lg={1.5}
            xl={2}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography component={"span"} id={styles.secondaryContainer}>
              © 2024 LYFERS
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2.4}
            md={2.4}
            lg={1.5}
            xl={2}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography component={"span"} id={styles.secondaryContainer}>
              Terms & Conditions
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2.4}
            md={2.4}
            lg={1.5}
            xl={2}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography component={"span"} id={styles.secondaryContainer}>
              Privacy Policy
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
