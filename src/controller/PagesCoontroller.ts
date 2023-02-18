import {Request, Response} from "express"

class PagesController {

    public async index(req:Request, res:Response) {

        return res.render("index", {padrao:true})

    }

    public async termo(req:Request, res:Response) {

        return res.render("termo" , {padrao:false})

    }

}

export default new PagesController()