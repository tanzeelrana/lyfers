import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePath } from "../store/auth/actions";

export function PublicRoute({ children }: any) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.Auth.currentUser);
  
  if (currentUser) {
    return children;
    // dispatch(changePath("/dashboard"))
    // return <Navigate to={"/dashboard"} replace />;
  } else {
    return children;
  }
}
