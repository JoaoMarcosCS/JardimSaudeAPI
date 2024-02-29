import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const loginPayloadSchema = z.object({
  email: z.string().email({ message: "Preencha com um email válido" }),
  senha: z.string().min(6).max(15),
});

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
