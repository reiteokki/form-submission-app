import { Router } from "express";
import {
  register,
  login,
  submitForm,
  refreshToken,
  getCustomerById,
} from "../controllers/Customer";
import { authMiddleware } from "../middlewares/Auth";
import upload from "../middlewares/Upload";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.patch("/submit", authMiddleware, upload.single("image"), submitForm);
router.get("/:id", authMiddleware, getCustomerById);

export default router;
