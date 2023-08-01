import Cart from '../models/cartModel.js'

const getUserCart = async (userID) => {
	try {
		const cart = Cart.findOne({ user: userID }).populate('cartItems.product')
		return cart
	} catch (error) {
		throw new Error('Failed to load Cart details: ' + error)
	}
}

const addItemToUserCart = async (userID, productId) => {
	try {
		const newCartItem = { product: productId }
		// console.log(newCartItem)
		const cart = await Cart.findOne({ user: userID }).populate(
			'cartItems.product'
		)
		const itemExist = cart.cartItems.find(
			(item) => JSON.stringify(item.product._id) === JSON.stringify(productId)
		)
		// console.log(cart.cartItems)
		// console.log(itemExist)
		if (itemExist) {
			throw new Error('Item already exist on the cart')
		} else {
			cart.cartItems.push(newCartItem)
			await cart.save()
			return await Cart.findOne({ user: userID }).populate('cartItems.product')
		}
	} catch (error) {
		throw new Error('Failed to update Cart' + error)
	}
}
const CartService = {
	addItemToUserCart,
	getUserCart,
}

export default CartService
