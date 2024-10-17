import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../config/apiConfig";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { handleApiError } from "../../common/Api-error-handler";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/auth/actions";
interface Category {
  id: number;
  name: string;
}
interface SubCategory {
  subcategories: {
    id: number;
    name: string;
    category: Category;
  };
  onDelete: (id: number) => void;
}
const SubCategoryComponent: React.FC<SubCategory> = ({
  subcategories,
  onDelete,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCategory = async (subcategoryId: number) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/products/${subcategoryId}`
      );
      toast.success("Category Deleted successfully");
      onDelete(subcategoryId);
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo =='login'){
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
    }
  };

  return (
    <TableRow
      key={subcategories.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {subcategories.id}
      </TableCell>
      <TableCell component="th" scope="row">
        {subcategories.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {subcategories.category.name}
      </TableCell>
      <TableCell align="center">
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => deleteCategory(subcategories.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default SubCategoryComponent;
