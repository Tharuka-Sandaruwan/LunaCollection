import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

import {
	addOrderItems,
	getAllOrders,
	getMyOrders,
	getOrderByID,
	getUserOrders,
	updateOrderToDelivered,
	updateOrderToShipped,
} from '../controllers/orderController.js'
//@Route api/orders

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/user/:id').get(protect, getUserOrders)
router.route('/deliver/:id').get(protect, updateOrderToDelivered)
router.route('/ship/:id').get(protect, admin, updateOrderToShipped)
router.route('/:id').get(protect, getOrderByID)

export default router
