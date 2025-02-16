import { BrowserRouter, Routes, Route } from "react-router-dom";

// components ===============
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/password/forget" element={<ForgotPassword />}></Route>
        <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
