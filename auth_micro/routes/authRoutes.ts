import Router from "express";
import AuthController from "../controller/AuthController";

const router = Router()

router.post("/auth/register", AuthController.register)

export default router;