import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

import {
	authUser,
	deleteUser,
	getAllUsers,
	getUserByID,
	getUserProfile,
	registerUser,
	updateUser,
	updateUserProfile,
} from '../controllers/userController.js'

router.post('/login', authUser)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)
router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserByID)
	.put(protect, admin, updateUser)
export default router
