# Safe Track Backend
> By ILAB CUCEI


## Running requeriments
* [BunJS](https://bun.sh) - Next gen Javascript/Typescript runtime

## Setting enviroment
1. Copy the `.env.example` file to `.env`, fill the variables
  * `DATABASE_URL`: The connection string 
  * `TOKEN_SECRET`: The key for jwt encryption
  * `RESEND_API_KEY`: Resend email service JWT key
  * `RESEND_DOMAIN`: Domain for sending emails, this has to be linked to API KEY.
  * `PORT`: _[Optional]_ The server port
2. Install deps:
```bash
bun install
```
3. Generate database models and migrations on database
> This step is only required if you are using a new database. Only postgres are allowed in this moment
```bash
bun database:dev
```
> On production env you need to use `database:prod`

## Running
To start the server you need to use the following command:
```bash
bun start
```

This will open a server in the port `3000` if didn't set a port in the enviroment setup.

More info here -> [**API DOCS**](./docs/index.md)
