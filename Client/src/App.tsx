import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Splash from "./pages/Splash";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Otp from "./pages/auth/Otp";
import Dashboard from "./pages/dashboard/Dashboard";
import TransferPage from "./pages/Transfer/TransferPage";
import SendMoney from "./pages/Transfer/SendMoney";

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/send" element={<SendMoney />} />

        <Route path="/" element={<Navigate to="/signup" replace />} />

        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
