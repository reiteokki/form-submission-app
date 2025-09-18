import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/userStore";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const email = useAuthStore((state) => state.email);
  const formFilled = useAuthStore((state) => state.formFilled);

  if (!email) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!formFilled && location.pathname !== "/form") {
    return <Navigate to="/form" replace />;
  }

  return children;
}
