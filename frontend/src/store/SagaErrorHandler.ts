import Parse from "parse";
import { put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { logout } from "./auth/actions";

interface errorProps {
  code?: number;
  message: string;
}

export function* sagaErrorHandler(error: errorProps) {
  if (error.code === Parse.Error.INVALID_SESSION_TOKEN) {
    toast.error(error.message);
    yield put(logout());
  } else toast.error(error.message);
}
