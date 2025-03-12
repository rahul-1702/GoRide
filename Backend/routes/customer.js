import express from "express";
import multer from "multer";
import path from "path";
import {
  signupCustomer,
  loginCustomer,
  getAllCustomers,
  googleLogin
} from "../controller/Customer.js";

import { verifyToken } from "../middleware/token_auth.js";

import { signupValidation } from "../Validation/vCustomerSignup.js";
import { loginValidation } from "../Validation/vCustomerLogin.js";
import { googleValidation } from "../Validation/vCustomerGoogleLogin.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/customer/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

router.get("/show", verifyToken, getAllCustomers);
router.post("/signup", signupValidation, signupCustomer);
router.post("/login", loginValidation, loginCustomer);

router.post("/login-google", googleValidation, upload.single("profilePic"), googleLogin);

export default router;
