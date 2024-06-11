import { Router } from "express";
import medicamentoController from "../../controllers/medicamentos/medicamentoController";
import loginRequired from "../../middleware/loginRequired";

const router = Router();

router.get("/", loginRequired, medicamentoController.returnDefaultMedicamentos);

export default router;
