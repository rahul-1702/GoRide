import express from "express";
import {
  adminForgotPassword,
  adminResetPassword,
  getAllAdmins,
  loginAdmin,
  signupAdmin,
} from "../controller/Admin.js";

import { verifyToken } from "../middleware/token_auth.js";

import { signupValidation } from "../Validation/vAdminSignup.js";
import { loginValidation } from "../Validation/vAdminLogin.js";
import { forgotValidation } from "../Validation/vAdminForgot.js";
import { resetValidation } from "../Validation/vAdminReset.js";

const router = express.Router();

router.post("/login", loginValidation, loginAdmin);
router.get("/show", verifyToken, getAllAdmins);
router.post("/signup", signupValidation, signupAdmin);
router.post("/forget-password", forgotValidation, adminForgotPassword);
router.post("/reset-password/:token", resetValidation, adminResetPassword);

export default router;
