# Jedi

## Tecnologias usadas

- FastApi
- Angular
- Postgres
- Docker

## Executando o projeto

### Sem docker

#### API

Executando sem o docker o banco usado será o Sqlite

Primeiro **acesse a pasta** `api` e instale as dependencias para executar o projeto:

```shell

cd api
pip install -r requirements.txt
```

Execute o projeto:

```shell
uvicorn main:app --reload
```

A api rodará na porta 8000 e pode ser [acessada](http://localhost:8000/) e possível ver a [documentação](http://localhost:8000/docs) gerada automaticamente pelo FastApi com base nos schemas

#### Web

Agora **na pasta** `web`:

```shell

cd web
npm i
npm run start
```

A aplicação [frontend](http://localhost:4200/) em angular usa a porta 4200

### Com docker

copiar o `.env.example`:

```shell
cat .env.example > .env
```

A aplicação irá usar o Postgres

```shell
docker-compose up && docker-compose rm -fvs
```
