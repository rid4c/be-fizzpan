import express from "express";
import authController from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import productController from "../middleware/product.controller.js";
import profileController from "../middleware/profile.controller.js";
// import paymentController from "../controller/payment.controller.js";

const router = express.Router();

// Auth Login
router.post("/login", authController.AuthLogin);
router.post("/register", authController.AuthRegister);
router.get("/me", authMiddleware, authController.AuthMe);
router.get("/logout", authController.AuthLogout);

//Payment
// router.post("/create-transaction", paymentController.createOrder);

router.get("/produk", productController.getAllProduk);
router.post("/produk", productController.createProduct);
router.put("/produk/:id", productController.updateProduct);
router.delete("/produk/:id", productController.deleteProduct);

router.get("/profile", profileController.getAllProfile);
router.post("/profile", profileController.createProfile);
router.put("/profile/:id", profileController.updateProfile);
router.delete("/profile/:id", profileController.deleteProfile);

export default router;
