import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import { getMonthlyOrders } from '../controllers/overviewController.js'

const router = express.Router()

router.route('/').get(protect, admin, getMonthlyOrders)

export default router
