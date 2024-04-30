import { Request, Response } from "express";
import userService from "../../services/user/userService";

class UserController {
  async index(req: Request, res: Response) {
    const response = await userService.index(
      req.query.field as string,
      req.query.order as string,
    );
    return res.status(200).json(response);
  }

  
  async returnTotalRegister(req: Request, res:Response){
    const response = await userService.returnTotalRegister();
    return res.status(200).json(response);
  }

  async show(req: Request, res: Response) {
    const response = await userService.show(Number(req.params.id));
    return res.status(200).json(response);
  }

  async store(req: Request, res: Response) {
    const result = await userService.create(req.body);

    if (result.isError()) {
      return res.status(400).json({
        message: result.value.message,
      });
    }

    return res.status(200).json(result.value);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const result = await userService.delete(Number(id));

    if (result.isError()) {
      //console.log("Status code:" + result.value.status);
      return res.status(404).json({
        message: result.value.message,
      });
    }
    return res.json(result.value);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const result = await userService.update(Number(req.params.id), data);

    if (result.isError()) {
      return res.status(400).json({
        message: result.value.message,
      });
    }

    return res.status(200).json(result.value);
  }
}

export default new UserController();
