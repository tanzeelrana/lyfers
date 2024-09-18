import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/allRoutes";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import Layout from "./components/Layout";
import FrontLayout from "./pages/common/Layout";
import { useSelector } from "react-redux";
import AdminLayout from "./components/admin/AdminLayout";
import jwtDecode from 'jwt-decode';

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

const App = () => {
  const auth = useSelector((state: any) => state?.Auth);

  const getUserDetailsFromToken = (token: string): UserPayload | null => {
    try {
      const decodedToken: UserPayload = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  let userDetails: UserPayload | null = null;

  const token = auth.currentUser?.token;
  if (token) {
    userDetails = getUserDetailsFromToken(token);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route, i) => {
            return (
              <Route
                key={i}
                path={route.path}
                element={
                  !route.ispublic ? (
                    !route.isAuth ? (
                      <PrivateRoute>
                        <FrontLayout>
                          {userDetails?.role === "admin" ? (
                            <AdminLayout>{route.component}</AdminLayout>
                          ) : (
                            <Layout>{route.component}</Layout>
                          )}
                        </FrontLayout>
                      </PrivateRoute>
                    ) : (
                      <PrivateRoute>{ route.component}</PrivateRoute>
                    )
                  ) : (
                    <PublicRoute>
                      <FrontLayout>{route.component}</FrontLayout>
                    </PublicRoute>
                  )
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
