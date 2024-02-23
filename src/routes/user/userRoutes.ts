import loginRequired from "../../middleware/loginRequired";
import userController from "../../controllers/user/userController";
import { Router } from "express";
import nivelSecretaria from "../../middleware/nivelSecretaria";

const router = Router();

router.post("/", loginRequired, nivelSecretaria, userController.store);
router.delete("/", loginRequired, nivelSecretaria, userController.delete);
router.put("/", loginRequired, nivelSecretaria, userController.update);

export default router;
