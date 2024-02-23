import bcryptjs from "bcryptjs";
import { CustomError } from "express-handler-errors";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "../../database/config/data-source";
import { Usuario } from "../../entities/Usuario";

dotenv.config();

export const loginService = async (data: {
  senha: string;
  email: string;
}): Promise<{ token: string }> => {
  const { senha, email } = data;

  const userRepo = (await connection).getRepository(Usuario);
  const user = await userRepo.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new CustomError({
      code: "USER_NOT_FOUND",
      message: "Usuário não encontrado",
      status: 404,
    });
  }

  const senhaCorreta = await bcryptjs.compare(senha, user.senha);

  if (!senhaCorreta) {
    throw new CustomError({
      code: "INVALID_PASSWORD",
      message: "Senha incorreta",
      status: 401,
    });
  }

  const { id, name, nivel } = user;

  const token = sign({ id, name, nivel, email }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });

  return { token };
};
