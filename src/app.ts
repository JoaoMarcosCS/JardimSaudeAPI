import { AppDataSource } from "./database/config/data-source";
import { seed } from "./database/seeders/seed";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => console.log(error));

async function makeSeed() {
  await seed()
    .then((response) => console.log("Seed executado!" + response))
    .catch((e) => console.log("Erro feio: " + e));
}

makeSeed();
