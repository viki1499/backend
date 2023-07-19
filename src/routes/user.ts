import * as UserController from "../controllers/user";
import express from "express";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login",UserController.login);

export default router;
