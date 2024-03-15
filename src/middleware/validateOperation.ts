import { NextFunction, Request, Response } from "express"
import operationMedicamentoPayload from "../schema/operationMedicamentoPayload";

const validateOperation = async(req: Request, res: Response, next: NextFunction) => {
    try{
        operationMedicamentoPayload.parse(req.body);
        next();
    }catch(error){
        return res.status(400).json({
            error: error.errors
        })
    }
}

export default validateOperation;