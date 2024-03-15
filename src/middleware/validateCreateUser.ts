import { NextFunction, Request, Response } from "express";
import createUserPayload from "../schema/createUserPayload";
import connection from "../database/config/data-source";
import { Usuario } from "../entities/Usuario";

const validateCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await createUserPayload.parse(req.body);

    const { email, crm } = req.body;

    const existEmail = email
      ? await (await connection).getRepository(Usuario).findOne({
          where: { email: email },
        })
      : Promise.resolve(null);

    const existCrm = crm
      ? await (await connection).getRepository(Usuario).findOne({
          where: { crm: crm },
        })
      : Promise.resolve(null);

    const [emailResult, crmResult] = await Promise.all([existEmail, existCrm]);

    if (emailResult) {
      return res.status(400).json({
        error: "Este email já está em uso por outro usuário",
      });
    }

    if (crmResult) {
      return res.status(400).json({
        error: "Esta crm é utilizada por outro profissional",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
};

export default validateCreateUser;
