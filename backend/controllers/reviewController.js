import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Get all the products reviewed by user
//@route GET/api/review/products/reviewed/
//@access Private
export const getProductsReviewed = asyncHandler(async (req, res) => {
	const reviewedProducts = await Product.find({
		'reviews.user': req.user._id,
	})
	res.json(reviewedProducts)
})
//@desc Get all the products reviewed by a user
//@route GET/api/review/products/reviewed/:id
//@access Private/admin
export const getProductsReviewedByUser = asyncHandler(async (req, res) => {
	const reviewedProducts = await Product.find({
		'reviews.user': req.params.id,
	})
	res.json(reviewedProducts)
})
//@desc Get all the products not reviewed by user
//@route GET/api/review/products/notreviewed/
//@access Private
export const getProductsNotReviewed = asyncHandler(async (req, res) => {
	const OrderedProducts = await Order.distinct('orderItems.product', {
		user: req.user._id,
		completed: true,
	})
	const reviewedProducts = await Product.find({
		'reviews.user': req.user._id,
	})
	const reviewedProductIds = reviewedProducts.map((pro) => pro._id.toString())

	const notOrderedProductIds = OrderedProducts.filter(
		(productID) => !reviewedProductIds.includes(productID.toString())
	)
	const products = await Product.find({ _id: notOrderedProductIds })
	res.json(products)
})
//@desc Create new review
//@route PUT/api/reviews/:id
//@access private
export const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body
	const product = await Product.findById(req.params.id)
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)
		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Product already reviewed')
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}
		product.reviews.push(review)
		product.numReviews = product.reviews.length
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length
		await product.save()
		res.status(201).json('Review added')
	}
})

//@desc Create new review from order
//@route PUT/api/revieworder/:id/reviews
//@access private
export const createProductReviewByOrder = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body
	const order = await Order.findById(req.params.orderId)
	const product = await Product.findById(req.params.id)
	if (product && order) {
		const alreadyReviewed = order.orderItems.find(
			(item) => item.product.toString() === req.params.id && item.reviewed
		)
		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Product already reviewed for this order')
		}
		const review = {
			name: req.user.name,
			orderID: req.params.orderId,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}
		product.reviews.push(review)
		product.numReviews = product.reviews.length
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length
		await product.save()
		order.orderItems = order.orderItems.map((item) => {
			if (item.product.toString() === req.params.id) {
				const updatedItem = { ...item, reviewed: true }
				return updatedItem
			} else {
				return item
			}
		})
		await order.save()
		res.status(201).json('Review added')
	}
})
