import { Request, Response } from "express";
import Usuario from "../model/Usuario";

class AdminController {

    public async viewUsers(req:Request, res:Response) {
        
        if (process.env.ADMIN != req.params.admin) {

            return res.render("erro", {padrao:false, error:"Token de administrador invalido", id:false})

        } 

        const usuarios = await Usuario.listUser()

        return res.render("adminShow", {padrao:false, id:false, admin:process.env.ADMIN , usuarios})

    }

    public async deletar(req:Request, res:Response) {

        if (req.params.admin != process.env.ADMIN) {

            return res.render("erro", {padrao:false, error:"Token de administrador invalido", id:false})
            
        }

        const id = Number(req.params.id)

        await Usuario.delete(id)

        return res.redirect(`/admin/list/user/${process.env.ADMIN}`)

    }

}

export default new AdminController()