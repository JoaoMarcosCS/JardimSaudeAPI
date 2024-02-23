import jwt, { JwtPayload } from "jsonwebtoken";
import connection from "../database/config/data-source";
import { Usuario } from "../entities/Usuario";
import { NextFunction, Request, Response } from "express";

const loginRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Token não encontrado"],
    });
  }
  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;
    const { id, email } = data;

    const repo = (await connection).getRepository(Usuario);
    const user = await repo.findOne({
      where: {
        email: email,
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: ["Usuário não encontrado"],
      });
    }

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: [`Erro: ${e}`],
    });
  }
};

export default loginRequired;
