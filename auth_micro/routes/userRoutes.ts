import Router from "express";
import UserController from "../controller/UserController";

const router = Router();

router.get("/getUser/:id", UserController.getUser)

export default router;