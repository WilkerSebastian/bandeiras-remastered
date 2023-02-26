import { Request, Response } from "express";
import Usuario from "../model/Usuario";
import Security from "../assets/Security";

class EmailController {

    public async emailRegister(req:Request, res:Response) {

        const nome = await Security.decriptografar(req.params.nome)

        const erro = await Usuario.ativar(nome)

        if (erro) {
                    
            return res.render("erro", {error: "Usuario não encontrado!"});

        }

        return res.render("emailshow", {result: "Conta ativada com sucesso"})

    }

    public async show(req:Request, res:Response) {

        return res.render("emailshow", {result: "Acesse seu email para terminar seu registro"})

    }

}

export default new EmailController()