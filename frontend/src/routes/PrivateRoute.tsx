import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePath } from "../store/auth/actions";

export function PrivateRoute({ children }: any) {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state?.Auth);

  if (!auth.currentUser) {
    return <Navigate to={"/"} replace />;
  } else {
    // && ["/myGarage", "/availableListing", "/services", "/chat", "/testDrives", "/offers"].includes(window.location.pathname)
    if ((auth.selectedPath !== window.location.pathname)) {
      dispatch(changePath(window.location.pathname))
    }
    return children;
  }
}
