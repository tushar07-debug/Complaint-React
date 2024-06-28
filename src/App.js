import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import ComplaintLogger from "./components/ComplaintLogger";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/complaint-logger",
    element: <ComplaintLogger />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/",
    index: true, 
    element: <Login />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      {/* You can add a layout component or other elements here */}
    </RouterProvider>
  );
}

export default App;