import { Request, Response } from "express"
import Usuario from "../model/Usuario"
import Security from "../assets/Security"

class PagesController {

    public async index(req: Request, res: Response) {

        if (req.cookies["id"]) {
            try {
                const id = await Security.decriptografar(req.cookies["id"]);
                const e = await Usuario.listNameAndImgByID(Number(id));
                let user = {
                    nome: e?.nome as string,
                    imagem: e?.encode as string,
                };
                return res.render("index", { padrao: true, id: req.cookies["id"], user: user });
            } catch (error) {
                console.error(error);
                return res.render("index", { padrao: true, id: false });
            }
        }

        return res.render("index", { padrao: true, id: false });
    }

    public async termo(req: Request, res: Response) {

        if (req.cookies["id"]) {
            try {
                const id = await Security.decriptografar(req.cookies["id"]);
                const e = await Usuario.listNameAndImgByID(Number(id));
                let user = {
                    nome: e?.nome as string,
                    imagem: e?.encode as string,
                };
                return res.render("termo", { padrao: true, id: req.cookies["id"], user: user });
            } catch (error) {
                console.error(error);
                return res.render("termo", { padrao: true, id: false });
            }
        }

        return res.render("termo", { padrao: false, id: req.cookies["id"] })

    }

}

export default new PagesController()