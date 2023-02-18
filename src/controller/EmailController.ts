import { Request, Response } from "express";
import Usuario from "../model/Usuario";
import Security from "../assets/Security";

class EmailController {

    public async emailRegister(req:Request, res:Response) {

        const nome = await Security.decriptografar(req.params.nome)

        const erro = await Usuario.ativar(nome)

        if (erro) {

            return res.render("erro", {padrao:false, error: "Usuario não encontrado!"})
            
        }

        return res.render("emailshow", {padrao:false, result: "Conta ativada com sucesso"})

    }

    public async show(req:Request, res:Response) {

        return res.render("emailshow", {padrao:false, result:`Acesse seu email ${req.params.email}, para ativar sua conta`})

    }

}

export default new EmailController()