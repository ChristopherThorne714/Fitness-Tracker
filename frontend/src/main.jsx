import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './redux/store';

// Bootstrap CSS & JS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Components imports and pages imports
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import ShowWorkoutDetails from "./pages/ShowWorkoutDetails";
import UpdateWorkout from "./pages/UpdateWorkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

axios.defaults.withCredentials = true;

// Routes
const router = createBrowserRouter([
  { path: "/", element: <NavbarWrapper />, children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login", 
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/show-workout/:title",
      element: <ShowWorkoutDetails />
    },
    {
      path: "/edit-workout/:id",
      element: <UpdateWorkout />
    },
  ]},
]);

function NavbarWrapper(){
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
