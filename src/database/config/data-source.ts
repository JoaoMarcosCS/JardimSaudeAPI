import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ["src/entities/*{.ts,.js}"],
  migrations: ["src/database/migrations/*{.ts,.js}"],
  subscribers: [],
});

export default AppDataSource.initialize();
