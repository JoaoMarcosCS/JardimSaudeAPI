import especialidadeController from "../../controllers/especialidade/especialidadeController";
import loginRequired from "../../middleware/loginRequired";
import { Router } from "express";

const router = Router()

router.get("/", loginRequired, especialidadeController.index);

export default router