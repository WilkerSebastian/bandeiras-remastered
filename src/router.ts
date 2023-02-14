import { Router } from "express";
import PagesCoontroller from "./controller/PagesCoontroller";

const router = Router();

router.get("/" , PagesCoontroller.index)

export default router