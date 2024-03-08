import { NextFunction, Request, Response } from "express";
import updateUserPayload from "..//schema/updateUserPayload";
import connection from "../database/config/data-source";
import { Usuario } from "../entities/Usuario";
import { Not } from "typeorm";

const validateUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await updateUserPayload.parse(req.body);

    const { crm, email } = req.body;
    const id = Number(req.params.id);

    const existEmail = email
      ? await (await connection).getRepository(Usuario).findOne({
          where: { email: email, id: Not(id) },
        })
      : Promise.resolve(null);

    const existCrm = crm
      ? await (await connection).getRepository(Usuario).findOne({
          where: { crm: crm, id: Not(id) },
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

export default validateUpdateUser;
