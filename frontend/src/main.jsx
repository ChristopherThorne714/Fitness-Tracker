import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { DateContextProvider } from './context/DateContext';


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
      path: "/show-workout/:id",
      element: <ShowWorkoutDetails />
    },
    {
      path: "/edit-workout/:id",
      element: <UpdateWorkout />
    },
  ]},
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <WorkoutsContextProvider>
        <DateContextProvider>
          <RouterProvider router={router} />
        </DateContextProvider>
      </WorkoutsContextProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);
