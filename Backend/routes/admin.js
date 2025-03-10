import express from "express";
import multer from "multer";
import path from "path";
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/admin/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

router.post("/login", loginValidation, loginAdmin);
router.get("/show", verifyToken, getAllAdmins);
router.post("/signup", signupValidation, upload.single("profilePic"), signupAdmin);
router.post("/forget-password", forgotValidation, adminForgotPassword);
router.post("/reset-password/:token", resetValidation, adminResetPassword);

export default router;
