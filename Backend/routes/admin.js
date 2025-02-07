import express from "express";
import {
  getAllAdmins,
  loginAdmin,
  signupAdmin,
} from "../controller/Admin.js";

import { signupValidation } from "../Validation/vAdminSignup.js";
import { loginValidation } from "../Validation/vAdminLogin.js";

const router = express.Router();

router.get("/show", getAllAdmins);
router.post("/login", loginValidation, loginAdmin);
router.post("/signup", signupValidation, signupAdmin);

export default router;
