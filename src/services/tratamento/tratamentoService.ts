import { Tratamento } from "@entities/Tratamento"
import { Repository } from "typeorm"

class TratamentoService{
    private repo: Repository<Tratamento>

}

export default new TratamentoService()