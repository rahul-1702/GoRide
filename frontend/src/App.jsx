import { BrowserRouter, Routes, Route } from "react-router-dom";

// components ===============
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import CustomerProfile from "./components/CustomerProfile";
import DriverProfile from "./components/DriverProfile";
import TeamProfile from "./components/TeamProfile";

import ThemeProvider from "./context/ThemeProvider";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/password/forget" element={<ForgotPassword />}></Route>
            <Route
              path="/admin/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route path="/customers/:id" element={<CustomerProfile />} />
            <Route path="/drivers/:id" element={<DriverProfile />} />
            <Route path="/team/:id" element={<TeamProfile />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
