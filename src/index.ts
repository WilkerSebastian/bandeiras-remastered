import * as dotenv from 'dotenv'
dotenv.config()
import { resolve } from 'path';
import express, { urlencoded, json } from "express";
import ejs from "express-ejs-layouts"
import router from './router';
import cookieParser from 'cookie-parser';
import {sessionSettings} from './assets/sessionSettings';
import helmet from 'helmet';
import db from "./database/connection"

process.env.ADMIN = process.env.ADMIN ?? "devadmin"

const PORT = parseInt(process.env.PORT as string) || 8080

const production = process.env.NODE_ENV as string == "production"

const DIR = production ? "build" : "src"

const app = express();

app.use(cookieParser(process.env.SECRET || "wilkerdeveloper"));

app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: http: data:"]
      }
    })
)

app.use(sessionSettings)

app.use(urlencoded({ extended: true }))
app.use(json())

app.use(ejs)
app.set('views', resolve(`./${DIR}/views`));
app.set('view engine', 'ejs');

app.use("/jquery", express.static(resolve("./node_modules/jquery/dist")))
app.use("/bootstrap", express.static(resolve("./node_modules/bootstrap/dist")))
app.use("/bootstrapicons", express.static(resolve("./node_modules/bootstrap-icons/font")))
app.use("/public", express.static(resolve(`./${DIR}/public`)))

app.use(router)

async function testeConexao() {

  await db.connect().then(() => {

    console.log("banco conectado!");

  })
  .catch(err => console.log(err.toString()))

}

testeConexao()

app.listen(PORT, () => {
  
  console.log(`servidor rodando na porta ${PORT}, em modo ${process.env.NODE_ENV}`)

})