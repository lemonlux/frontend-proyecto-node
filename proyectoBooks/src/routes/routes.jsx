import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Register,
  CheckCode,
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  Profile,
} from "../pages/zindex";
import App from "../App";
import { ProtectedNotVerified, ProtectedRefreshPage } from "../components/zindex";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/redirectRegister",
        element: <Register />,
      },
      {
        path: "/verify",
        element: (
          <ProtectedRefreshPage>
            <CheckCode />
          </ProtectedRefreshPage>
        ),
      },
      {
        path: "/password/setNewPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: ( 
          <ProtectedNotVerified>
        <Dashboard />
           </ProtectedNotVerified>
        ),
      },
      {
        path: "/profile",
        element: ( 
          <ProtectedNotVerified>
        <Profile />
           </ProtectedNotVerified>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
