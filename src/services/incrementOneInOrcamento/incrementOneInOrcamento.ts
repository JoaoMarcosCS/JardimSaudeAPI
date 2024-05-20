import { Repository } from "typeorm";
import Hospital from "../../entities/Hospital";
import connection from "../../database/config/data-source"

export const IncrementOneInOrcamento = async () => {

    const hospital = await (await connection).getRepository(Hospital).findOne({
        where: {
            nome: "Jardim Saúde",
        },
    });

    hospital.orcamento =
        Number(hospital.orcamento) + 1;

    await (await connection).getRepository(Hospital)
        .createQueryBuilder()
        .update(Hospital)
        .set({ orcamento: hospital.orcamento })
        .where("nome = :nome", { nome: hospital.nome })
        .execute();

}

// class IncrementOneInOrcamento {
//     private repo: Repository<Hospital>

//     private async initialize() {
//         this.repo = (await connection).getRepository(Hospital);
//     }

//     constructor() {
//         this.initialize();
//     }

//     async incremet() {
//         const hospital = await this.repo.findOne({
//             where: {
//                 nome: "Jardim Saúde",
//             },
//         });

//         hospital.orcamento =
//             Number(hospital.orcamento) + 1;

//         await this.repo
//             .createQueryBuilder()
//             .update(Hospital)
//             .set({ orcamento: hospital.orcamento })
//             .where("nome = :nome", { nome: hospital.nome })
//             .execute();
//     }
// }

// export default new IncrementOneInOrcamento()