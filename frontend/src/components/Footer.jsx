import React from "react";

const Footer = () => {
  return (
    <footer className="mt-3 bg-dark text-white d-flex justify-content-between align-items-center px-4" style={{ height: "60px" }}>
      <span className="text-secondary">&copy; {new Date().getFullYear()} GoRide | All rights reserved.</span>

      <div>
        <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
        <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
        <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
        <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
      </div>
    </footer>
  );
};

export default Footer;
