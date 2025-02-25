import express from "express";
import {
  loginDriver,
  signupDriver,
  getAllDrivers,
} from "../controller/Driver.js";

import { verifyToken } from "../middleware/token_auth.js";

import { signupValidation } from "../Validation/vDriverSignup.js";
import { loginValidation } from "../Validation/vDriverLogin.js";

const router = express.Router();

router.get("/show", verifyToken, getAllDrivers);
router.post("/signup", signupValidation, signupDriver);
router.post("/login", loginValidation, loginDriver);

export default router;
