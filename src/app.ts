import express from "express";
import dotenv from "dotenv";
import loginRouter from "./routes/login/loginRoutes";
import userRouter from "./routes/user/userRoutes";
import medicamentoRouter from "./routes/medicamento/medicamentoRoutes";
import especialidadeRouter from "./routes/especialidade/especialidadeRoutes";
import pacienteRouter from "./routes/paciente/pacienteRouter";
import tratamentoRouter from "./routes/tratamento/tratamentoRouter";
import hospitalRouter from "./routes/hospital/hospitalRoutes"
import "module-alias/register";
//import { seed } from "./database/seeders/seed";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/login", loginRouter);
app.use("/usuario", userRouter);
app.use("/medicamento", medicamentoRouter);
app.use("/especialidade", especialidadeRouter);
app.use("/paciente", pacienteRouter);
app.use("/tratamento", tratamentoRouter);
app.use("/hospital", hospitalRouter);

export default app;
