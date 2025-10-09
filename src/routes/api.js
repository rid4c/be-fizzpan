import express from "express";
import authController from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import paymentController from "../controller/payment.controller.js";

const router = express.Router();

// Auth Login
router.post("/login", authController.AuthLogin);
router.post("/register", authController.AuthRegister);
router.get("/me", authMiddleware, authController.AuthMe);
router.get("/logout", authController.AuthLogout);

//Payment
router.post("/create-transaction", paymentController.createOrder);
router.

export default router;
