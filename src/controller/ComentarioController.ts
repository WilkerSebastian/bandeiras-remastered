import { Request, Response } from "express";
import Comentario from "../model/Comentario";
import Security from "../assets/Security";
import Usuario from "../model/Usuario";

class ComentarioController {

    public async sendComment(req:Request, res:Response) {

        const id = Number(await Security.decriptografar(req.cookies["id"]))

        if (await Usuario.isAtive(id)) {
         
            const comentario = await Comentario.create(req.body, id)

            await Comentario.save(comentario)

            res.redirect("/");

        }

        const comentarios = await Comentario.listAllCrypto()

        return res.render("index", {navbar:true,comentarios, error: "Usuario precisa estar ativo"})

    }

    public async deletar(req:Request, res:Response) {

        const id = await Security.decriptografar(req.params.id)

        await Comentario.deletar(Number(id))

        res.redirect("/")

    }

}


export default new ComentarioController