import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.js";
import customerRoutes from "./routes/customer.js";
import driverRoutes from "./routes/driver.js";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

app.use(cors());
app.use(express.json());

app.use("/api/customer", customerRoutes);
app.use("/admin", adminRoutes);
app.use("/api/driver", driverRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
