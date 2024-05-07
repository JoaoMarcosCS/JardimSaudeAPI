
import pacienteService from "../../services/paciente/pacienteService";
import { Request, Response } from "express";

class PacienteController {
  async show(req: Request, res: Response) {
    const response = await pacienteService.show(Number(req.params.id));
    return res.status(200).json(response);
  }

  
  async returnTotalRegister(req: Request, res:Response){
    const response = await pacienteService.returnTotalRegister();
    return res.status(200).json(response);
  }

  async findPacienteByCPF(req: Request, res: Response){
    const response = await pacienteService.findPacienteByCPF(req.params.cpf)
    return res.status(200).json(response);
  }

  async index(req: Request, res: Response) {
    const response = await pacienteService.index(
      req.query.field as string,
      req.query.order as string,
    );
    return res.status(200).json(response);
  }

  async store(req: Request, res: Response) {
    const result = await pacienteService.create(req.body);

    if (result.isError()) {
      return res.status(400).json({
        message: result.value.message,
      });
    }

    return res.status(200).json(result.value);
  }

  async update(req: Request, res: Response) {
    const result = await pacienteService.update(
      Number(req.params.id),
      req.body,
    );

    if (result.isError()) {
      return res.status(400).json({
        message: result.value.message,
      });
    }

    return res.status(200).json(result.value);
  }
}

export default new PacienteController();
