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
  AccountSettings,
  EditProfile,
  BookForm,
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
        path: "/books",
        element:
        <BookForm />,
      },
      {
        path: "/profile",
        element: ( 
          <ProtectedNotVerified>
        <Profile />
           </ProtectedNotVerified>
        ),
        children: [
          {
            path: "/profile/settings",
            element: <AccountSettings/> , // changePassword
          },
          {
            path: "/profile/edit",
            element: <EditProfile /> , //update user
          },
          // {
          //   path: "/profile/favourites",
          //   element: <Myfavourites /> , //update user
          // },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
