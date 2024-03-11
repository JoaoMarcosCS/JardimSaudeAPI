import loginRequired from "../../middleware/loginRequired";
import pacienteController from "../../controllers/paciente/pacienteController";
import { Router } from "express";

const router = Router();

router.post("/", loginRequired, pacienteController.store);
router.get("/", loginRequired, pacienteController.index);
router.get("/:id",loginRequired, pacienteController.show);
router.put("/:id", loginRequired, pacienteController.update);

export default router;
