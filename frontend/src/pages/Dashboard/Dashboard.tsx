import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { format } from "date-fns";
import tshirt from "../../assets/images/tshirt.jpeg";
import { useSelector } from "react-redux";

function Dashboard() {
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);

  const items = [
    {
      id: 1,
      title: "Satan Shirt x2",
      price: 50,
      color: "Black",
      size: "M",
      image: "/path/to/image.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra finibus gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque commodo finibus mi, non suscipit sem egestas eget sed consectetur.",
    },
    {
      id: 2,
      title: "Angel Shirt x1",
      price: 35,
      color: "White",
      size: "L",
      image: "/path/to/image2.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra finibus gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque commodo finibus mi, non suscipit sem egestas eget sed consectetur.",
    },
  ];

  return (
    <Grid
      container
      width="100%"
      direction="column"
      padding={{ xs: 0, sm: 0, md: 4 }}
      rowSpacing={3}
      flexShrink={0}
      sx={{ marginBottom: "40px" }}
    >
      <Grid item xs={12}>
        <Grid container direction="column" flexShrink={0}>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{
              padding: { xs: "8px", sm: "12px", md: "16px" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                color: "#000000",
                marginLeft: { xs: 0, md: 20 },
              }}
            >
              Dashboard
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            padding: { xs: 1, sm: 2, md: 3 },
            borderRadius: 4,
            border: "1px solid",
          }}
        >
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            {" "}
            <img
              src={`data:image/png;base64,${currentUser.user.qr_code}`}
              alt="User QR Code"
              style={{ width: "200px", height: "200px" }}
            />
          </Box>

          <Typography variant="h6" fontFamily={"Outfit"} fontWeight="bold">
            Membership Points
          </Typography>
          <Box
            sx={{
              padding: 1,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "grey.300",
              marginTop: 2,
            }}
          >
            <Typography variant="h5" color="primary" fontWeight="bold">
              2028
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            QR Scan Details
          </Typography>
          {["John Doe", "John Doe", "John Doe"].map((name, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 1,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.300",
                marginTop: 1,
              }}
            >
              <Typography>{name}</Typography>
              <Typography color="primary" fontWeight="bold">
                20 Points
              </Typography>
            </Box>
          ))}

          <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 3 }}>
            Reviews
          </Typography>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{ padding: 2, marginTop: 2, borderRadius: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Box
                    component="img"
                    src={tshirt}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      borderRadius: 4,
                      height: { xs: 150, sm: 150 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h6">{item.title}</Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "4px 8px",
                            backgroundColor: "#ffece2",
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="body2" sx={{ marginRight: 1 }}>
                            {item.color}
                          </Typography>
                          <Box
                            sx={{
                              borderLeft: "1px solid #000",
                              height: "100%",
                              marginRight: 1,
                            }}
                          />
                          <Typography variant="body2">{item.size}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      fontFamily={"Outfit"}
                      variant="body1"
                      sx={{ marginTop: 2 }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ textAlign: "right" }}>
                  <Typography
                    fontFamily={"Outfit"}
                    variant="h6"
                    fontWeight="bold"
                  >
                    $ {item.price}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ marginTop: 2 }} />
            </Box>
          ))}

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Testimonials
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography fontFamily={"Outfit"} variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              pharetra finibus gravida. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Quisque
              commodo finibus mi, non suscipit sem egestas eget sed consectetur.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
