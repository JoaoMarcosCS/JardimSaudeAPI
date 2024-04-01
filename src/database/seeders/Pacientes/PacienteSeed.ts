import { fakerPT_BR } from "@faker-js/faker";
import { Paciente } from "../../../entities/Paciente";
import faker from "faker-br"

const pacientes = <Paciente[]>[]

for(let i=0; i<914; i++){
    const paciente = new Paciente();

    paciente.sexo = fakerPT_BR.person.sex();

    (paciente.sexo == "Feminino") 
        ? paciente.nome = fakerPT_BR.person.firstName("female") + " " + fakerPT_BR.person.lastName("female")
        :  paciente.nome = fakerPT_BR.person.firstName("male") + " " + fakerPT_BR.person.lastName("male")
    
    let [_fistrName, _lastName] = paciente.nome.split(" ");
   
    paciente.altura = Number((Math.random() * (2.00 - 1.40) + 1.40).toFixed(2));
    paciente.email = fakerPT_BR.internet.email({firstName: _fistrName, lastName: _lastName});
    paciente.cidade = fakerPT_BR.location.city();
    paciente.cpf = faker.br.cpf()
    paciente.nascimento = fakerPT_BR.date.birthdate({min:5, max:100, mode: 'age'});
    paciente.rua = fakerPT_BR.location.streetAddress(true);
    paciente.telefone = fakerPT_BR.phone.number();
    paciente.uf = fakerPT_BR.location.state({abbreviated:true});

    pacientes.push(paciente);
}

export default pacientes