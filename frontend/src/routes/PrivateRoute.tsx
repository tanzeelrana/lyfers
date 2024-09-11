import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePath } from "../store/auth/actions";
import { register } from "module";
import { toast } from "react-toastify";

export function PrivateRoute({ children }: any) {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state?.Auth);

  if (!auth.currentUser) {
    return children;
  } else {
    if(window.location.pathname === ('/login' ||'/register' || '/forgotPassword')){
      toast.success('Already logged');
     return <Navigate to={"/"} replace />;
    }
    if ((auth.selectedPath !== window.location.pathname)) {
      dispatch(changePath(window.location.pathname))
    }
    return children;
  }
}
