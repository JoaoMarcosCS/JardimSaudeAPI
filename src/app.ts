import express from "express";
import dotenv from "dotenv";
import loginRouter from "./routes/login/loginRoutes";
import userRouter from "./routes/user/userRoutes";
import medicamentoRouter from "./routes/medicamento/medicamentoRoutes";
import especialidadeRouter from "./routes/especialidade/especialidadeRoutes";
import pacienteRouter from "./routes/paciente/pacienteRouter";
import tratamentoRouter from "./routes/tratamento/tratamentoRouter";
import hospitalRouter from "./routes/hospital/hospitalRoutes";
import findPacienteByCPF from "./routes/paciente/findPacienteByCPF"
import returnTotalTratamentosById from "./routes/tratamento/returnTotalTratamentosById"
import "module-alias/register";
import helmet from "helmet";
import cors from "cors";
import * as schedule from "node-schedule";
import {IncrementOneInOrcamento} from "./services/incrementOneInOrcamento/incrementOneInOrcamento"
import { pagamentosRecebimentos } from "./services/pagamentosRecebimentos/pagamentos";

// import { corsOptions } from "./config/corsOptions";

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
app.use("/findPacienteByCPF", findPacienteByCPF);
app.use("/returnTotalTratamentosById", returnTotalTratamentosById);

//seed();


app.use(cors());
app.use(helmet());

schedule.scheduleJob("*/1 * * * *", async () => {
  await IncrementOneInOrcamento();
});

//executa o pagamento todo dia 5 do mês as 00h
schedule.scheduleJob("0 0 5 * *", async () => {
  await pagamentosRecebimentos();
});



export default app;