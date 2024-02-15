import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://postgres.vjdcspgerjhxzbhoshke:MORkRq83rGhonhOQ@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Databse conneted success!");
  })
  .catch((error) => console.log(error));
