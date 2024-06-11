import medicamentoService from "../../services/medicamento/medicamentoService";
import { Request, Response } from "express";

class MedicamentoController {
  // para mostrar um medicamento e seus detalhes
  async show(req: Request, res: Response) {
    const response = await medicamentoService.show(Number(req.params.id));
    return res.status(200).json(response);
  }

  async returnMedicamentosByNome(req:Request, res: Response){
    const response = await medicamentoService.returnMedicamentosByNome(req.params.nome);
    return res.status(200).json(response);
  }

  async returnDefaultMedicamentos(req:Request, res: Response){
    const response = await medicamentoService.returnDefaultMedicamentos();
    return res.status(200).json(response);
  }

  async returnTotalRegister(req: Request, res:Response){
    const response = await medicamentoService.returnTotalRegister();
    return res.status(200).json(response);
  }

  async index(req: Request, res: Response) {
    const response = await medicamentoService.index(
      req.query.field as string,
      req.query.order as string,
    );
    return res.status(200).json(response);
  }

  async store(req:Request, res:Response){
    const result = await medicamentoService.create(req.body);
    return res.status(200).json(result);
  }

  async operation(req: Request, res: Response) {
    const result = await medicamentoService.operation(
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

  // // na loja vai estar disponivel apenas os medicamentos que não estão no estoque
  // // para comprar medicamentos em estoque terá a opção na tela de estoque de comprar mais
}

export default new MedicamentoController();
