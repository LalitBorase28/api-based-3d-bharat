import * as Yup from "yup";

/**
 * Single Source of Truth for Platform Validation Rules
 */

// 1. Mobile Number (10 digits, starts with 6-9)
export const mobileSchema = Yup.string()
  .matches(/^[6-9]\d{9}$/, "10 digits, starts with 6-9")
  .required("Required");

// 2. Email Address (Professional Format)
export const emailSchema = Yup.string()
  .email("Invalid email address")
  .required("Required");

// 3. Names (Letters & Spaces, Min 3 chars)
export const nameSchema = Yup.string()
  .matches(/^[a-zA-Z\s]+$/, "Only letters allowed")
  .min(3, "Minimum 3 characters")
  .max(30, "Max 30 characters")
  .required("Required");


// 4. Short Names/IDs (Alpha-numeric, Min 2, Max 12)
export const shortNameSchema = Yup.string()
  .min(2, "Too short")
  .max(12, "Maximum 12 characters")
  .required("Required");

// 5. Password (Security Standard)
export const passwordSchema = Yup.string()
  .min(8, "Minimum 8 characters")
  .required("Required");

// 6. Generic Required String
export const requiredString = Yup.string().required("Required");
