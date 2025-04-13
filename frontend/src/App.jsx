import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./context/ThemeProvider";
import AuthProvider from "./context/AuthProvider";
import Cookies from "js-cookie";
import "./static/css/App.css"

// components ===============
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import CustomerProfile from "./components/CustomerProfile";
import DriverProfile from "./components/DriverProfile";
import TeamProfile from "./components/TeamProfile";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    const isLogin = Cookies.get("islogin") === "1";

    if (isLogin) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={loginState ? <Dashboard /> : <Login />}
            ></Route>
            <Route path="/signup" element={<Signup />}></Route>
            {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
            <Route path="/password/forget" element={<ForgotPassword />}></Route>
            <Route
              path="/admin/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route path="/customers/:id" element={<CustomerProfile />} />
            <Route path="/drivers/:id" element={<DriverProfile />} />
            <Route path="/team/:id" element={<TeamProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
