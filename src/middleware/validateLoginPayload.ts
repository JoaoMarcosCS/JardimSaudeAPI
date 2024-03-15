import { Request, Response, NextFunction } from "express";
import loginPayloadSchema from "../schema/loginPayload";

const validateLoginPayload = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    loginPayloadSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
};

export default validateLoginPayload;
