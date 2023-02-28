import { Request, Response } from "express"
import Comentario from "../model/Comentario";

class PagesController {

    public async index(req: Request, res: Response) {

        const comentarios = await Comentario.listAllCrypto()

        return res.render("index",{comentarios, navbar:true});
    }

    public async termo(req: Request, res: Response) {

        return res.render("termo")

    }
}

export default new PagesController()