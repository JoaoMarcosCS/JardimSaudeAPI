import { Router } from "express";
import loginController from "../../controllers/login/loginController";
import validateLoginPayload from "../../middleware/validateLoginPayload";

const router = Router();

router.post("/", validateLoginPayload, loginController.sigin);

export default router;
