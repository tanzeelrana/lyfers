import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import baseUrl from "../../../config/apiConfig";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { handleApiError } from "../../common/Api-error-handler";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/auth/actions";

interface Comment {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
}

interface PostImage {
  url: string;
}

interface PostDetail {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  PostImages: PostImage[];
  Comments: Comment[];
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
}

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>(); // Get post ID from URL
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // Modal state
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null); // Comment ID to delete
  const currentUser = useSelector((state: any) => state?.Auth?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`${baseUrl}/posts/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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

    fetchPostDetail();
  }, [postId]);

  // Function to handle comment deletion
  const deleteComment = async (commentId: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      toast.success(response.data.message);
      setPost((prevPost) => ({
        ...prevPost!,
        Comments: prevPost!.Comments.filter(
          (comment) => comment.id !== commentId
        ),
      }));
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

  const handleDeleteClick = (commentId: number) => {
    setCommentToDelete(commentId);
    setOpen(true); // Open the confirmation modal
  };

  const handleClose = () => {
    setOpen(false);
    setCommentToDelete(null); // Reset comment ID
  };

  const handleConfirmDelete = () => {
    if (commentToDelete !== null) {
      deleteComment(commentToDelete);
    }
    handleClose(); // Close the modal after deletion
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

  if (!post) {
    return null;
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
              LYFERS Post
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Search and Add New Button */}
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" marginBottom={3}>
          <Grid item alignItems="center">
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "20px" },
                fontWeight: "bold",
              }}
            >
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Posted by {post.user.firstName || "John"}{" "}
              {post.user.lastName || "Doe"} -{" "}
              {dayjs(post.createdAt).format("MMMM DD, YYYY")}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Box padding={4}>
          <Grid container spacing={4}>
  {/* Description and 1st image */}
  <Grid item xs={12} md={12}>
    <Typography variant="body1" gutterBottom>
      {post.description}
    </Typography>
  </Grid>
  <Grid item xs={12} md={12}>
    {/* Display first image */}
    {post.PostImages.length > 0 && (
      <img
        src={post.PostImages[0].url}
        alt="Post"
        style={{ maxWidth: "100%", marginBottom: 16 ,height:'auto' }}
      />
    )}
  </Grid>

  {/* Remaining images */}
  {post.PostImages.length > 1 && (
    <Grid item xs={12}>
      <Box mt={4} display="flex" flexWrap="wrap" gap={2}>
        {post.PostImages.slice(1).map((image, index) => (

          <img
            key={index}
            src={image.url}
            alt="Post"
            style={{ maxWidth: "200px", marginBottom: 16 }}
          />
        ))}
      </Box>
    </Grid>
  )}
</Grid>


            {/* Comments Section */}
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                Comments
              </Typography>
              {post.Comments.length > 0 ? (
                post.Comments.map((comment) => (
                  <Paper
                    key={comment.id}
                    elevation={1}
                    sx={{ padding: 2, marginBottom: 2 }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ marginRight: 2 }}></Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">
                          {comment.user?.firstName || "John"}{" "}
                          {comment.user?.lastName || "Doe"}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {dayjs(comment.createdAt).format("MMMM DD, YYYY")}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {comment.content}
                        </Typography>
                        
                      </Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(comment.id)} // Open confirmation modal
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  </Paper>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No comments yet.
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PostDetail;
