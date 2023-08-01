import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Category from '../models/categoriesModel.js'

//@desc Fetch all products
//@route Get/api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 8
	const page = Number(req.query.pageNumber) || 1
	const category = req.query.category
		? await Category.findOne({
				name: { $regex: req.query.category, $options: 'i' },
		  })
		: ''
	const filter =
		req.query.keyword && req.query.category
			? {
					name: { $regex: req.query.keyword, $options: 'i' },
					category: String(category._id),
					price: {
						$gte: parseInt(req.query.range1),
						$lt: parseInt(req.query.range2),
					},
			  }
			: req.query.category
			? {
					category: String(category._id),
					price: {
						$gte: parseInt(req.query.range1),
						$lt: parseInt(req.query.range2),
					},
			  }
			: req.query.keyword
			? {
					name: { $regex: req.query.keyword, $options: 'i' },
					price: {
						$gte: parseInt(req.query.range1),
						$lt: parseInt(req.query.range2),
					},
			  }
			: {
					price: {
						$gte: parseInt(req.query.range1),
						$lt: parseInt(req.query.range2),
					},
			  }
	const count = await Product.count({ ...filter })
	const products = await Product.find({ ...filter })
		.populate({
			path: 'category',
			select: 'name',
		})
		.limit(pageSize)
		.skip(pageSize * (page - 1))
	console.log(filter)
	res.json({ products, page, pages: Math.ceil(count / pageSize) })
})
//@desc fetch latest Products
//@route Get/api/latestproducts
//@access public
const getLatestProducts = asyncHandler(async (req, res) => {
	const products = await Product.find()
		.populate({ path: 'category', selectt: 'name' })
		.sort({ createdAt: -1 })
		.limit(8)
	res.json(products)
})


export {
	getProducts
}
