import { Router } from "express";
import medicamentoController from "../../controllers/medicamentos/medicamentoController";
import loginRequired from "../../middleware/loginRequired";
import nivelSecretaria from "../../middleware/nivelSecretaria";

const router = Router();

router.get("/:nome", loginRequired, medicamentoController.returnMedicamentosByNome);

export default router;
