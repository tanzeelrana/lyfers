import { Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "./styles.scss";
import BackArrow from "./BackArrow";

interface Props {
  title: string;
  optionalProp?: string;
}

export default function BreadCrumbs(props: Props) {
  const { title, optionalProp } = props;
  return (
    <Grid item lg={12} md={12} xs={12} sx={{ mb: 5 }}>
      <BackArrow/>
      <Typography variant="h4" color="text.primary">
        {title}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="./"
        >
          {title}
        </Link>
        </Typography>
        {optionalProp && (
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            {optionalProp}
          </Typography>
        )}
      </Breadcrumbs>
    </Grid>
  );
}
