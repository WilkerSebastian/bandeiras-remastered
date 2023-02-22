import { Router } from "express";
import PagesCoontroller from "./controller/PagesCoontroller";
import UsuarioController from "./controller/UsuarioController";
import EmailController from "./controller/EmailController";
import AdminController from "./controller/AdminController";

const router = Router();

router.get("/" , PagesCoontroller.index)
router.get("/termoservico", PagesCoontroller.termo)
router.get("/user/registro", UsuarioController.registro)
router.post("/user/save", UsuarioController.saveUser)
router.get("/email/show/:email", EmailController.show)
router.get("/user/active/:nome", EmailController.emailRegister)
router.get("/admin/list/user/:admin", AdminController.viewUsers)

export default router