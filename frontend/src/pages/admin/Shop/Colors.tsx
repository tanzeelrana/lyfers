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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import { toast } from "react-toastify";

interface Color {
  id: number;
  name: string;
  code: string;
}

export default function Colors() {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newColorName, setNewColorName] = useState<string>("");
  const [newColorCode, setNewColorCode] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentColorId, setCurrentColorId] = useState<number | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    nameError?: string;
    codeError?: string;
  }>({});

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get<Color[]>(`${baseUrl}/colors`);
        setColors(response.data);
      } catch (error) {
        setError("Error fetching colors");
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  const handleOpenEditModal = (color: Color) => {
    setCurrentColorId(color.id);
    setNewColorName(color.name);
    setNewColorCode(color.code);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setNewColorName("");
    setNewColorCode("");
    setCurrentColorId(null);
  };

  const handleError = (message: string) => {
    toast.error(message);
  };
  const validateForm = () => {
    const newErrors: { nameError?: string; codeError?: string } = {};

    if (!newColorName.trim()) {
      newErrors.nameError = " Name is required.";
    }
    if (!newColorCode) {
      newErrors.codeError = "Color code is requied.";
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
      const colorData = { name: newColorName, code: newColorCode };

      if (editMode && currentColorId !== null) {
        // Update existing color
       const response = await axios.put(`${baseUrl}/colors/${currentColorId}`, colorData);
       toast.success( response.data.message);
      } else {
        // Create new color
      const response = await axios.post(`${baseUrl}/colors`, colorData);
      toast.success( response.data.message);

      }

      handleCloseModal();

      // Refetch colors after creating or updating
      const response = await axios.get<Color[]>(`${baseUrl}/colors`);
      setColors(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const messages = error.response.data.errors
          .map((err: any) => err.msg)
          .join(", ");
        handleError(messages || "Validation error");
      } else {
        handleError(editMode ? "Error updating color" : "Error creating color");
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/colors/${id}`);
      setColors((prev) => prev.filter((color) => color.id !== id));
      setDeleteConfirmOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const messages = error.response.data.errors
          .map((err: any) => err.msg)
          .join(", ");
        handleError(messages || "Validation error");
      } else {
        handleError("Error deleting color");
      }
    }
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    );
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
              All Colors
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} display="flex" alignItems="center">
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
              All colors
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
              Add New Color
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  Code
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {colors
                .filter((color) =>
                  color.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((color) => (
                  <TableRow key={color.id}>
                    <TableCell>{color.id}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {color.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {color.code}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button onClick={() => handleOpenEditModal(color)}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          setCurrentColorId(color.id);
                          setDeleteConfirmOpen(true);
                        }}
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {colors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography textAlign="center">No Colors Found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
          {editMode ? "Edit Color" : "Add New Color"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Color Name"
            type="text"
            margin="dense"
            fullWidth
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value)}
            error={!!errors.nameError}
            helperText={errors.nameError}
          />
          <TextField
            label="Color Code"
            type="text"
            margin="dense"
            fullWidth
            value={newColorCode}
            onChange={(e) => setNewColorCode(e.target.value)}
            error={!!errors.nameError}
            helperText={errors.nameError}
          />
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
            Are you sure you want to delete this color?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              currentColorId !== null && handleDelete(currentColorId)
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
