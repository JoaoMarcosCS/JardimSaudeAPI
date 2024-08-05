[NODEJS_BADGE]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express
[POSTGRES_BADGE]:https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[JSONWEBTOKEN_BADGE]:https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[ZOD_BADGE]:https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white
[SUPABSE_BADGE]:https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[VERCEL_BADGE]:https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white


<h1 align="center" style="font-weight: bold;">Jardim Saúde API</h1>

![NodeJS][NODEJS_BADGE]
![Typescript][TYPESCRIPT__BADGE]
![Express][EXPRESS__BADGE]
![Jwt][JSONWEBTOKEN_BADGE]
![Zod][ZOD_BADGE]
![Postgres][POSTGRES_BADGE]
![Supabase][SUPABSE_BADGE]
![Vercel][VERCEL_BADGE]

<p align="center">
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<h2 id="about">📖 Sobre o Jardim Saúde</h2>
O projeto Jardim Saúde é um MVP de uma clínica de saúde com dois tipos de usuários
com diferentes níveis de acesso(
     <a href="https://jardim-saude-doc.vercel.app/#secretarias">secretária</a> 
     e
    <a href="https://jardim-saude-doc.vercel.app/#medicos">médico</a>
    ). Clique e veja a documentação das features do <a href="https://jardim-saude-doc.vercel.app/">Jardim Saúde</a>. Eu desenvolvi esse MVP com o objetivo de consolidar meus conhecimentos nos ambientes de frontend e backend. 

<h2 id="api">🖥️ Sobre a API</h2>
A api foi desenvolvida em NodeJS, utilizando express, zod para as validações, jwt para autenticação e autorização, postgres como base de dados e typeorm como orm. A base de dados é armazenada no supabase e a API foi hospedada na Vercel. Foi utilizada a arquitetura de package by layer, o que percebi mais para o final do desenvolvimento que não foi muito escalável, diferente do frontend que foi construido com package by feature. Ademais, a produção dessa API consolidou meus conhecimentos no ambiente de backend,
tendo um aprimoramento da construção de apis e separação de responsabilidades nos microserviços. O que poderia ser aprimorado ainda mais nessa API é a implementação de teste, já que a API foi testada usando o postman, criar uma documentação dos endpoints com o swagger e adicionar paginação para o banco de dados, embora seja uma quantidade muito pequena de registros. 

<h2 id="started">🚀 Como rodar</h2>
<p align="left">
  <b>Caso queira rodar localmente</b>
</p>

<h3>Clone o repositório</h3>

```bash
git clone https://github.com/JoaoMarcosCS/JardimSaudeAPI.git
```

<h3>Instale as dependências</h3>

```bash
npm i
```

<h3>Variáveis de ambiente</h3>
<p align="left">
  <b>Já estão no arquivo .env, não precisam ser configuradas, embora em um projeto real isso não deve ser feito de maneira alguma.</b>
</p>

<h3>Iniciando o projeto</h3>

Depois de instalado todas as dependências, rode o seguinte comando no diretório root:

```bash
npm run dev
``````

<h2 id="endpoints">📍 API Endpoints</h2>

Aqui está o link do postman com os endpoints de todas as entidades do Jardim Saúde.
https://www.postman.com/cryosat-pilot-65657988/workspace/jardim-sade-api
​

<h2 id="colab">🤝 Colaborados</h2>

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/86919788?s=400&u=73dc71cd30d55a2a6992434df0fbd0c2bd877298&v=4" width="100px;" alt="João Marcos Profile Picture"/><br>
        <sub>
          <b>João Marcos</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
