import hospitalService from "../../services/hospital/hospitalService";
import { Request, Response } from "express";

class HospitalController{
    async index(req: Request, res: Response){
        const result = await hospitalService.index()
        return res.status(200).json({result})
    }
}

export default new HospitalController();