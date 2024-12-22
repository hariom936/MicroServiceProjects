import Router from "express";
import PostController from "../controller/PostController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.get("/post", PostController.index )
router.post("/post/store",authMiddleware, PostController.store )

export default router;