import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SpeedIcon from "@mui/icons-material/Speed";
import Paper from "@mui/material/Paper";
import logo from "../../assets/images/front.png";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CarCard() {
  const divStyle = {
    display: "flex",
    alignItems: "center",
  };

  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/availableListing/carDetails");
  };
  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Box
            onClick={handleNavigate}
            sx={{
              backgroundImage: `url(${logo})`,
              height: "200px",
              mb: 2,
              position: "relative",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                background: "#000",
                bottom: 0,
                right: 0,
                color: "#fff",
                p: 1,
              }}
            >
              $9.950
            </Typography>
          </Box>
          <div style={divStyle}>
            <Typography variant="subtitle2" sx={{ color: "gray" }}>
              <PlaceIcon sx={{ fontSize: 17 }} />
            </Typography>
            <Typography
              sx={{ marginBottom: "2px", fontSize: "12px", color: "gray" }}
            >
              Denver
            </Typography>
          </div>

          <div style={divStyle}>
            <Typography
              sx={{ marginBottom: "7px", fontSize: "16px", paddingLeft: "3px" }}
            >
              <strong> 2015 Honda </strong>
            </Typography>
            <Typography sx={{ color: "lightGreen", marginLeft: "10px" }}>
              <BookmarkBorderIcon />
            </Typography>
          </div>

          <div style={divStyle}>
            <Typography variant="subtitle2">
              <SpeedIcon sx={{ fontSize: 20 }} />
            </Typography>
            <Typography
              sx={{
                marginBottom: "4px",
                marginLeft: "3px",
                fontSize: "12px",
                color: "grey",
              }}
            >
              Mileage: 123,456
            </Typography>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
