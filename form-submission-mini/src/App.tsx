import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import HydrationGuard from "./HydrationGuard";
import RootRedirect from "./RootRedirect";

function App() {
  return (
    <HydrationGuard>
      <Router>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/create-account"
            element={
              <GuestRoute>
                <CreateAccount />
              </GuestRoute>
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </HydrationGuard>
  );
}

export default App;
