import loginRequired from "../../middleware/loginRequired";
import userController from "../../controllers/user/userController";
import { Router } from "express";
import nivelSecretaria from "../../middleware/nivelSecretaria";
import validateUserPayload from "../../middleware/validateUserPayload";

const router = Router();

router.get("/:id", loginRequired, nivelSecretaria, userController.show);

router.get("/", loginRequired, nivelSecretaria, userController.index);

router.post(
  "/",
  validateUserPayload,
  loginRequired,
  nivelSecretaria,
  userController.store,
);
router.delete(
  "/",
  validateUserPayload,
  loginRequired,
  nivelSecretaria,
  userController.delete,
);
router.put(
  "/",
  validateUserPayload,
  loginRequired,
  nivelSecretaria,
  userController.update,
);

export default router;
