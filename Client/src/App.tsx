import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Splash from "./pages/Splash";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Otp from "./pages/auth/Otp";
import LoginOtp from "./pages/auth/loginOtp";
import Dashboard from "./pages/dashboard/Dashboard";
import TransferPage from "./pages/Transfer/TransferPage";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import PublicRoute from "./components/protectroute/PublicRoute";
import ProtectedRoute from "./components/protectroute/ProtectedRoute";

function HomeRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Checking your session...</div>;
  }
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}
function AppRoutes() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <Routes>
      {/* Public Authentication pages */}
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/otp" element={<Otp />} />
      <Route path="/otp-login" element={<LoginOtp />} />
      {/* Protected pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferPage />} />
      </Route>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
