# Jedi

## Tecnologias usadas

* FastApi
* Angular
* Postgres
* Docker

## Executando o projeto

### Sem docker

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

### Com docker

A aplicação irá usar o Postgres

```shell
docker-compose up && docker-compose rm -fvs
```
