import { AuditoriaHospital } from "../../../entities/AuditoriaHospital";
import { Medicamento } from "../../../entities/Medicamento";
import { Operacao } from "../../../enums/auditoriaOpercoes";
import { medicamentosData } from "./data/MedicamentosData";

const auditoriasCompraMedicamentos: AuditoriaHospital[] = [];
const medicamentos: Medicamento[] = [];

for (let i = 0; i < medicamentosData.length; i++) {
  const medicamento = new Medicamento();
  medicamento.nome = medicamentosData[i].nome;
  medicamento.descricao = medicamentosData[i].descricao;
  medicamento.peso = medicamentosData[i].peso;
  medicamento.quantidade = medicamentosData[i].quantidade;
  medicamento.valor_unitario = medicamentosData[i].valor_unitario;
  medicamento.tipo = medicamentosData[i].tipo;
  medicamento.codigo = medicamentosData[i].codigo

  const auditoriaCompraMedicamento = new AuditoriaHospital();

  auditoriaCompraMedicamento.data = new Date();
  auditoriaCompraMedicamento.medicamento = medicamento;
  auditoriaCompraMedicamento.quantidade = medicamento.quantidade;
  auditoriaCompraMedicamento.tipoOperacao = Operacao.Compra;
  auditoriaCompraMedicamento.valor_transacao =
    medicamento.quantidade * medicamento.valor_unitario;

  medicamento.historico_compras = [auditoriaCompraMedicamento];

  auditoriasCompraMedicamentos.push(auditoriaCompraMedicamento);
  medicamentos.push(medicamento);
}

export { auditoriasCompraMedicamentos, medicamentos };
