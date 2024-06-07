import loginRequired from "../../middleware/loginRequired";
import pacienteController from "../../controllers/paciente/pacienteController";
import { Router } from "express";
import { nivelMedico } from "../../middleware/nivelMedico";

const router = Router();

router.get("/:medicoId", loginRequired, nivelMedico, pacienteController.fetchTotalPacientesByMedicoId);

export default router;
