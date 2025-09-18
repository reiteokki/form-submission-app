import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/userStore";

interface GuestRouteProps {
  children: JSX.Element;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const email = useAuthStore((state) => state.email);
  const formFilled = useAuthStore((state) => state.formFilled);

  if (email) {
    return <Navigate to={formFilled ? "/dashboard" : "/form"} replace />;
  }

  return children;
}
