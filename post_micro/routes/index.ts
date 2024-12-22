import Router from 'express';
import PostRoutes from './postRoutes';

const router = Router()

router.use("/api", PostRoutes)

export default router