import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

//@desc create new order
//@route get/api/overview
//@access private
export const getMonthlyOrders = asyncHandler(async (req, res) => {
	try {
		const today = new Date() // Get the current date
		const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), 1) // Subtract one year from the current date
		const productCount = Product.count()
		const userCount = await User.count()
		const UserRegCount = await User.aggregate([
			{ $match: { createdAt: { $gte: oneYearAgo } } }, // filter users created in the past year
			{
				$group: {
					_id: { $month: '$createdAt' }, // group users by month of creation
					count: { $sum: 1 }, // count the number of users per month
				},
			},
			{
				$project: {
					_id: 0, // exclude the '_id' field from the results
					count: 1, // include the 'count' field in the results
					month: '$_id', // rename '_id' to 'month'
				},
			},
			{
				$sort: {
					month: 1, // sort the results by month in ascending order
				},
			},
		])
		const orders = await Order.find({ createdAt: { $gte: oneYearAgo } })
		console.log(UserRegCount)
		const monthlyCount = {}
		let orderCount = 0
		orders.forEach((order) => {
			orderCount += 1
			const month = order.createdAt.getMonth()
			if (!monthlyCount[month]) {
				monthlyCount[month] = 1
			} else {
				monthlyCount[month] += 1
			}
		})

		const dataOrder = Object.keys(monthlyCount).map((month) => {
			return [
				new Date(0, month).toLocaleString('default', { month: 'long' }),
				monthlyCount[month],
			]
		})

		console.log(UserRegCount)
		const regCount = UserRegCount.map((obj) => [String(obj.month), obj.count])
		res.status(200).json({
			regCount,
			userCount,
			productCount,
			orderCount,
			orderData: [...dataOrder],
		})
	} catch (error) {
		throw new Error(error)
	}
})
