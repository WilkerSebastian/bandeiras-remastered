import {Request, Response} from "express"
import Usuario from "../model/Usuario"
import db from "../database/connection"
import Security from "../assets/Security"
import EmailManeger from "../assets/EmailManeger"

class UsuarioController {

    public async registro(req:Request, res:Response) {

        return res.render("registro", {padrao:false, login:false, erro:false})

    }

    public async saveUser(req:Request, res:Response) {

        let user = await Usuario.create(req.body)

        if (Number((await Usuario.countByNome(req.body.nome) as any[])[0].count) <= 0) {
            
            user = await Usuario.save(user) as Usuario

            console.log(user)

            req.session.username = await Security.criptografar(req.body.nome)

            const emailManeger = new EmailManeger()

            emailManeger.sendEmail(req.protocol + "://" + req.get("host") + "/user/active/", {nome:req.session.username,email:user.email})
 
            return res.redirect(`/email/show/${user.email}`)

        }
        
        return res.render("registro", {padrao:false, login:false, erro:"nome ja está sendo usado"})

    }

}

export default new UsuarioController()