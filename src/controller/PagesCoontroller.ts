import {Request, Response} from "express"

class PagesController {

    public index(req:Request, res:Response) {

        res.render("index", {padrao:true})

    }

}

export default new PagesController()