import validateCreateTratamento from "../../middleware/validateCreateTratamento";
import tratamentoController from "../../controllers/tratamento/tratamentoController";
import { Router } from "express";
import loginRequired from "../../middleware/loginRequired";

const router = Router();

router.post("/", validateCreateTratamento, tratamentoController.store);
router.get("/", loginRequired, tratamentoController.index);
router.get("/:id",loginRequired, tratamentoController.show);
router.put("/:id/:operation",loginRequired, tratamentoController.finishTratamento);

export default router;
