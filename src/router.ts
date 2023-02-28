import { Router } from "express";
import PagesCoontroller from "./controller/PagesCoontroller";
import UsuarioController from "./controller/UsuarioController";
import EmailController from "./controller/EmailController";
import AdminController from "./controller/AdminController";
import upload from "./assets/upload";
import ComentarioController from "./controller/ComentarioController";

const router = Router();

router.get("/" , PagesCoontroller.index)
router.get("/termoservico", PagesCoontroller.termo)

router.get("/user/registro", UsuarioController.registro)
router.get("/user/active/:nome", EmailController.emailRegister)
router.get("/user/perfil/:id", UsuarioController.perfil)
router.get("/user/logout", UsuarioController.logout)
router.get("/user/login", UsuarioController.login)
router.post("/user/action/login", UsuarioController.actionLogin)
router.post("/user/save", UsuarioController.saveUser)
router.post("/user/put/image/:id", upload.single("imagem") , UsuarioController.put)
router.post("/user/update/:id", UsuarioController.update)

router.get("/comentario/deletar/:id", ComentarioController.deletar);
router.post("/comentario/send", ComentarioController.sendComment);

router.get("/email/show/:email", EmailController.show)
 
router.get("/admin/list/user/:admin", AdminController.viewUsers)
router.get("/admin/delete/user/:admin/:id", AdminController.deletar)

export default router 