import tratamentoController from "../../controllers/tratamento/tratamentoController";
import { Router } from "express";

const router = Router();

router.post("/", tratamentoController.store);
router.get("/", tratamentoController.index);
router.get("/:id", tratamentoController.show);
router.put("/:id/:operation", tratamentoController.finishTratamento);

export default router;
