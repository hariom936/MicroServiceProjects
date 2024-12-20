import Router from 'express'
import AuthRoutes from './authRoutes';

const router = Router()

router.use("/api",AuthRoutes)

export default router