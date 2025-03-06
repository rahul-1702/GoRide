import express from "express";
import multer from "multer";
import path from "path";
import {
  loginDriver,
  signupDriver,
  getAllDrivers,
} from "../controller/Driver.js";

import { verifyToken } from "../middleware/token_auth.js";

import { signupValidation } from "../Validation/vDriverSignup.js";
import { loginValidation } from "../Validation/vDriverLogin.js";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

router.get("/show", verifyToken, getAllDrivers);
router.post("/signup", signupValidation, upload.single("profilePic"), signupDriver);
router.post("/login", loginValidation, loginDriver);

export default router;
