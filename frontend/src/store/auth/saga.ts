import { call, put, takeLatest } from "redux-saga/effects";
import { sagaErrorHandler } from "../SagaErrorHandler";
import { forgotPassordSuccess, loginSuccess, registerSuccess, updateProfileSuccess } from "./actions";
import { toast } from "react-toastify";
import { LOGIN, UPDATE_PROFILE,SIGNUP, FORGOTPASSWORD} from "./actionTypes";
import axios from "axios";
import { REGISTER } from "redux-persist";

function* loginRequest({ payload }: any): Generator<any, void, any> {
  const { email, password, setBtnloading, navigate } = payload;
  try {
    const user = {
      email,
      password,
    };
    const response = yield call(
      axios.post,
      'http://localhost:3003/auth/login',
      user
    );

    if (response.data.success) {
      yield put(loginSuccess(response.data));
      setBtnloading(false);
      toast.success('Login successfully');
      navigate('/');
    } else {
      setBtnloading(false);
      toast.error(response.data.message);
    }
  } catch (error: any) {
    setBtnloading(false);
    if (error.response) {
      // Errors from the server with a response
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach((err: { msg: string }) => {
          toast.error(err.msg);
        });
      } else {
        yield sagaErrorHandler(error.response.data.message || 'Registration failed');
      }
    } else {
      // Network or unexpected errors
      toast.error('An unexpected error occurred');
    }    
    yield sagaErrorHandler(error);
  }
}

function* registerRequest({ payload }: any): Generator<any, void, any> {
  const { fname, lname, email, password, Cpassword, security_question_id, security_answer, setBtnloading, navigate } = payload;

  try {
    const user = {
      fname, lname, email, password, Cpassword, security_question_id, security_answer,
    };

    const response = yield call(
      axios.post,
      'http://localhost:3003/auth/signup',
      user
    );

    if (response.data.success) {
      yield put(registerSuccess(response.data));
      setBtnloading(false);
      toast.success('Registered successfully');
      navigate('/');
    } else {
      setBtnloading(false);
        toast.error(response.data.message || 'Registration failed');
    }
  } catch (error: any) {
    setBtnloading(false);
    if (error.response) {
      // Errors from the server with a response
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach((err: { msg: string }) => {
          toast.error(err.msg);
        });
      } else {
        yield sagaErrorHandler(error.response.data.message || 'Registration failed');
      }
    } else {
      // Network or unexpected errors
      toast.error('An unexpected error occurred');
    }    
    yield sagaErrorHandler(error);
  }
}

function* forgotPassword({ payload }: any): Generator<any, void, any> {
  const { email, password,security_question_id, security_answer, setBtnloading, navigate } = payload;
  try {
    const user = {
      email,
      password,
      security_question_id,
      security_answer,
    };
    const response = yield call(
      axios.post,
      'http://localhost:3003/auth/forgot-password',
      user
    );

    if (response.data.success) {
      yield put(forgotPassordSuccess(response.data));
      setBtnloading(false);
      toast.success('Password changed successfully');
      navigate('/');
    } else {
      setBtnloading(false);
      toast.error(response.data.message);
    }
  } catch (error: any) {
    setBtnloading(false);
    if (error.response) {
      // Errors from the server with a response
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach((err: { msg: string }) => {
          toast.error(err.msg);
        });
      } else {
        yield sagaErrorHandler(error.response.data.message || 'failed');
      }
    } else {
      // Network or unexpected errors
      toast.error('An unexpected error occurred');
    }    
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
  yield takeLatest(SIGNUP, registerRequest);
  yield takeLatest(FORGOTPASSWORD, forgotPassword);
  yield takeLatest(UPDATE_PROFILE, updateProfileRequest);
}
