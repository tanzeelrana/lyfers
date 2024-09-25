import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  category: Category;
}

export default function SubCategories() {
  const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newSubCategoryName, setNewSubCategoryName] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState<
    number | null
  >(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    nameError?: string;
    categoryError?: string;
  }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${baseUrl}/subcategories/categories`
        );
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get<SubCategory[]>(
          `${baseUrl}/subcategories`
        );
        setSubCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching subcategories");
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  const handleOpenEditModal = (subcategory: SubCategory) => {
    setCurrentSubCategoryId(subcategory.id);
    setNewSubCategoryName(subcategory.name);
    setSelectedCategoryId(subcategory.category.id);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setNewSubCategoryName("");
    setSelectedCategoryId("");
    setCurrentSubCategoryId(null);
  };
  const handleError = (message: string) => {
    toast.error(message);
  };
  const validateForm = () => {
    const newErrors: { nameError?: string; categoryError?: string } = {};

    if (!newSubCategoryName.trim()) {
      newErrors.nameError = "Subcategory name is required.";
    }
    if (!selectedCategoryId) {
      newErrors.categoryError = "Category must be selected.";
    }

    setErrors(newErrors);

    // Return true if no errors, false if errors exist
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const subCategoryData = {
        name: newSubCategoryName,
        categoryId: selectedCategoryId,
      };

      if (editMode && currentSubCategoryId !== null) {
        // Update existing subcategory
        await axios.put(
          `${baseUrl}/subcategories/${currentSubCategoryId}`,
          subCategoryData
        );
      } else {
        // Create new subcategory
        await axios.post(`${baseUrl}/subcategories`, subCategoryData);
      }

      handleCloseModal();
      // Refetch subcategories after creating or updating
      const response = await axios.get<SubCategory[]>(
        `${baseUrl}/subcategories`
      );
      setSubCategories(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const messages = error.response.data.errors
          .map((err: any) => err.msg)
          .join(", ");
        handleError(messages || "Validation error");
      } else {
        handleError(
          editMode ? "Error updating subcategory" : "Error creating subcategory"
        );
      }
    }
  };

  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/subcategories/${id}`);
      setSubCategories((prev) =>
        prev.filter((subcategory) => subcategory.id !== id)
      );
      setDeleteConfirmOpen(false);
    } catch (error) {
      setError("Error deleting subcategory");
    }
  };

  const openDeleteConfirm = (id: number) => {
    setCurrentSubCategoryId(id);
    setDeleteConfirmOpen(true);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

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
            sx={{ padding: { xs: "8px", sm: "12px", md: "16px" } }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                fontWeight: 700,
                lineHeight: "120%",
                color: "#000000",
                marginLeft: { xs: 0, md: 20 },
              }}
            >
              All Categories
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent={"space-between"} marginBottom={3}>
          <Grid item alignItems={"center"} display={"flex"}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "20px" },
                fontWeight: "bold",
              }}
            >
              All Categories
            </Typography>
          </Grid>
          <Grid item display={"flex"} justifyContent={"flex-end"} gap={2}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: { xs: "10px", sm: "15px" },
                textTransform: "capitalize",
              }}
              onClick={() => {
                setModalOpen(true);
                setEditMode(false);
              }}
            >
              Add New Subcategory
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    Category Name
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    Sub Category Name
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubcategories.length > 0 ? (
                  filteredSubcategories.map((subcategory) => (
                    <TableRow key={subcategory.id}>
                      <TableCell>{subcategory.id}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {subcategory.category.name}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {subcategory.name}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          onClick={() => handleOpenEditModal(subcategory)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => openDeleteConfirm(subcategory.id)}
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="h6" textAlign="center">
                        No Products Found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        PaperProps={{
          style: {
            width: "600px",
            maxWidth: "90%",
            margin: "auto",
          },
        }}
      >
        <DialogTitle textAlign={"center"} fontWeight={"bold"}>
          {editMode ? "Edit Subcategory" : "Add New Subcategory"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              value={newSubCategoryName}
              onChange={(e) => setNewSubCategoryName(e.target.value)}
              error={!!errors.nameError}
              helperText={errors.nameError}
            />
            <FormControl fullWidth margin="dense">
              <Select
                value={selectedCategoryId}
                onChange={(e) =>
                  setSelectedCategoryId(e.target.value as number)
                }
                displayEmpty
              >
                <MenuItem value="">
                  <InputLabel>Select Category</InputLabel>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.categoryError && (
                <Typography variant="caption" color="error">
                  {errors.categoryError}
                </Typography>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          style: {
            width: "600px",
            maxWidth: "90%",
            margin: "auto",
          },
        }}
      >
        <DialogTitle textAlign={"center"} fontWeight={"bold"}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography textAlign={"center"}>
            Are you sure you want to delete this subcategory?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              currentSubCategoryId !== null &&
              handleDelete(currentSubCategoryId)
            }
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
