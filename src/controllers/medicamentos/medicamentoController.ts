class MedicamentoController {

    // para mostrar um medicamento e seus detalhes
    async show(req:Request, res:Response){
        
    }

    // para mostrar a lista de medicamentos
    async index(req:Request, res:Response){
        
    }

    // para aumentar ou diminuir em X a quantidade de um registro
    // posso mandar a operação no body ou em uma query
    async operation(req:Request, res:Response){
        
    }

    // na loja vai estar disponivel apenas os medicamentos que não estão no estoque
    // para comprar medicamentos em estoque terá a opção na tela de estoque de comprar mais
    async create(req:Request, res:Response){
        
    }
}

export default new MedicamentoController()