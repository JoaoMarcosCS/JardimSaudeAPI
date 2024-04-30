import loginRequired from "../../middleware/loginRequired";
import pacienteController from "../../controllers/paciente/pacienteController";
import { Router } from "express";
import nivelSecretaria from "../../middleware/nivelSecretaria";

const router = Router();

router.post("/", loginRequired, nivelSecretaria, pacienteController.store);
router.get("/", loginRequired, pacienteController.index);
router.get("/:id", loginRequired, pacienteController.show);
router.put("/:id", loginRequired, nivelSecretaria, pacienteController.update);
router.get("/totalRegisters", loginRequired, pacienteController.returnTotalRegister)

export default router;
