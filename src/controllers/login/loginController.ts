import { Request, Response } from "express";
import { loginService } from "../../services/login/loginService";

class LoginController {
  async sigin(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    const result = await loginService({ senha, email });

    if (result.isError()) {
      return res.status(400).json({
        message: result.value.message,
      });
    }

    return res.status(200).json(result.value);
  }
}

export default new LoginController();
