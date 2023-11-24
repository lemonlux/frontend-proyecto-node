import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Register,
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  Profile,
  VerifyCode,
} from "../pages/zindex";
import App from "../App";
import { ProtectedNotVerified, ProtectedRefreshPage } from "../components/zindex";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify",
        element: (
           <ProtectedRefreshPage>
            <VerifyCode />
          </ProtectedRefreshPage>
        ),
      },
      {
        path: "/setNewPassword",
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
        // children: [
        //   {
        //     path: "/profile/changePassword",
        //     element: , // changePassword
        //   },
        //   {
        //     path: "/profile/",
        //     element: , //delete
        //   },
        //   {
        //     path: "/profile/",
        //     element: , //update user
        //   },
        // ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
