// Dashboard.jsx ================================
import React from "react";
import { ThemeContext } from "../context/ThemeProvider";

// components ===============
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Dashboard() {
  const { theme } = React.useContext(ThemeContext);
  
  return (
    <div className={`vh-100 ${ theme === "dark" ? "bg-dark" : "bg-light"}`}>
      <Header />
      <Sidebar />
      <Footer />
    </div>
  );
}

export default Dashboard;
