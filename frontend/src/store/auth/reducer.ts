import { produce } from "immer";
import * as types from "./actionTypes";

const INITIAL_STATE: any = {
  currentUser: null
};

const AuthReducer = produce((state, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      state.currentUser = action.payload;
      break;
    case types.LOGOUT:
      state.currentUser = null;
      break;
  }
}, INITIAL_STATE);

export default AuthReducer;
