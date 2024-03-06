import tratamentoController from "../../controllers/tratamento/tratamentoController";
import {Router} from "express";

const router = Router();

router.post("/", tratamentoController.store);

export default router