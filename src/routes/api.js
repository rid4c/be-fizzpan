import express from "express";
import authController from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth Login
router.post("/login", authController.AuthLogin);
router.post("/register", authController.AuthRegister);
router.get("/me", authMiddleware, authController.AuthMe);
router.get("/logout", authController.AuthLogout);

export default router;
