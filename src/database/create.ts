import db from "./connection"
import { resolve } from "path"
import {readFileSync} from "fs"

async function create() {

    try {

        const usuario = readFileSync(resolve("./src/database/sql/usuario.sql")).toString("utf-8")
        const comentario = readFileSync(resolve("./src/database/sql/comentario.sql")).toString("utf-8")

        await db.query(usuario)
        await db.query(comentario)

        console.log("tabelas criadas com sucesso");
        
    } catch (error) {

        console.log("erro ao criar tabelas! " + error);
        
    }

    return

}

create()