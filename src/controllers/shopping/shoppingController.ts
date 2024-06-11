import shoppingService from "../../services/shopping/shoppingService";
import { Request, Response } from "express";

class ShoppingController {

    async index(req: Request, res: Response) {
        const response = await shoppingService.index();
        return res.status(200).json(response);
    }

    async returnDefaultShoppings(req: Request, res: Response) {
        const response = await shoppingService.returnDefaultShoppings();
        return res.status(200).json(response);
    }

    async show(req: Request, res: Response) {
        const response = await shoppingService.findMedicamentosByNome(req.params.nome);
        return res.status(200).json(response);
      }
}

export default new ShoppingController();