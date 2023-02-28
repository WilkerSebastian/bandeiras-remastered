import { NextFunction, Request, Response } from "express";
import Security from "./Security";
import Usuario from "../model/Usuario";

export async function sessionSettings(req:Request , res:Response , next:NextFunction) {

    res.header('HttpOnly', 'true');

    res.locals.navbar = false
    res.locals.error = false
    res.locals.id = req.cookies["id"]
    
    if (req.cookies["id"]) {

        const id = await Security.decriptografar(req.cookies["id"]);
        const user = await Usuario.listNameAndImgByID(Number(id));

        res.locals.user = user
        

    } else {

        res.locals.user = false

    }

    next()

}