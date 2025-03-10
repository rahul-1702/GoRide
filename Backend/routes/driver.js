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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/driver/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/show", verifyToken, getAllDrivers);
router.post("/signup", signupValidation, upload.single("profilePic"), signupDriver);
router.post("/login", loginValidation, loginDriver);

export default router;
