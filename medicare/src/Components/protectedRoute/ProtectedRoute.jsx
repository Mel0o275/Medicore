import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../../Store/useAuthStore.js";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  // If user has a token allow access to nested routes, otherwise redirect to signin
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
