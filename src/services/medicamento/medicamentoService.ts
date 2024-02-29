class MedicamentoService { 

    // esse método vai criar um novo registro de um novo medicamento
    // no controller precisa fazer uma validação nova se vai criar um medicamento ou atualizar a quantidade
    async create(){

    }

    async show(){

    }

    async index(){

    }
    
    // update para diminuir a quantidade do medicamento
    // fazer validação da quantidade para não ficar negativo
    async consume(data:{
        id:number;
        qtd:number;
    }){

    }

    // update para aumentar a quantidade em uma compra
    async add(){

    }

}

export default new MedicamentoService()