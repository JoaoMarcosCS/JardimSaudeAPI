import { Tratamento } from "../../entities/Tratamento"
import { Repository } from "typeorm"
import connection from "../../database/config/data-source"


class TratamentoService{
    private repo: Repository<Tratamento>

    private async initialize(){
        this.repo= (await connection).getRepository(Tratamento);
    }

    constructor(){
        this.initialize();
    }

} 
export default new TratamentoService()