import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../../Store/useAuthStore.js";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  // If token is directly present allow access
  if (token) return <Outlet />;

  //  state.user.data.token
  if (user && user.data && user.data.token) return <Outlet />;

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
