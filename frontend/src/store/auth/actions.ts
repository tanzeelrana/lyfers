import * as actionTypes from "./actionTypes";
import * as dataTypes from "./types";

export const login = (data: dataTypes.LoginPayload) => {
  return {
    type: actionTypes.LOGIN,
    payload: data,
  };
};

export const register = (data: dataTypes.RegisterPayload) => {
  return {
    type: actionTypes.SIGNUP,
    payload: data,
  };
};
export const forgotpassord = (data: dataTypes.ForgotPasswordPayload) => {
  return {
    type: actionTypes.FORGOTPASSWORD,
    payload: data,
  };
};

export const loginSuccess = (data: any) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  };
};

export const registerSuccess = (data: any) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: data,
  };
};

export const forgotPassordSuccess = (data: any) => {
  return {
    type: actionTypes.FORGOTPASSWORD_SUCCESS,
    payload: data,
  };
};


export const changePath = (data: string) => {
  return {
    type: actionTypes.CHANGE_PATH,
    payload: data,
  };
};

export const updateProfile = (data: dataTypes.ProfilePayload) => {
  return {
    type: actionTypes.UPDATE_PROFILE,
    payload: data,
  };
};

export const updateProfileSuccess = (data: dataTypes.ProfileSuccessPayload) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const logoutSuccess = (data: any) => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload: data,
  };
};