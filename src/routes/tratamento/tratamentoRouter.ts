import validateCreateTratamento from "../../middleware/validateCreateTratamento";
import tratamentoController from "../../controllers/tratamento/tratamentoController";
import { Router } from "express";
import loginRequired from "../../middleware/loginRequired";
import { nivelMedico } from "../../middleware/nivelMedico";
import nivelSecretaria from "../../middleware/nivelSecretaria";

const router = Router();

router.post(
  "/",
  validateCreateTratamento,
  nivelSecretaria,
  tratamentoController.store,
);
router.get("/", loginRequired, tratamentoController.index);
router.get("/:id", loginRequired, tratamentoController.show);
router.put(
  "/:id/:operation",
  loginRequired,
  nivelMedico,
  tratamentoController.finishTratamento,
);

export default router;
