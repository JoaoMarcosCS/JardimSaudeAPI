import pacienteController from "../../controllers/paciente/pacienteController";
import { Router } from "express";

const router = Router();

router.post("/", pacienteController.store);
router.get("/", pacienteController.index);
router.get("/:id", pacienteController.show);

export default router;
