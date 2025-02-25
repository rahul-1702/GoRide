import express from "express";
import {
  signupCustomer,
  loginCustomer,
  getAllCustomers,
} from "../controller/Customer.js";

import { verifyToken } from "../middleware/token_auth.js";

import { signupValidation } from "../Validation/vCustomerSignup.js";
import { loginValidation } from "../Validation/vCustomerLogin.js";

const router = express.Router();

router.get("/show", verifyToken, getAllCustomers);
router.post("/signup", signupValidation, signupCustomer);
router.post("/login", loginValidation, loginCustomer);

export default router;
