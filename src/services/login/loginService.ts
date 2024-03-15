import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "../../database/config/data-source";
import { Usuario } from "../../entities/Usuario";
import { Either, error, success } from "../../errors/either";
import { HandleResponseError } from "../../errors/handle-response-errors";

dotenv.config();

type Authentication = Either<HandleResponseError, { token: string }>;

export const loginService = async (data: {
  senha: string;
  email: string;
}): Promise<Authentication> => {
  const { senha, email } = data;

  const user = await (await connection).getRepository(Usuario).findOne({
    where: {
      email: email,
      empregado: true,
    },
  });
  if (!user) {
    return error(
      new HandleResponseError("Usuário não encontrado ou foi demitido", 404),
    );
  }

  const senhaCorreta = await bcryptjs.compare(senha, user.senha);

  if (!senhaCorreta) {
    return error(new HandleResponseError("Senha incorreta", 400));
  }

  const { id, name, nivel } = user;

  const token = sign({ id, name, nivel, email }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });

  return success({ token });
};
