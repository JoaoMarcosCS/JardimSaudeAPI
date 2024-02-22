export const getBirthday = (idade: number) => {
  const anoAtual = new Date().getFullYear();

  const nascimento = anoAtual - idade;
  const mesNascimento = Math.floor(Math.random() * 12);

  const ultimoDiaDoMes = new Date(nascimento, mesNascimento + 1, 0).getDate();

  const diaNascimento = Math.floor(Math.random() * ultimoDiaDoMes) + 1;

  const dataNascimento = new Date(nascimento, mesNascimento, diaNascimento);

  return dataNascimento;
};
