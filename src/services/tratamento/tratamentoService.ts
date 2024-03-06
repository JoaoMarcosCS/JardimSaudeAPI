import { Tratamento } from "../../entities/Tratamento"
import { Repository } from "typeorm"
import connection from "../../database/config/data-source"
import TratamentoInterface from "../../interface/tratamento-interface";
import { Paciente } from "../../entities/Paciente";
import { Usuario } from "../../entities/Usuario";


class TratamentoService{
    private repo: Repository<Tratamento>

    private async initialize(){
        this.repo= (await connection).getRepository(Tratamento);
    }

    constructor(){
        this.initialize();
    }

    async create(data:TratamentoInterface){
        const tratamento = new Tratamento();
        tratamento.inicio= data.inicio;
        tratamento.valor = data.valor;
        tratamento.nome= data.nome;
        tratamento.queixas=data.queixas;
        tratamento.status = "Em andamento";
        tratamento.termino = data.termino;
        tratamento.aplicacoes_medicamentos = data.aplicacoes_medicamentos;
        tratamento.paciente = data.id_paciente;
        tratamento.medico_responsavel = data.id_medico;

        await this.repo.save(tratamento);

        return {ok:true};

    }

} 
export default new TratamentoService()