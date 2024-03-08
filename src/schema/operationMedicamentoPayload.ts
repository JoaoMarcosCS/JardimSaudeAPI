import {z} from "zod"

const operationMedicamentoPayload = z.object({
    id_tratamento: z.number().optional(),
    quantidade: z.number(),
    isAplication: z.boolean()
})


export default operationMedicamentoPayload;