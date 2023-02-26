import { Request, Response } from "express"

class PagesController {

    public async index(req: Request, res: Response) {

        return res.render("index", {navbar:true});
    }

    public async termo(req: Request, res: Response) {

        return res.render("termo")

    }
}

export default new PagesController()