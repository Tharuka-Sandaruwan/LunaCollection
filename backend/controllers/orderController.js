import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
//@desc create new order
//@route Post/api/orders
//@access private


//@desc get all orders of a user by admin
//@route GET/api/orders/user/:id
//@access private/admin
const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.params.id })
		.sort({ delivery: 1 })
		.sort({ createdAt: -1 })
	res.status(200).json(orders)
})

//@desc get all orders
//@route GET/api/orders/
//@access private /Admin
const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find()
		.populate({
			path: 'user',
			select: '_id email',
		})
		.sort({ delivery: 1 })
		.sort({ shipping: 1 })
		.sort({ createdAt: -1 })
	res.status(200).json(orders)
})

export {
	getAllOrders,
	getUserOrders,
}
