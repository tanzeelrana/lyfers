import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  Modal,
  Button,
} from "@mui/material";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoreHoriz } from "@mui/icons-material";
import { toast } from "react-toastify";
import { handleApiError } from "../../common/Api-error-handler";
import { logout } from "../../../store/auth/actions";
dayjs.extend(relativeTime);

interface Post {
  id: string;
  title: string;
  description: string;
  userId: number;
  image: string;
  createdAt: string;
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPostId, setSelectedPostId] = useState<
    string | null
  >(null);
  const dispatch = useDispatch();

  // Confirmation modal states
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/posts`);
      setPosts(response.data);
      setLoading(false);
      setFilteredPosts(response.data);
    } catch (error) {
      setLoading(false);
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo == "login") {
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) => {
      const fullName =
        `${post.user.firstName} ${post.user.lastName}`.toLowerCase();
      const titleMatch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = post.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const nameMatch = fullName.includes(searchQuery.toLowerCase());
      return titleMatch || descriptionMatch || nameMatch;
    });
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      toast.success(response.data.message);
      fetchPosts();
    } catch (error) {
      const { message, navigateTo } = handleApiError(error);
      toast.error(message);
      if (navigateTo) {
        if (navigateTo == "login") {
          dispatch(logout());
        }
        navigate(`/${navigateTo}`);
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedPostId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedPostId(null);
  };

  const handlePostClick = (postId: string) => {
    navigate(`/admin/posts/${postId}`);
  };

  const handleOpenConfirmModal = (postId: string) => {
    setPostToDelete(postId);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setPostToDelete(null);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      handleDelete(postToDelete);
      handleCloseConfirmModal();
    }
  };

  const navigate = useNavigate();

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
              Community Posts
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
              Community Posts
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

        <Grid container spacing={4}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <Card
                  sx={{ display: "flex", padding: 2, alignItems: "flex-start" }}
                >
                  <Box sx={{ marginRight: 2 }}>
                    <Avatar
                      src={
                        post.image || "https://example.com/default-avatar.png"
                      }
                      alt={post.user.firstName || post.user.email}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Box>
                  <Box
                    sx={{ flex: 1 }}
                    onClick={() => handlePostClick(post.id)}
                  >
                    <Typography variant="h6">
                      {post.user.firstName || "John"}{" "}
                      {post.user.lastName || "Doe"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.title}
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems="center"
                      sx={{ marginTop: 1 }}
                    >
                      <Typography variant="body1" sx={{ flex: 1 }}>
                        {post.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="textSecondary"
                      sx={{ marginRight: 1 }}
                    >
                      {dayjs(post.createdAt).fromNow()}
                    </Typography>
                    <IconButton onClick={(e) => handleMenuOpen(e, post.id)}>
                      <MoreHoriz />
                    </IconButton>

                    {/* Menu for Edit/Delete */}
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={
                        Boolean(menuAnchorEl) &&
                        selectedPostId === post.id
                      }
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleOpenConfirmModal(post.id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center">
                No Posts Found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Confirmation Modal */}
      <Modal open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this post?
          </Typography>
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button
              onClick={handleCloseConfirmModal}
              color="primary"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Posts;
