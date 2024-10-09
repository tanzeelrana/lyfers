import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import { toast } from "react-toastify";
import { handleApiError } from "../../common/Api-error-handler";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/auth/actions";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phoneNumber: string;
  lastOrder: string;
  createdAt: string;
  avatarUrl: string;
}

const MemberPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  const navigate = useNavigate();
  const dispatch =useDispatch();

  // Fetching users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${baseUrl}/auth/members`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        setUsers(response.data);
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
    fetchUsers();
  }, []);

  // Search Filter
  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle opening of dot menu
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    userId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  // Handle closing of dot menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // Open confirmation dialog
  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
    handleMenuClose();
  };

  // Close confirmation dialog
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  // Handle delete member
  const handleDeleteUser = async () => {
    if (selectedUser !== null) {
      try {
        const response = await axios.delete(
          `${baseUrl}/auth/user/${selectedUser}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUser)
        );
        handleCloseConfirmationDialog();
        toast.success(response.data.message);
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
    }
  };

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
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid
            item
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
              Members
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Search and Add New Button */}
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" marginBottom={3}>
          <Grid item display="flex" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "20px" },
                fontWeight: "bold",
              }}
            >
              All Members
            </Typography>
          </Grid>
          <Grid item display="flex" justifyContent="flex-end" gap={2}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          </Grid>
        </Grid>

        {/* Members Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Member Since</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography>No records found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <Avatar src={user.avatarUrl} alt={user.firstName} />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" fontWeight="bold">
                              {user.firstName} {user.lastName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.age ?? 20} Years</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={(e) => handleMenuClick(e, user.id)}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl && selectedUser === user.id)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this member? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default MemberPage;
