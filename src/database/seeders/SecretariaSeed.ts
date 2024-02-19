import { Usuario } from "../../entities/Usuario";
import { hash } from "bcrypt";

const secretariasSeedValues = [
  { name: "Joana Vasconcelos", email: "joana.vasconcelos@gmail.com" },
  { name: "Joao Marcos", email: "jmcsjoaomarcos@gmail.com" },
  { name: "Tatiana Carina", email: "tatianacarina@gmail.com" },
];

const SecretariasSeed = async () => {
  const secretarias = <Usuario[]>[];
  for (let i = 0; i < 3; i++) {
    const secretaria = new Usuario();
    secretaria.name = secretariasSeedValues[i].name;
    secretaria.email = secretariasSeedValues[i].email;
    secretaria.senha = await hash(
      `${secretaria.name.replace(" ", "")}12345`,
      10,
    );
    secretaria.idade = Math.floor(Math.random() * 20) + 20;
    secretaria.salario = Number(
      (Math.random() * (4000 - 3000) + 3000).toFixed(2),
    );
    secretaria.pagamento = [];
    secretaria.id = i + 1;
    secretaria.nivel = 1;
    secretarias.push(secretaria);
  }

  return secretarias;
};

export default SecretariasSeed;
