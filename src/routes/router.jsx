import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Hotels from "../pages/Hotels";
import Restaurants from "../pages/Restaurants";
import Flights from "../pages/Flights";
import Trips from "../pages/Trips";
import Destinations from "../pages/Destinations";
import Users from "../pages/Users";
import Bookings from "../pages/Bookings";
import Reviews from "../pages/Reviews";
import Settings from "../pages/Settings";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
{
    path: "/",
    element: <MainLayout />,
    children: [
    { path: "/", element: <Dashboard /> },
    { path: "/hotels", element: <Hotels /> },
    { path: "/restaurants", element: <Restaurants /> },
    { path: "/flights", element: <Flights /> },
    { path: "/trips", element: <Trips /> },
    { path: "/destinations", element: <Destinations /> },
    { path: "/users", element: <Users /> },
    { path: "/bookings", element: <Bookings /> },
    { path: "/reviews", element: <Reviews /> },
    { path: "/settings", element: <Settings /> },
    { path: "/logout", element: <Logout /> },
    ],
},
{ path: "*", element: <NotFound /> },
]);
