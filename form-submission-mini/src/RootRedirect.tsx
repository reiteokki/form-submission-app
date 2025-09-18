import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/userStore";
import Home from "./pages/Home";

export default function RootRedirect() {
  const email = useAuthStore((state) => state.email);
  const formFilled = useAuthStore((state) => state.formFilled);

  if (email) {
    return <Navigate to={formFilled ? "/dashboard" : "/form"} replace />;
  }

  return <Home />;
}
