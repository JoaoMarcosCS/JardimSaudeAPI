import { Repository } from "typeorm";
import Hospital from "../../entities/Hospital";
import connection from "../../database/config/data-source"

class HospitalService{
    private repo: Repository<Hospital>

    private async initialize(){
        this.repo = (await connection).getRepository(Hospital);
    }

    constructor(){
        this.initialize();
    }

    async index(){
        const response = await this.repo.findAndCount({
            where:{
                nome:"Jardim Saúde"
            }
        })

        return response;
    }
}

export default new HospitalService()