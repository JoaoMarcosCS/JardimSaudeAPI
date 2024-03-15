import especialidadeService from "../../services/especialidade/especialidadeService";
import { Request, Response } from "express";

class EspecialidadeController {
    async index (req:Request, res:Response){
        const response = await especialidadeService.index();
        return res.status(200).json(response);
    }
}

export default new EspecialidadeController()