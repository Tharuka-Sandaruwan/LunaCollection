import expressAsyncHandler from 'express-async-handler'
import CartService from '../services/CartService.js'

const addNewItemToCart = expressAsyncHandler(async (req, res) => {
	const { productID } = req.body
	const user_id = req.user._id
	try {
		const response = await CartService.addItemToUserCart(user_id, productID)
		res.status(200).json(response)
	} catch (error) {
		res.status(500)
		throw new Error(error)
	}
})
const removeItemFromCart = expressAsyncHandler(async (req, res) => {
	const { productID } = req.body
	const user_id = req.user._id
	try {
		const response = await CartService.dropItemFromCart(user_id, productID)
		res.status(200).json(response)
	} catch (error) {
		throw new Error(error)
	}
})
const addNewCart = expressAsyncHandler(async (req, res) => {
	try {
		const user_id = req.user._id
		// console.log(req.user)

		const response = await CartService.addNewCart(user_id)
		res.status(200).json(response)
	} catch (error) {
		res.status(500)
		throw new Error(error)
	}
})
const getCart = expressAsyncHandler(async (req, res) => {
	try {
		const user_id = req.user._id
		const response = await CartService.getUserCart(user_id)
		res.status(200).json(response)
	} catch (error) {
		res.status(500)
		throw new Error()
	}
})

export { addNewCart, addNewItemToCart, getCart, removeItemFromCart }
