import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import {
  LuLayoutDashboard,
  LuPlane,
  LuMapPin,
  LuUser,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";
import { FaBed } from "react-icons/fa";
import { IoRestaurantSharp } from "react-icons/io5";
import { MdOutlineTravelExplore, MdOutlineRateReview } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
const Index = ({ onItemClick }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: LuLayoutDashboard, route: "/" },
    { name: "Hotels", icon: FaBed, route: "/hotels" },
    { name: "Restaurants", icon: IoRestaurantSharp, route: "/restaurants" },
    { name: "Flights", icon: LuPlane, route: "/flights" },
    { name: "Trips", icon: MdOutlineTravelExplore, route: "/trips" },
    { name: "Destinations", icon: LuMapPin, route: "/destinations" },
    { name: "Users", icon: LuUser, route: "/users" },
    { name: "Bookings", icon: FaMoneyCheckDollar, route: "/bookings" },
    { name: "Reviews", icon: MdOutlineRateReview, route: "/reviews" },
    { name: "Settings", icon: LuSettings, route: "/settings" },
    { name: "Logout", icon: LuLogOut, route: "/logout" },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.name);
    navigate(item.route);
    if (onItemClick) {
      console.log("Sidebar closed");
      onItemClick();
    }
  };

  return (
    <div className="sidebar min-vh-100 px-3 py-3 border-top border-3 border-light">
      <ul className="sidebar-menu list-unstyled bg-transparent">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <li
              key={index}
              className={`sidebar-item d-flex align-items-center mb-2 p-2 py-0 ps-0 rounded-pill ${
                isActive ? "bg-dark text-white" : "hover-bg-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleItemClick(item)}
            >
              <div
                className={`sidebar-icon d-flex align-items-center justify-content-center rounded-circle me-2   ${
                  isActive ? "active-icon-bg" : "bg-light"
                }`}
                style={{ width: "36px", height: "36px" }}
              >
                <Icon size={20} color={isActive ? "#33E0A1" : "#000"} />
              </div>

              <p className="m-0 fw-medium bg-transparent">{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Index;
