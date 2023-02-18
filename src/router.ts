import { Router } from "express";
import PagesCoontroller from "./controller/PagesCoontroller";
import UsuarioController from "./controller/UsuarioController";

const router = Router();

router.get("/" , PagesCoontroller.index)
router.get("/termoservico", PagesCoontroller.termo)
router.get("/user/registro", UsuarioController.registro)
router.post("/user/save", UsuarioController.saveUser)

export default router