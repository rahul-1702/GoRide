import express from "express";
import multer from "multer";
import {
  signupCustomer,
  loginCustomer,
  getAllCustomers,
  loginWithGoogle,
  getAllRideTypes,
  getAllRides,
  getRideDetails,
  getCustomerProfile,
  updateCustomerProfile
} from "../controller/Customer.js";

import { verifyToken } from "../middleware/token_auth.js";

import { signupValidation } from "../Validation/customer/vSignup.js";
import { loginValidation } from "../Validation/customer/vLogin.js";
import { googleValidation } from "../Validation/customer/vGoogleLogin.js";
import { updateProfileValidation } from "../Validation/customer/vUpdateProfile.js";

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/show", verifyToken, getAllCustomers);
router.post("/signup", signupValidation, signupCustomer);
router.post("/login", loginValidation, loginCustomer);
router.post("/google-login", googleValidation, upload.single("profile_image"), loginWithGoogle);
router.get("/profile/:id", verifyToken, getCustomerProfile);
router.post("/update-profile/:id", verifyToken, updateProfileValidation, updateCustomerProfile);

router.get("/ride-types", verifyToken, getAllRideTypes);
router.get("/ride-list/:ride", verifyToken, getAllRides);
router.get("/ride-details/:id", verifyToken, getRideDetails);

export default router;
