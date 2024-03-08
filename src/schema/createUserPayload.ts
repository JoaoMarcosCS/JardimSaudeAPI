import { z } from "zod";

const Especialidade = z.object({
  id: z.number({ required_error: "Informe o id de uma especialidade" }),
});

const createUserPayload = z.object({
  name: z.string({ required_error: "Informe o nome do usuário" }),
  senha: z
    .string({ required_error: "Informe uma senha válida" })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .max(15, { message: "A senha deve ter no máximo 15 caracteres" }),
  email: z
    .string({ required_error: "Informe um email" })
    .email({ message: "Informe um email válido" }),
  crm: z
    .string({
      invalid_type_error: "O CRM precis ser uma string, exemplo: CRM-SP-1234",
    })
    .optional(),
  nascimento: z.string({ required_error: "Informe uma data de nascimento " }),
  nivel: z.number({ required_error: "Informe o nível do usuário" }).refine(
    (nivel) => {
      return nivel == 1 || nivel == 2;
    },
    { message: "O nível do usuário só pode ser 1(secretária) ou 2(médico)" },
  ),
  salario: z.number({ required_error: "Informe o salário do funcionário" }),
  especialidade: Especialidade.optional(),
  empregado: z.boolean(),
});

export default createUserPayload;
