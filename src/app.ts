import express from "express";
import dotenv from "dotenv";
import loginRouter from "./routes/loginRoutes";

dotenv.config();

const app = express();

app.use("/user", loginRouter);

app.listen(3000, () => {
  console.log("Servidor rodando: http://localhost:3000");
});
