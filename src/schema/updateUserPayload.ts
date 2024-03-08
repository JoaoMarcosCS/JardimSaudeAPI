import { z } from "zod";

const Especialidade = z.object({
  id: z.number({ required_error: "Informe o id de uma especialidade" }),
});

const updateUserPayload = z.object({
  name: z.string().optional(),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .max(15, { message: "A senha deve ter no máximo 15 caracteres" })
    .optional(),
  email: z.string().email({ message: "Informe um email válido" }).optional(),
  crm: z
    .string({
      invalid_type_error: "O CRM precis ser uma string, exemplo: CRM-SP-12345",
    })
    .optional(),
  nascimento: z.string().optional(),
  salario: z.number().optional(),
  especialidade: Especialidade.optional(),
});

export default updateUserPayload;
