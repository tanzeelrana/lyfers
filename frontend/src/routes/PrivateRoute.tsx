import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePath } from "../store/auth/actions";
import { register } from "module";
import { toast } from "react-toastify";

export function PrivateRoute({ children }: any) {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state?.Auth);

  if (!auth.currentUser) {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/forgotPassword' ||
      /^\/register(\/\d+)?$/.test(window.location.pathname)
    ) {
      return children;
    }else{
    return <Navigate to={"/login"} replace />;
    }
  } else {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/forgotPassword' ||
      /^\/register(\/\d+)?$/.test(window.location.pathname)
    ) {
      return <Navigate to={"/"} replace />;
    }
    if ((auth.selectedPath !== window.location.pathname)) {
      dispatch(changePath(window.location.pathname))
    }
    return children;
  }
}
