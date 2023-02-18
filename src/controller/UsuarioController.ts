import {Request, Response} from "express"
import Usuario from "../model/Usuario"
import db from "../database/connection"
import aesjs from "aes-js"
import { randomBytes } from "crypto"

declare module 'express-session' {
    interface SessionData {
      username:string;
    }
}

class UsuarioController {

    public async registro(req:Request, res:Response) {

        return res.render("registro", {padrao:false, login:false, erro:false})

    }

    public async saveUser(req:Request, res:Response) {

        const user = await Usuario.create(req.body)

        if (this.validacao(user)) {
            
            await Usuario.save(user)

            req.session.username = this.criptografar(user.nome)

            res.redirect("/")

        }
        
        return res.render("registro", {padrao:false, login:false, erro:"nome ja está sendo usado"})

    }

    private criptografar(conteudo:string) {

        const key = Buffer.from(process.env.KEY as string) || randomBytes(32)

        const iv = Buffer.from(process.env.IV as string) || randomBytes(16)

        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));

        const countBytes = aesjs.utils.utf8.toBytes(conteudo)

        return aesjs.utils.hex.fromBytes(aesCtr.encrypt(countBytes))

    }

    private validacao(user:Usuario) {

        db.query(`SELECT COUNT(*) FROM Usuario WHERE nome = ${user.nome}`)
        .then(result => {

            return result.rows[0].count <= 0

        })
        .catch(err =>{

            console.log(err.toString());

        })
    
        return false

    }

}

export default new UsuarioController()