import Router from 'express'
import AuthRoutes from './authRoutes';
import UserRoutes from './userRoutes';

const router = Router()

router.use("/api",AuthRoutes, UserRoutes)

export default router