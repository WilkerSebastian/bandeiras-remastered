import {Request, Response} from "express"
import Usuario from "../model/Usuario"
import db from "../database/connection"
import Security from "../assets/Security"
import EmailManeger from "../assets/EmailManeger"

class UsuarioController {

    public async registro(req:Request, res:Response) {

        return res.render("registro", {padrao:false, login:false, erro:false, id:req.cookies["id"]})

    }

    public async saveUser(req:Request, res:Response) {

        let user = await Usuario.create(req.body)

        if (Number((await Usuario.countByNome(req.body.nome) as any[])[0].count) <= 0) {
            
            user = await Usuario.save(user) as Usuario

            res.cookie("id" , await Security.criptografar(user.id.toString()))

            const emailManeger = new EmailManeger()

            emailManeger.sendEmail(req.protocol + "://" + req.get("host") + "/user/active/", {nome: await Security.criptografar(req.body.nome),email:user.email})
 
            return res.redirect(`/email/show/${user.email}`)

        }
        
        if (req.cookies["id"]) {
            try {
                const id = await Security.decriptografar(req.cookies["id"]);
                const e = await Usuario.listNameAndImgByID(Number(id));
                let user = {
                    nome: e?.nome as string,
                    imagem: e?.encode as string,
                };
                return res.render("registro", {padrao:false, login:false, erro:"nome ja está sendo usado", id:req.cookies["id"], user:user})

            } catch (error) {
                console.error(error);
                return res.render("registro", {padrao:false, login:false, erro:"nome ja está sendo usado", id:req.cookies["id"]})

            }
        }

    } 

}

export default new UsuarioController()