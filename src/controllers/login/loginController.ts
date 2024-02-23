import { Request, Response } from "express";
import { loginService } from "../../services/login/loginService";
import { CustomError } from "express-handler-errors";

class LoginController {
  async sigin(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(401).json({
        errors: ["Credenciais vazias"],
      });
    }

    try {
      const response = await loginService({ senha, email });

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.error.status).json({
          message: error.error.message,
          code: error.error.code,
        });
      }
    }
  }
}

export default new LoginController();
