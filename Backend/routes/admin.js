import express from "express";
import multer from "multer";
import path from "path";
import {
  adminForgotPassword,
  adminResetPassword,
  getAllAdmins,
  loginAdmin,
  signupAdmin,
  getCustomerProfile,
  updateCustomerProfile,
  getDriverProfile,
  updateDriverProfile,
  getTeamProfile,
  updateTeamProfile,
} from "../controller/Admin.js";

import { verifyToken } from "../middleware/token_auth.js";

import { signupValidation } from "../Validation/admin/vSignup.js";
import { loginValidation } from "../Validation/admin/vLogin.js";
import { forgotValidation } from "../Validation/admin/vForgotPassword.js";
import { resetValidation } from "../Validation/admin/vResetPassword.js";

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

router.get("/team-profile/:id", getTeamProfile);
router.post("/team-profile/update", updateTeamProfile);

router.get("/customer-profile/:id", getCustomerProfile);
router.post("/customer-profile/update", updateCustomerProfile);

router.get("/driver-profile/:id", getDriverProfile);
router.post("/driver-profile/update", updateDriverProfile);

export default router;
