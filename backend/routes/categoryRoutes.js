import express from 'express'
import {
	addCategory,
	deleteCategory,
	getAllCategories,
} from '../controllers/categoryController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').put(protect, admin, addCategory).get(getAllCategories)
router.route('/:name').delete(protect, admin, deleteCategory)
export default router
