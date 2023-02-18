import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express, { urlencoded, json } from "express";
import { resolve } from "path"
import ejs from "express-ejs-layouts"
import session from "express-session"
import router from './router';

const PORT = process.env.PORT || 8080

const production = process.env.NODE_ENV as string == "production"

const DIR = production ? "build" : "src"

const app = express();

app.use(session({
    secret: process.env.SECRET || "wilkervondeveloper",
    resave: false,
    saveUninitialized: true
}));

app.use(urlencoded({extended:true}))
app.use(json())

app.use(ejs)
app.set('views', resolve(`./${DIR}/views`));
app.set('view engine', 'ejs');

app.use(router)

app.use("/jquery", express.static(resolve("./node_modules/jquery/dist")))
app.use("/bootstrap", express.static(resolve("./node_modules/bootstrap/dist")))
app.use("/bs-icons", express.static(resolve("./node_modules/bootstrap-icons/font")))
app.use("/public", express.static(resolve(`./${DIR}/public`)))

app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}, em modo ${process.env.NODE_ENV}`))