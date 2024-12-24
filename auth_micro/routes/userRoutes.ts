import Router from "express";
import UserController from "../controller/UserController";

const router = Router();

router.get("/getUser/:id", UserController.getUser)
router.post("/getUser/", UserController.getUsers)

export default router;