import { loginService } from "../services/loginService";

class LoginController {
  async sigin(req, res) {
    console.log("req.body: ", req.body);
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(401).json({
        errors: ["Credenciais vazias"],
      });
    }

    const response = await loginService(email, senha);
    return res.json(response);
  }
}

export default new LoginController();
