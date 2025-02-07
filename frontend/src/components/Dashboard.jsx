import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Dashboard() {
  return (
    <div className="vh-100 bg-dark">
      <Header />
      <Sidebar />
      <Footer />
    </div>
  );
}

export default Dashboard;
