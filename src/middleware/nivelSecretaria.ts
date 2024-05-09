import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const nivelSecretaria = async (
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

  const { nivel } = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;

  if (nivel === 2) {
    return res.status(401).json({
      errors: ["Requer nível de secretária"],
    });
  }

  return next();
};

export default nivelSecretaria;
