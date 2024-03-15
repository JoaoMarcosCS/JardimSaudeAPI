import { z } from "zod";

const loginPayloadSchema = z.object({
  email: z.string().email({ message: "Preencha com um email válido" }),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .max(15, { message: "A senha deve ter no máximo 15 caracteres" }),
});

export default loginPayloadSchema;
