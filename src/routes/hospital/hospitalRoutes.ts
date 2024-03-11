import hospitalController from "@controllers/hospital/hospitalController";
import loginRequired from "@middlewares/loginRequired";
import { Router } from "express";

const router = Router();

router.get("/", loginRequired, hospitalController.index)

export default router