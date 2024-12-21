import Router from "express";
import AuthController from "../controller/AuthController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router()

router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)

//Private Routes
router.get("/auth/user",authMiddleware, AuthController.user)

export default router;