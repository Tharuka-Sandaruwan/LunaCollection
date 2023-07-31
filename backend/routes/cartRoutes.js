import express from 'express'
import {
	addNewCart,
	addNewItemToCart,
	getCart,
	removeItemFromCart,
} from '../controllers/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//@access private
//@Route GET/api/cart/getcart
//@Desc
router.route('/getcart').get(protect, getCart)

//@access private
//@Route POST/api/cart/newcart
//@Desc
router.route('/newcart').post(protect, addNewCart)
//@access private
//@Route PUT/api/cart/additem
//@Desc
router.route('/additem').put(protect, addNewItemToCart)
//@access private
//@Route PUT/api/cart/dropitem
//@Desc
router.route('/dropitem').put(protect, removeItemFromCart)

export default router
