import { Request, Response } from "express";
import userService from "../../services/user/userService";
import { CustomError } from "express-handler-errors";

class UserController {
  async store(req: Request, res: Response) {
    try {
      const response = await userService.create(req.body);
      return res.status(200).json(response);
    } catch (e) {
      if (e instanceof CustomError) {
        return res.status(e.error.status).json({
          message: e.error.message,
          code: e.error.code,
        });
      }
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const response = await userService.delete(id);
      return res.status(200).json(response);
    } catch (e) {
      if (e instanceof CustomError) {
        return res.status(e.error.status).json({
          message: e.error.message,
          code: e.error.code,
        });
      }
    }
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    try {
      const response = await userService.update(data);
      return res.status(200).json(response);
    } catch (e) {
      if (e instanceof CustomError) {
        return res.status(e.error.status).json({
          message: e.error.message,
          code: e.error.code,
        });
      }
    }
  }
}

export default new UserController();
