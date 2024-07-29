import { NavigateFunction } from "react-router-dom";

export interface LoginPayload {
  email: string;
  password: string;
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
