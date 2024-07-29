import { FC } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import LoginButtons from "./SSOLogin";
import { LoginFooter } from "./loginComponent";
import "./login.css";

const LoginTitle = styled.h1`
  font-size: 1.5em;
  color: black;
  padding: 10px;
`;

const Login: FC = () => {
  return (
    <Grid container rowSpacing={5} className="main">
      <Grid item xs={12}></Grid>
      <Grid item xs={12} className="titleBar">
        <LoginTitle>Check Drive Admin Portal</LoginTitle>
      </Grid>
      <LoginButtons />
      <LoginFooter />
    </Grid>
  );
};

export default Login;
