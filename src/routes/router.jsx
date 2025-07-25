import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Hotels from "../pages/Hotels";
import Restaurants from "../pages/Restaurants";
import Flights from "../pages/Flights";
import Attractions from "../pages/Attractions";
import Destinations from "../pages/Destinations";
import Users from "../pages/Users";
import Bookings from "../pages/Bookings";
import Reviews from "../pages/Reviews";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import RequireAuth from "../components/RequireAuth";
export const router = createBrowserRouter([
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        exact: true,
        children: [
          { path: "/", element: <Dashboard />, exact: true },
          { path: "/hotels", element: <Hotels /> },
          { path: "/restaurants", element: <Restaurants /> },
          { path: "/flights", element: <Flights /> },
          { path: "/attractions", element: <Attractions /> },
          { path: "/destinations", element: <Destinations /> },
          { path: "/users", element: <Users /> },
          { path: "/bookings", element: <Bookings /> },
          { path: "/reviews", element: <Reviews /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
  { path: "/login", element: <Login /> },
]);
