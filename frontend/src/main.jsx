import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from './App.jsx'
import './index.css';


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
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Routes
const router = createBrowserRouter([
  // { path: "/", element: <ShowBookList /> },
  // { path: "/create-book", element: <CreateBook /> },
  // { path: "/show-book/:id", element: <ShowBookDetails /> },
  // { path: "/edit-book/:id", element: <UpdateBookInfo /> },
  { path: "/", element: <Home />},
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
