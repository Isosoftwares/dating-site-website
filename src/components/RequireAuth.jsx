import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const checkUserLoggedIn = (data) => {
    if (!data?.userId) return "/login";
    if (data?.roles?.includes("Client")) return "/client";
    if (data?.roles?.includes("Admin")) return "/dashboard";
    return "/login";
  };

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to={checkUserLoggedIn(auth)} state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
