import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

const BecomeALyfer = () => {
  return (
    <Box width={"100%"} sx={{ flexGrow: 1 }}>
      <Grid container width={"100%"} direction={"column"} rowSpacing={1}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            padding={16}
            sx={{
              backgroundImage:
                'url("https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/LYFERS-Collage.png?fit=2000%2C1600&ssl=1")',
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              position: "relative",
              height: "400px",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                opacity: 0.91,
                backgroundImage:
                  "linear-gradient(180deg, #000000 0%, #FF5300 100%)",
                zIndex: 1,
              },
            }}
          >
            <Grid item xs={12} zIndex={2}>
              <Typography
                sx={{
                  typography: {
                    xl: "h1",
                    lg: "h1",
                    md: "h1",
                    sm: "h2",
                    xs: "h4",
                  },
                }}
                color="white"
                textAlign={"center"}
              >
                OUR MISSION
              </Typography>
              <Typography variant="h5" color="white" textAlign={"center"}>
                To bring awareness around the positive effects of being
                “LYFERS”- Loving, Youthful, Forgiving, Empowering, Resilient and
                Strong!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          temp
        </Grid>
      </Grid>
    </Box>
  );
};

export default BecomeALyfer;
