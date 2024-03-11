import { Router } from "express";
import medicamentoController from "../../controllers/medicamentos/medicamentoController";
import loginRequired from "../../middleware/loginRequired";

const router = Router();

router.get("/", loginRequired, medicamentoController.index);
router.get("/:id", loginRequired, medicamentoController.show);
router.put("/:id", loginRequired, medicamentoController.operation); //essa rota precisa ter uma query para a operação que vai realizar
router.post("/", loginRequired, medicamentoController.store);

export default router;
