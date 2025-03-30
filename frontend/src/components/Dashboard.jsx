import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import { themeContext } from "../context/ThemeProvider";

function Dashboard() {
  const { theme } = React.useContext(themeContext);
  return (
    <div className={`vh-100 ${ theme === "dark" ? "bg-dark" : "bg-light"}`}>
      <Header />
      <Sidebar />
      <Footer />
    </div>
  );
}

export default Dashboard;
