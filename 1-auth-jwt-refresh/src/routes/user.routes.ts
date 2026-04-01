import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller";
import { verifyJwt } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

// secured route
router.post("/logout", verifyJwt, logoutUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
