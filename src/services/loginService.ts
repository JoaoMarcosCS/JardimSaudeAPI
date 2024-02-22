import { AppDataSource } from "../database/config/data-source";
import { Usuario } from "../entities/Usuario";
import * as bcrypt from "bcrypt";
import { CustomError } from "express-handler-errors";
import { sign } from "jsonwebtoken";

export const loginService = async (email, senha) => {
  const hash = await bcrypt.hash(senha, 10);

  try {
    const user = await AppDataSource.createQueryBuilder()
      .select("usuario")
      .from(Usuario, "usuario")
      .where("usuario.email = :email AND usuario.senha = :hash", {
        email,
        hash,
      })
      .getOne();

    if (!user) {
      throw new CustomError({
        code: "USER_NOT_FOUND",
        message: "Usuário não encontrado",
        status: 404,
      });
    }

    const payload = { nome: user.name, id: user.id, nivel: user.nivel };

    const token = sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    if (error instanceof CustomError) throw error;

    throw new CustomError({
      code: "ERROR_AUTHENTICATE",
      message: "Erro na autenticação",
      status: 500,
    });
  }
};
