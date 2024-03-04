import { Especialidade } from "../../entities/Especialidade";
import { Repository } from "typeorm";
import connection from "../../database/config/data-source"

class EspecialidadeService {
    private repo: Repository<Especialidade>

    private async initialize(){
        this.repo = (await connection).getRepository(Especialidade);
    }

    constructor(){
        this.initialize();
    }

    async index(){
        const response = await this.repo.findAndCount({
            order:{
                nome: "asc"
            },
            relations:{
                hospital: true
            }
        })
        return response;
    }
}

export default new EspecialidadeService