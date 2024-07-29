import {
  Grid,
  Typography,
  Container,
  Box,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Fab,
} from "@mui/material";
import { styled } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import BreadCrumbs from "../../components/BreadCrumbs";
import "./styles.scss";

const Chat = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <BreadCrumbs title="Chat" />
        </Grid>
      </Grid>
      <Box className="chatSection">
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            sx={{
              borderBottom: { xs: "1px solid #eee" },
              borderRight: "1px solid #e0e0e0",
            }}
          >
            <List>
              <ListItem button key="RemySharp">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://mui.com/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary="John Wick" />
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List className="conversationsSection">
              <ListItem button key="RemySharp">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://mui.com/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary="Remy Sharp" secondary="online" />
              </ListItem>
              <ListItem button key="Alice">
                <ListItemAvatar>
                  <Avatar
                    alt="Alice"
                    src="https://mui.com/static/images/avatar/3.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary="Alice" />
              </ListItem>
              <ListItem button key="CindyBaker">
                <ListItemAvatar>
                  <Avatar
                    alt="Cindy Baker"
                    src="https://mui.com/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary="Cindy Baker" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            <Box className="messageArea">
              <ListItem key="1" sx={{ textAlign: "right" }}>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={10} sm={8}>
                    <ListItemText primary="Hey man, What's up ?" />
                    <ListItemText secondary="10:30" />
                  </Grid>
                  <Grid item xs={2} sm={1}>
                    <Avatar
                      sx={{ m: "auto" }}
                      alt="Cindy Baker"
                      src="https://mui.com/static/images/avatar/2.jpg"
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="2">
                <Grid container justifyContent="flex-start">
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Avatar
                          alt="Cindy Baker"
                          src="https://mui.com/static/images/avatar/1.jpg"
                        />
                      </Grid>
                      <Grid item>
                        <ListItemText primary="Hey, I am Good! What about you ?" />
                        <Typography variant="caption" color="textSecondary">
                          09:31
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="3" sx={{ textAlign: "right" }}>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={10} sm={8}>
                    <ListItemText primary="Hey man, What's up ?" />
                    <ListItemText secondary="10:30" />
                  </Grid>
                  <Grid item xs={2} sm={1}>
                    <Avatar
                      sx={{ m: "auto" }}
                      alt="Cindy Baker"
                      src="https://mui.com/static/images/avatar/2.jpg"
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </Box>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={9} sm={10} md={10} lg={11} xl={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                />
              </Grid>
              <Grid xs={3} sm={2} md={2} lg={1} xl={1} textAlign="right">
                <Fab color="primary" aria-label="add" className="">
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Chat;
