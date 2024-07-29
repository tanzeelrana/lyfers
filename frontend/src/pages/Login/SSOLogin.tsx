import Parse from "parse";
import { FC } from "react";
import styled from "styled-components";
// import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { appleSignIn } from "../../utils/firebase";
import { loginSuccess } from "../../store/auth/actions";
import "./login.css";

const FacebookLoginButton = styled.div`
  padding: 10px;
`;
const GoogleLogInButton = styled.div`
  padding: 10px;
`;
const AppleLogInButton = styled.div`
  padding: 10px;
`;

const LoginButtons: FC = () => {
  const dispatch = useDispatch();

  const loginFunc = async (loginData: any) => {
    const token = await Parse.Cloud.run("SSOlogin", loginData);
    const user = await Parse.User.become(token);
    dispatch(loginSuccess(user.toJSON()));
  };

  const splitName = (name: string) => {
    const nameParts = name?.split(" ");
    let firstName;
    let lastName;
    if (nameParts) {
      firstName = nameParts[0] || "";
      lastName = nameParts?.slice(1)?.join(" ");
    }
    return {
      firstName,
      lastName: lastName || firstName,
    };
  };

  const responseGoogle = (response: any) => {
    console.log("response -->>", response);
    if (response?.profileObj?.email) {
      let loginPayload: any = {
        email: response?.profileObj?.email,
        firstName: splitName(response?.profileObj?.name)?.firstName,
        lastName: splitName(response?.profileObj?.name)?.lastName,
        profileImage: response?.profileObj?.imageUrl,
        phoneNumber: null,
        userId: response?.profileObj?.googleId,
        userType: "admin",
        loginType: "google",
      };
      console.log("loginPayload", loginPayload);
      // loginFunc(loginPayload);
    }
  };

  const responseFacebook = (response: any) => {
    if (response?.email) {
      let loginPayload: any = {
        email: response.email,
        firstName: splitName(response?.name)?.firstName,
        lastName: splitName(response?.name)?.lastName,
        profileImage: response?.picture?.data?.url ?? "",
        phoneNumber: null,
        userId: response.userID,
        userType: "admin",
        loginType: "facebook",
      };
      loginFunc(loginPayload);
    }
  };

  const responseApple = async () => {
    const user = await appleSignIn();
    if (user?.email) {
      const loginPayload: any = {
        email: user.email,
        firstName: splitName(user?.profileObj.name).firstName,
        lastName: splitName(user?.profileObj.name).lastName,
        profileImage: user.photoURL,
        phoneNumber: user.phoneNumber,
        userId: user.uid,
        userType: "admin",
        loginType: "apple",
      };
      loginFunc(loginPayload);
    }
  };

  return (
    <>
      <Grid container className="main">
        {/* <Grid item xs={12}>
          <GoogleLogInButton>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
              render={(renderProps: any) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="google_login_button"
                >
                  <span className="googleIcon"></span>
                  <span> Sign in with Google</span>
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </GoogleLogInButton>
        </Grid>
        <Grid item xs={12}>
          <FacebookLoginButton>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID as string}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps: any) => (
                <button
                  onClick={renderProps.onClick}
                  className="facebook_login_button"
                >
                  <span className="facebookIcon"></span>
                  Sign in with Facebook
                </button>
              )}
            />
          </FacebookLoginButton>
        </Grid>
        <Grid item xs={12}>
          <AppleLogInButton>
            <button onClick={responseApple} className="apple_login_button">
              <span className="appleIcon"></span>
              Sign in with Apple
            </button>
          </AppleLogInButton>
        </Grid> */}
      </Grid>
    </>
  );
};

export default LoginButtons;
