import { call, put, takeLatest } from "redux-saga/effects";
import { sagaErrorHandler } from "../SagaErrorHandler";
import { loginSuccess, updateProfileSuccess } from "./actions";
import { toast } from "react-toastify";
import { LOGIN, UPDATE_PROFILE } from "./actionTypes";

function* loginRequest({ payload }: any): Generator<any, void, any> {
  const { email, password, setBtnloading, navigate } = payload;
  try {
    const user = {
      username: email,
      password: password,
    };
    yield put(loginSuccess(user));
    setBtnloading(false);
    toast.success("Login successfully");
    navigate("/");
  } catch (error: any) {
    setBtnloading(false);
    yield sagaErrorHandler(error);
  }
}

function* updateProfileRequest({ payload }: any): Generator<any, void, any> {  
  try {
    const result = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      profileImage: payload.profileImage,
      phone: payload.phone,
      address: payload.address,
      nickname: payload.nickname,
      email: payload.email,
    }

    yield put(updateProfileSuccess(result));
    payload.setBtnloading(false);
    toast.success("Profile Updated Successfully");
  } catch (error: any) {
    payload.setBtnloading(false);
    yield sagaErrorHandler(error);
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN, loginRequest);
  yield takeLatest(UPDATE_PROFILE, updateProfileRequest);
}
