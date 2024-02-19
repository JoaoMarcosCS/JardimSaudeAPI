export default function gerarDataHorarioAleatorios() {
  const dataAtual = new Date();

  const anoAtual = dataAtual.getFullYear();

  const mesAleatorio = Math.floor(Math.random() * 12);

  const diasNoMes = new Date(anoAtual, mesAleatorio + 1, 0).getDate();

  const diaAleatorio = Math.floor(Math.random() * diasNoMes) + 1;

  const horaAleatoria = Math.floor(Math.random() * 24);

  const minutoAleatorio = Math.floor(Math.random() * 60);

  dataAtual.setFullYear(anoAtual, mesAleatorio, diaAleatorio);
  dataAtual.setHours(horaAleatoria, minutoAleatorio, 0, 0);

  return dataAtual;
}
