import { Navigate } from "react-router-dom";
import { getAuthUser } from "../app/useAuthState";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authUser = getAuthUser();

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
