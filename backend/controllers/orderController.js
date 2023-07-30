import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
//@desc create new order
//@route Post/api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
	try {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			shippingPrice,
			totalPrice,
			paymentResult,
		} = req.body
		if (orderItems && orderItems.length === 0) {
			res.status(400)
			throw new Error('No order Items')
		} else {
			const order = new Order({
				user: req.user._id,
				orderItems,
				shippingAddress,
				paymentMethod,
				shippingPrice,
				totalPrice,
				paymentResult,
			})
			const createdOrder = await order.save()
			orderItems.map((item) => {
				Product.findById(item.product).then((product) => {
					product.countInStock = product.countInStock - item.qty
					product.save()
				})
			})
			const resorder = await Order.findById(createdOrder._id)
			res.status(201).json(resorder)
		}
	} catch (error) {
		throw new Error('Failed to create Order ' + error)
	}
})

//@desc get order by ID
//@route Post/api/orders/:id
//@access private
const getOrderByID = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)
	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})
//@desc Update order to Shipped
//@route Post/api/orders/:id/ship
//@access private/Admin
const updateOrderToShipped = asyncHandler(async (req, res) => {
	Order.updateOne(
		{ _id: req.params.id },
		{ shipping: { isShipped: true, shippedAt: new Date() } }
	).then(
		(data) =>
			Order.findById(req.params.id).then((responsedata) =>
				res.json(responsedata)
			),
		(err) => {
			throw new Error(err)
		}
	)
})
//@desc Update order to delivered
//@route Post/api/orders/:id/deliver
//@access private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
	if (JSON.stringify(order.user) === JSON.stringify(req.user._id)) {
		Order.updateOne(
			{ _id: req.params.id },
			{
				delivery: { isDelivered: true, deliveredAt: new Date() },
				completed: true,
			}
		).then(
			(data) =>
				Order.findById(req.params.id).then((responsedata) =>
					res.json(responsedata)
				),
			(err) => {
				throw new Error(err)
			}
		)
	} else {
		throw new Error('Requster is not allowed to make the update')
	}
})


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
	addOrderItems,
	getOrderByID,
	updateOrderToDelivered,
	getMyOrders,
	getAllOrders,
	updateOrderToShipped,
	getUserOrders,
}
