import loginRequired from "../../middleware/loginRequired";
import shoppingController from "../../controllers/shopping/shoppingController";
import { Router } from "express";
import nivelSecretaria from "../../middleware/nivelSecretaria";;


const router = Router();

router.get("/", loginRequired, nivelSecretaria, shoppingController.index);
router.get("/:nome", loginRequired,nivelSecretaria, shoppingController.show);

export default router;
