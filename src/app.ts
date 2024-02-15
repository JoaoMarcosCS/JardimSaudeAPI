import { AppDataSource } from "./database/config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => console.log(error));
