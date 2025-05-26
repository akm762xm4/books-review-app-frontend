import { Navigate } from "react-router-dom";
import { getAuthUser } from "../app/useAuthState";
interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const authUser = getAuthUser();

  if (!authUser || !authUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
