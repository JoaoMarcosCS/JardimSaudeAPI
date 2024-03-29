import { Paciente } from "../../../entities/Paciente";
import { pacientesData } from "./data/PacienteData";

const pacientes = <Paciente[]>[]
const cpfVistos = {};

for(let i=0; i<pacientesData.length; i++){
    const paciente = new Paciente();
    const cpf = pacientesData[i].cpf;

    if (cpfVistos[cpf]) {
        continue;
    }
    
    cpfVistos[cpf] = true;
    paciente.altura = pacientesData[i].altura
    paciente.bairro = pacientesData[i].bairro
    paciente.cidade = pacientesData[i].cidade
    paciente.cpf = pacientesData[i].cpf
    paciente.email = pacientesData[i].email
    paciente.nascimento = pacientesData[i].nascimento
    paciente.nome = pacientesData[i].nome
    paciente.rua = pacientesData[i].rua
    paciente.sexo = pacientesData[i].sexo
    paciente.telefone = pacientesData[i].telefone
    paciente.uf = pacientesData[i].uf

    pacientes.push(paciente);
}

export default pacientes