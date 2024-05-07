import loginRequired from "../../middleware/loginRequired";
import pacienteController from "../../controllers/paciente/pacienteController";
import { Router } from "express";

const router = Router();

router.get("/:cpf", loginRequired, pacienteController.findPacienteByCPF);

export default router;
