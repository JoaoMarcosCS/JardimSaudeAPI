import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const nivelMedico = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  const [, token] = authorization.split(" ");

  const { nivel } = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;

  if (nivel === 1) {
    return res.status(401).json({
      errors: ["Requer nível de médico"],
    });
  }

  return next();
};
