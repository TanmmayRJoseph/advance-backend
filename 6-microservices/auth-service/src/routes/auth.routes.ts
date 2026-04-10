import express from "express";
import {registerUserController,loginUserController,getUserProfileController,getAllUsersForAdminController,} from "../controllers/auth.controller";

import { verifyJwt } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);

// Protected
router.get("/profile", verifyJwt, getUserProfileController);

// Admin only
router.get("/admin-all-users", verifyJwt, isAdmin, getAllUsersForAdminController);

export default router;