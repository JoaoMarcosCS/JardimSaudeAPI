import { Router } from "express";
import loginController from "../../controllers/login/loginController";

const router = Router();

router.post("/", loginController.sigin);

export default router;
