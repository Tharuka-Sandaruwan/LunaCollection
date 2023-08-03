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

