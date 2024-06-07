import loginRequired from "../../middleware/loginRequired";
import pacienteController from "../../controllers/paciente/pacienteController";
import { Router } from "express";
import { nivelMedico } from "../../middleware/nivelMedico";

const router = Router();

router.get("/fetchTotalPacientesByMedicoId/:medicoId", loginRequired, nivelMedico, pacienteController.fetchTotalPacientesByMedicoId);
router.get("/fetchPacientesByMedicoId/:medicoId", loginRequired, nivelMedico, pacienteController.fetchPacientesByMedicoId);

export default router;
