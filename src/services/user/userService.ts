import { Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { Usuario } from "../../entities/Usuario";
import bcryptjs from "bcryptjs";
import { Especialidade } from "../../entities/Especialidade";
import { UserFilter } from "../../enums/userFilter";
import auditoria from "../auditoria/auditoria";
import { Either, error, success } from "../../errors/either";
import { HandleResponseError } from "../../errors/handle-response-errors";
import UsuarioInterface from "src/interface/user/usuarioInterface";

type Response = Either<HandleResponseError, { ok: boolean }>;

class UserService {
  private repo: Repository<Usuario>;

  async initialize() {
    this.repo = (await connection).getRepository(Usuario);
  }

  constructor() {
    this.initialize();
  }

  async index(field: string, order: string) {
    if (field && Object.values(UserFilter).includes(field as UserFilter)) {
      const orderOption = {};
      orderOption[field] = order || "ASC";

      const response = await this.repo.findAndCount({
        where: {
          empregado: true,
        },
        order: orderOption,
        relations: {
          especialidade: true,
        },
        select:{
          name: true,
          nascimento:true,
          cpf:true,
          crm:true,
          email:true,
          empregado:true,
          id:true,
          nivel:true,
          salario:true,
        },
      });
      return response;
    } else {
      const response = await this.repo.find({
        where: {
          empregado: true,
        },
        select:{
          name: true,
          nascimento:true,
          cpf:true,
          crm:true,
          email:true,
          empregado:true,
          id:true,
          nivel:true,
          salario:true,
        },
        order: {
          name: "ASC",
        },
        relations: {
          especialidade: true,
          pagamento:true,
        },
      });
      return response;
    }
  }

  async show(id: number) {
    const response = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        especialidade: true,
        pagamento: true,
      },
    });
    return response;
  }

  async create(data: UsuarioInterface): Promise<Response> {
    data.senha = await bcryptjs.hash(data.senha, 10);

    const novoUsuario = new Usuario();

    novoUsuario.name = data.name;
    novoUsuario.cpf = data.cpf;
    novoUsuario.crm = data.crm;
    novoUsuario.email = data.email;
    novoUsuario.empregado = data.empregado;
    novoUsuario.especialidade = data.id_especialidade;
    novoUsuario.nascimento = new Date(data.nascimento);
    novoUsuario.nivel = data.nivel;
    novoUsuario.salario = Number(data.salario);
    novoUsuario.senha = data.senha;

    const userCreated = await this.repo.findOne({
      where: {
        email: data.email,
      },
    });

    await auditoria.pagamentoUsuario(userCreated);

    return success({ ok: true });
  }

  async delete(id: number): Promise<Response> {
    const response = await this.repo
      .createQueryBuilder()
      .update(Usuario)
      .set({ empregado: false })
      .where("id = :id", { id: id })
      .execute();

    if (response.affected === 0) {
      return error(new HandleResponseError("Usuário não encontrado", 404));
    }

    return success({ ok: true });
  }

  async update(
    id: number,
    data: {
      name?: string;
      crm?: string;
      senha?: string;
      email?: string;
      nascimento?: Date;
      salario?: number;
      especialidade?: Especialidade;
    },
  ): Promise<Response> {
    const response = await this.repo
      .createQueryBuilder()
      .update(Usuario)
      .set(data)
      .where("id = :id", { id: id })
      .execute();

    if (response.affected === 0) {
      return error(new HandleResponseError("Usuário não encontrado", 404));
    }

    return success({ ok: true });
  }

 
}

export default new UserService();
