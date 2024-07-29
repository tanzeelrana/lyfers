import * as actionTypes from "./actionTypes";
import * as dataTypes from "./types";

export const login = (data: dataTypes.LoginPayload) => {
  return {
    type: actionTypes.LOGIN,
    payload: data,
  };
};

export const loginSuccess = (data: any) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
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