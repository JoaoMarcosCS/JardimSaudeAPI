import tratamentoService from "../../services/tratamento/tratamentoService";
import { Request, Response } from "express";

class TratamentoController {
    async store(req: Request, res: Response){
        const result = await tratamentoService.create(req.body)
        return res.status(200).json(result);
    }
}

export default new TratamentoController()