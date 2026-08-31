import { useEffect, useState } from "react";
import Splash from "./pages/Splash";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Otp from "./pages/auth/Otp";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <Splash /> : <Dashboard />;
}

export default App;