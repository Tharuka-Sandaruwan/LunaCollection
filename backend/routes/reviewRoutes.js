import express from 'express'
import {
	createProductReview,
	createProductReviewByOrder,
	getProductsNotReviewed,
	getProductsReviewed,
	getProductsReviewedByUser,
} from '../controllers/reviewController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/reviewed').get(protect, getProductsReviewed)
router.route('/reviewed/:id').get(protect, admin, getProductsReviewedByUser)
router.route('/notreviewed').get(protect, getProductsNotReviewed)
router.route('/:id').post(protect, createProductReview)
router
	.route('/order/:orderId/product/:id')
	.post(protect, createProductReviewByOrder)

export default router
