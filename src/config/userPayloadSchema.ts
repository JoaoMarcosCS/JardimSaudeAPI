import { z } from "zod";

const userPayloadSchema = z.object({
  email: z
    .string()
    .email({ message: "Preencha com um email válido" })
    .optional(),
  id: z.number().int().positive(),
  crm: z.string().optional(),
  salario: z.number().optional(),
  name: z.string().optional(),
  senha: z.string().min(6).max(15).optional(),
  nivel: z.number().optional(),
});

export default userPayloadSchema;
