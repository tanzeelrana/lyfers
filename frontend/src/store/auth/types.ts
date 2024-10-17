import { NavigateFunction } from "react-router-dom";

export interface LoginPayload {
  email: string;
  password: string;
  setBtnloading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

export interface RegisterPayload {
  fname:string;
  lname:string;
  email: string;
  password: string;
  Cpassword: string;
  security_question_id:string;
  security_answer:string;
  referalUserId:string | undefined;
  setBtnloading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}
export interface ForgotPasswordPayload {
  email: string;
  password: string;
  security_question_id:string;
  security_answer:string;
  setBtnloading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

export interface ProfilePayload {
  profileImage: any;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  email: string;
  address: string;
  setBtnloading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProfileSuccessPayload {
  profileImage: any;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  email: string;
  address: string;
}

export interface LogoutPayload {
  setBtnloading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}