import medicamentoService from "../../services/medicamento/medicamentoService";
import { Request, Response } from "express";

class MedicamentoController {
  // para mostrar um medicamento e seus detalhes
  async show(req: Request, res: Response) {
    const response = await medicamentoService.show(Number(req.params.id));
    return res.status(200).json(response);
  }

  // para mostrar a lista de medicamentos
  async index(req: Request, res: Response) {
    console.log("Campo filtrado: " + req.query.field);
    console.log("Ordenação: " + req.query.order);
    const response = await medicamentoService.index(
      req.query.field as string,
      req.query.order as string,
    );
    return res.status(200).json(response);
  }

  // // para aumentar ou diminuir em X a quantidade de um registro
  // // posso mandar a operação no body ou em uma query
  async operation(req: Request, res: Response) {
    const response = await medicamentoService.operation(Number(req.params.id), req.body);
    return res.status(200).json(response);
  }

  // // na loja vai estar disponivel apenas os medicamentos que não estão no estoque
  // // para comprar medicamentos em estoque terá a opção na tela de estoque de comprar mais
  // async create(req: Request, res: Response) {}
}

export default new MedicamentoController();
