import { combineReducers } from "redux";
import Auth from "./auth/reducer";

const rootReducer = combineReducers({
  Auth: Auth,
});

export type AuthState = ReturnType<typeof rootReducer>;

export default rootReducer;
