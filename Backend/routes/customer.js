import express from "express";
import multer from "multer";
import {
  signupCustomer,
  loginCustomer,
  getAllCustomers,
  loginWithGoogle,
} from "../controller/Customer.js";

import { verifyToken } from "../middleware/token_auth.js";

import { signupValidation } from "../Validation/vCustomerSignup.js";
import { loginValidation } from "../Validation/vCustomerLogin.js";
// import { googleValidation } from "../Validation/vCustomerGoogleLogin.js";

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/show", verifyToken, getAllCustomers);
router.post("/signup", signupValidation, signupCustomer);
router.post("/login", loginValidation, loginCustomer);
router.post("/google-login", upload.single("profile_image"), loginWithGoogle);

export default router;
