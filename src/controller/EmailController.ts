import { Request, Response } from "express";
import Usuario from "../model/Usuario";
import Security from "../assets/Security";

class EmailController {

    public async emailRegister(req:Request, res:Response) {

        const nome = await Security.decriptografar(req.params.nome)

        const erro = await Usuario.ativar(nome)

        if (erro) {

            if (req.cookies["id"]) {
                try {
                    const id = await Security.decriptografar(req.cookies["id"]);
                    const e = await Usuario.listNameAndImgByID(Number(id));
                    let user = {
                        nome: e?.nome as string,
                        imagem: e?.encode as string,
                    };
                    return res.render("erro", {padrao:false, error: "Usuario não encontrado!", id:req.cookies["id"], user:user})
                } catch (error) {
                    console.error(error);
                    return res.render("erro", { padrao: true, error: "Usuario não encontrado!" ,id:req.cookies["id"]});
                }
            }
            
        }

        if (req.cookies["id"]) {
            try {
                const id = await Security.decriptografar(req.cookies["id"]);
                const e = await Usuario.listNameAndImgByID(Number(id));
                let user = {
                    nome: e?.nome as string,
                    imagem: e?.encode as string,
                };
                return res.render("emailshow", {padrao:false, result: "Conta ativada com sucesso", id:req.cookies["id"], user:user})
            } catch (error) {
                console.error(error);
                return res.render("emailshow", {padrao:false, result: "Conta ativada com sucesso", id:req.cookies["id"]})
            }
        }

    }

    public async show(req:Request, res:Response) {

        if (req.cookies["id"]) {
            try {
                const id = await Security.decriptografar(req.cookies["id"]);
                const e = await Usuario.listNameAndImgByID(Number(id));
                let user = {
                    nome: e?.nome as string,
                    imagem: e?.encode as string,
                };
                return res.render("emailshow", {padrao:false, result: "Conta ativada com sucesso", id:req.cookies["id"], user:user})
            } catch (error) {
                console.error(error);
                return res.render("emailshow", {padrao:false, result: "Conta ativada com sucesso", id:req.cookies["id"]})
            }
        }

    }

}

export default new EmailController()