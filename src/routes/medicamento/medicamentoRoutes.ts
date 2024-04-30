import { Router } from "express";
import medicamentoController from "../../controllers/medicamentos/medicamentoController";
import loginRequired from "../../middleware/loginRequired";
import nivelSecretaria from "../../middleware/nivelSecretaria";

const router = Router();

router.get("/", loginRequired, medicamentoController.index);
router.get("/:id", loginRequired, medicamentoController.show);
router.put(
  "/:id",
  loginRequired,
  nivelSecretaria,
  medicamentoController.operation,
); //essa rota precisa ter uma query para a operação que vai realizar
router.post("/", loginRequired, nivelSecretaria, medicamentoController.store);
router.get("/totalRegisters", loginRequired, medicamentoController.returnTotalRegister)

export default router;
