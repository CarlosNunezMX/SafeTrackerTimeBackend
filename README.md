# Safe Track Backend
> By ILAB CUCEI


## Running requeriments
* [BunJS](https://bun.sh) - Next gen Javascript/Typescript runtime

## Setting enviroment
1. Copy the `.env.example` file to `.env`, fill the variables
  * `DATABASE_URL`: The connection string 
  * `TOKEN_SECRET`: The key for jwt encryption
  * `PORT`: [Optional] The server port
2. Install deps:
```bash
bun install
```
3. Generate database models and migrations on database
> This step is only required if you are using a new database. Only postgres are allowed in this moment
```bash
bun database:init
```

## Running
To start the server you need to use the following command:
```bash
bun start
```

This will open a server in the port `3000` if didn't set a port in the enviroment setup.

More info here -> [**API DOCS**](./docs/index.md)
