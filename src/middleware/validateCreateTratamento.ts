import { NextFunction, Request, Response } from "express";
import createTratamentoPayload from "..//schema/createTratamentoPayload";

const validateCreateTratamento = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    createTratamentoPayload.parse(req.body)
    
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
};

export default validateCreateTratamento;
