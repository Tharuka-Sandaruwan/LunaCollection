import asyncHandler from 'express-async-handler'
import Category from '../models/categoriesModel.js'

//@desc add Category
//@route PUT/api/categories/
//@access public/Admin
export const addCategory = asyncHandler(async (req, res) => {
	const categoryName = req.body.name.toUpperCase()
	const categoryExist = await Category.findOne({ name: categoryName })
	if (categoryExist) {
		throw new Error('Category already exists')
	} else {
		const category = await Category.create({ name: categoryName })
		res.json(category)
	}
})
//@desc get all Categories
//@route PUT/api/categories/
//@access public/Admin
export const getAllCategories = asyncHandler(async (req, res) => {
	const category = await Category.find().select('-__v')
	if (category) {
		res.json(category)
	} else {
		res.status(404)
		throw new Error('Category not found')
	}
})

//@desc delete Category
//@route DELETE/api/categories/:name
//@access public/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
	const categoryName = req.params.name.toUpperCase()
	const deletedCategory = await Category.findOneAndDelete({
		name: categoryName,
	})
	res.json(deletedCategory)
})
