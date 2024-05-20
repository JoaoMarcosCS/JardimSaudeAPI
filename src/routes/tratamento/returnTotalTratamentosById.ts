import tratamentoController from "../../controllers/tratamento/tratamentoController";
import { Router } from "express";
import loginRequired from "../../middleware/loginRequired";
import { nivelMedico } from "../../middleware/nivelMedico";

const router = Router();

router.get("/:medicoId", loginRequired, nivelMedico, tratamentoController.returnTotalTratamentoById);

export default router;
