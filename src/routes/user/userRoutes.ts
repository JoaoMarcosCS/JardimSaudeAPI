import loginRequired from "../../middleware/loginRequired";
import userController from "../../controllers/user/userController";
import { Router } from "express";
import nivelSecretaria from "../../middleware/nivelSecretaria";
import validateCreateUser from "../../middleware/validateCreateUser";
import validateUpdateUser from "../../middleware/validateUpdateUser";
("../../middleware/");

const router = Router();

router.get("/:id", loginRequired, userController.show);

router.get("/", loginRequired, nivelSecretaria, userController.index);
router.get("/totalRegisters", loginRequired, userController.returnTotalRegister)

router.post(
  "/",
  loginRequired,
  validateCreateUser,
  nivelSecretaria,
  userController.store,
);
router.delete("/:id", loginRequired, nivelSecretaria, userController.delete);
router.put("/:id", loginRequired, validateUpdateUser, userController.update);

export default router;
