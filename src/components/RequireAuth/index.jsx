import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = () => {
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const token = Cookies.get("admin_token");

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
