import { NextFunction, Request, Response } from "express";
import userPayloadSchema from "../config/userPayloadSchema";

const validateUserPayload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userPayloadSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
};

export default validateUserPayload;
