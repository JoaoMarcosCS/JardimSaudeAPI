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
  "/:id",
  validateUserPayload,
  loginRequired,
  nivelSecretaria,
  userController.delete,
);
router.put("/:id", validateUserPayload, loginRequired, userController.update);

export default router;
