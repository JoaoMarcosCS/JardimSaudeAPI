import tratamentoService from "../../services/tratamento/tratamentoService";
import { Request, Response } from "express";

class TratamentoController {
  async store(req: Request, res: Response) {
    const result = await tratamentoService.create(req.body);
    return res.status(200).json(result);
  }

  
  async returnTotalRegister(req: Request, res:Response){
    const response = await tratamentoService.returnTotalRegister();
    return res.status(200).json(response);
  }

  async index(req: Request, res: Response) {
    const result = await tratamentoService.index(
      req.query.field as string,
      req.query.order as string,
    );

    return res.status(200).json(result);
  }

  async show(req: Request, res: Response) {
    const response = await tratamentoService.show(Number(req.params.id));
    return res.status(200).json(response);
  }

  async finishTratamento(req: Request, res: Response) {
    const operation = req.params.operation;

    if (operation == "finalizar") {
      const result = await tratamentoService.finishTratamento(
        Number(req.params.id),
      );
      if (result.isError()) {
        return res.status(404).json({
          message: result.value.message,
        });
      }

      return res.status(200).json(result.value);
    } else if (operation == "cancelar") {
      const result = await tratamentoService.cancelTratamento(
        Number(req.params.id),
      );
      if (result.isError()) {
        return res.status(404).json({
          message: result.value.message,
        });
      }

      return res.status(200).json(result.value);
    } else {
      return res.status(400).json({
        message: "Não foi realizada nenhuma ação",
      });
    }
  }
}

export default new TratamentoController();
