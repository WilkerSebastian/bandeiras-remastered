import { Router } from "express";
import PagesCoontroller from "./controller/PagesCoontroller";
import UsuarioController from "./controller/UsuarioController";
import EmailController from "./controller/EmailController";
import AdminController from "./controller/AdminController";

const router = Router();

router.get("/" , PagesCoontroller.index)
router.get("/termoservico", PagesCoontroller.termo)

router.get("/user/registro", UsuarioController.registro)
router.get("/user/active/:nome", EmailController.emailRegister)
router.post("/user/save", UsuarioController.saveUser)
router.get("/user/perfil/:id", UsuarioController.perfil)

router.get("/email/show/:email", EmailController.show)

router.get("/admin/list/user/:admin", AdminController.viewUsers)
router.get("/admin/delete/user/:admin/:id", AdminController.deletar)

export default router