import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Check if the user is logged in (e.g., token exists in localStorage)
  const isAuthenticated = localStorage.getItem("accessToken") !== null;
  return <Outlet />

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
