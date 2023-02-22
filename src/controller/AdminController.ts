import { Request, Response } from "express";

class AdminController {

    public async viewUsers(req:Request, res:Response) {

        if (process.env.ADMIN == req.params.admin) {
        
            return res.render("erro", {padrao:false, error:"Token de administrador invalido", id:false})

        } 

        return res.render("adminShow", {padrao:false, id:false})

    }

}

export default new AdminController()