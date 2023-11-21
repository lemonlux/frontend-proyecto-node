import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register, CheckCode, Dashboard, ForgotPassword, Home, Login, NotFound, Profile } from "../pages/Register";
import App from "../App";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            
            {
                path: '/redirectRegister',
                element: <Register/>
            },
            {
                path: '/verify',
                element: <CheckCode/>
            },
            {
                path: '/password/setNewPassword',
                element: <ForgotPassword/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/profile',
                element: <Profile/>
            },
            {
                path: '*',
                element: <Dashboard/>
            },
        ]
    }
])