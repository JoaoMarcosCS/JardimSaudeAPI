import validateCreateTratamento from "../../middleware/validateCreateTratamento";
import tratamentoController from "../../controllers/tratamento/tratamentoController";
import { Router } from "express";

const router = Router();

router.post("/", validateCreateTratamento, tratamentoController.store);
router.get("/", tratamentoController.index);
router.get("/:id", tratamentoController.show);
router.put("/:id/:operation", tratamentoController.finishTratamento);

export default router;
