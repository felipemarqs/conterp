<h1>Readme - Comandos Docker, Postgres e SQL</h1>

Este readme contém uma lista de comandos úteis para trabalhar com Docker, Postgres e SQL.

<h1>Comandos Docker</h1>

```bash
- docker pull <nome_da_imagem> - Baixa uma imagem
- docker rmi <nome_da_imagem> - Remove uma imagem
- docker ps - Lista os containers rodando
- docker ps -a - Lista todos os containers (incluindo os parados)
- docker run --name <nome_do_container> -e POSTGRES_USER=<usuario> -e POSTGRES_PASSWORD=<senha> -p 5432:5432 -d postgres - Cria um container e utiliza a imagem (As flags -e são variáveis de ambiente)
- docker start <nome_do_container> - Inicia um container
- docker stop <nome_do_container> - Para um container
- docker container rm <nome_do_container> - Deleta um container
- docker exec -it <nome_do_container> bash - Executa um container
```

<h1>Comandos Postgres</h1>
- psql -U <usuario> - Loga no banco de dados utilizando o usuário criado
- \l - Lista as bases de dados
- \c <nome_da_base> - Conecta à base de dados
- \dt - Lista as tabelas na base de dados
