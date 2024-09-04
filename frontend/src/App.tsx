import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/allRoutes";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import Layout from "./components/Layout";
import FrontLayout from "./pages/common/Layout"

const App = () => {
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
                    !route.isAuth ?
                    <PrivateRoute>
                      <FrontLayout>
                        <Layout>{route.component}</Layout>
                      </FrontLayout>
                    </PrivateRoute> : route.component
                  ) : (
                    <PublicRoute>
                      <FrontLayout>
                      {route.component}
                      </FrontLayout>
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
