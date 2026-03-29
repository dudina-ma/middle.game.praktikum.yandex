import { authController } from './../controllers/authController'
import { Router } from 'express'

const router = Router()

router.use('/verify', authController.verify)

export default router
