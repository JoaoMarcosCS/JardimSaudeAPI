import express from "express";
import dotenv from "dotenv";
import loginRouter from "./routes/login/loginRoutes";
import userRouter from "./routes/user/userRoutes";
import "module-alias/register";
//import { seed } from "./database/seeders/seed";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/login", loginRouter);
app.use("/usuario", userRouter);

app.listen(3000, () => {
  console.log("Servidor rodando: http://localhost:3000");
});
