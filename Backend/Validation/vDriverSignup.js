import { body } from "express-validator";

// Validation rules for signup
export const signupValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("First Name is required")
    .isString()
    .withMessage("First Name must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("First Name must be between 3 and 30 characters"),

  body("last_name")
    .notEmpty()
    .withMessage("Last Name is required")
    .isString()
    .withMessage("Last Name must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("Last Name must be between 3 and 30 characters"),

  body("mobile")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isString()
    .withMessage("Mobile number must be a string")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid Indian mobile number"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be either 'male', 'female', or 'other'"),

  body("dob")
    .notEmpty()
    .withMessage("Date of Birth is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD")
    .custom((value) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 18) {
        throw new Error("Driver must be at least 18 years old");
      }
      return true;
    }),

  body("profile_pic")
    .optional()
    .isURL()
    .withMessage("Profile picture must be a valid URL"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),

  body("current_address")
    .notEmpty()
    .withMessage("Current address is required")
    .isString()
    .withMessage("Current address must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),

  body("permanent_address")
    .notEmpty()
    .withMessage("Permanent address is required")
    .isString()
    .withMessage("Permanent address must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),

  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("City must be between 2 and 50 characters"),

  body("state")
    .notEmpty()
    .withMessage("State is required")
    .isString()
    .withMessage("State must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("State must be between 2 and 50 characters"),

  body("zip_code")
    .notEmpty()
    .withMessage("ZIP Code is required")
    .isPostalCode("IN")
    .withMessage("Invalid Indian ZIP Code"),

  body("ride_no")
    .notEmpty()
    .withMessage("Ride number is required")
    .isAlphanumeric()
    .withMessage("Ride number must contain only letters and numbers")
    .isLength({ min: 5, max: 15 })
    .withMessage("Ride number must be between 5 and 15 characters"),

  body("license")
    .notEmpty()
    .withMessage("License number is required")
    .matches(/^[A-Z]{2}[0-9]{2}[0-9]{11}$/)
    .withMessage("Invalid Indian driving license format"),
];
