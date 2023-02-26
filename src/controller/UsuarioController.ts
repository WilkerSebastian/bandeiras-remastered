import {Request, Response} from "express"
import Usuario from "../model/Usuario"
import Security from "../assets/Security"
import EmailManeger from "../assets/EmailManeger"
import {readFileSync, unlinkSync} from "fs"
import { resolve } from "path"

class UsuarioController {

    public async registro(req:Request, res:Response) {

        return res.render("registro", {login:false, erro:false})

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
        
        return res.render("registro", {login:false, erro:"nome ja está sendo usado"})

    } 

    public async perfil(req:Request, res:Response) {

        const id = Number(await Security.decriptografar(req.params.id))

        const usuario = await Usuario.listByID(id)

        return res.render("perfil", {usuario})

    }

    public async put(req:Request, res:Response) {

        
        const path = resolve(`./src/uploads/${req.params.id}.jpg`)
 
        const id = Number(await Security.decriptografar(req.params.id))

        let imagem = readFileSync(path)

        unlinkSync(path)

        await Usuario.updateImage(id, imagem)

        return res.redirect("/")

    }

    public async update(req:Request, res:Response) {

        if (Number((await Usuario.countByNome(req.body.nome) as any[])[0].count) <= 0) {

            const id = Number(await Security.decriptografar(req.params.id))
            
            const user = await Usuario.create(req.body);

            Usuario.updateNomeAndEmail(id , user)

            return res.redirect("/")

        }

        return res.redirect("/user/perfil/" + req.params.id)

    }

    public async logout(req:Request, res:Response) {

        res.clearCookie("id")

        return res.redirect("/")

    }

}

export default new UsuarioController()