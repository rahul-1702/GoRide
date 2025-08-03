import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

// components ===============
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
