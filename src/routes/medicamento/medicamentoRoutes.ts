import {Routes} from "express"
import medicamentoController from "../../controllers/medicamentos/medicamentoController"

const route = Router()

route.get("/", medicamentoController.index)
route.get("/:id", medicamentoController.show)
route.put("/:id", medicamentoController.operation) //essa rota precisa ter uma query para a operação que vai realizar
route.post("/", medicamentoController.create)

export default route