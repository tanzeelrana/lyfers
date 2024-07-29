import { FC } from "react";
import { Grid, Typography, MenuList, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BreadCrumbs from "../../components/BreadCrumbs";

const Payment: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Grid container>
      <BreadCrumbs title="Payments" />
      <Grid item lg={12} md={12} xs={12} sx={{ px: 2 }}>
        <Typography variant="body1">
          Payments for listing a vehicle or buyer add-on services
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} xs={8} sx={{ px: 2, pb: 2 }}>
        <MenuList>
          <MenuItem sx={{ py: 2, fontWeight: 900 }} divider={true}>Payment Methods <ChevronRightIcon sx={{ ml: "auto" }} /></MenuItem>
          <MenuItem sx={{ py: 2, fontWeight: 900 }} divider={true}>Payment Activity <ChevronRightIcon sx={{ ml: "auto" }} /></MenuItem>
        </MenuList>
      </Grid>
    </Grid>
  )
};

export default Payment;