import { Router } from "express";
import loginController from "../controllers/loginController";

const router = Router();

router.post("/login", loginController.sigin);

export default router;
