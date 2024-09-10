import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// import { LocalizationProvider } from '@mui/x-date-pickers';

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import { WorkoutsContextProvider } from "./context/WorkoutContext";

import { Provider } from 'react-redux';
import store from './redux/store';

// Bootstrap CSS & JS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Old/Unused Components
// import CreateBook from "./components/CreateBook";
// import ShowBookList from "./components/ShowBookList";
// import ShowBookDetails from "./components/ShowBookDetails";
// import UpdateBookInfo from "./components/UpdateBookInfo";

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
  // { path: "/", element: <ShowBookList /> },
  // { path: "/create-book", element: <CreateBook /> },
  // { path: "/show-book/:id", element: <ShowBookDetails /> },
  // { path: "/edit-book/:id", element: <UpdateBookInfo /> },
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
  // { path: "/login", element: <Login /> },
  // { path: "/signup", element: <Signup /> },
]);

// store.subscribe(() => {
//   const state = store.getState();
//   const user = JSON.parse(localStorage.getItem('user'))
//   console.log(user);
// })

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
    {/* <WorkoutsContextProvider> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* </WorkoutsContextProvider> */}
  </React.StrictMode>,
);
