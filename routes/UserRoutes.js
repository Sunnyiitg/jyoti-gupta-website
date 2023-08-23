import express from "express";
import { Login, RegisterUser } from "../controller/userController.js";
import { SigupValidation, LoginValidation } from "../utils/Validation.js";

const router = express.Router();

router.post("/register", SigupValidation, RegisterUser);

router.post("/login", LoginValidation, Login);

export default router;
