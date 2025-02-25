import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.js";
import customerRoutes from "./routes/customer.js";
import driverRoutes from "./routes/driver.js";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 5000; 
const backendUrl = process.env.FREE_BACKEND_URL;

app.use(cors());
app.use(express.json());

app.use("/api/customer", customerRoutes);
app.use("/admin", adminRoutes);
app.use("/api/driver", driverRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${backendUrl}`);
});
