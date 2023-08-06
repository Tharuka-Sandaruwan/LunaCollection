import { configureStore } from '@reduxjs/toolkit'

import productListDataReducer from './features/products/productListDataSlice'
import productDataReducer from './features/products/productDataSlice'
import cartDataReducer from './features/cart/cartDataSlice'
import orderDataReducer from './features/order/orderDataSlice'
import logInDataReducer from './features/users/logInDataSlice'
import profileDataReducer from './features/users/profileDataSlice'
import userListDataReducer from './features/users/userListDataSlice'
import usersDataReducer from './features/users/usersDataSlice'
import reviewDataReducer from './features/reviews/reviewDataSlice'

const store = configureStore({
	reducer: {
		productList: productListDataReducer,
		productDetails: productDataReducer,
		cart: cartDataReducer,
		logInDetails: logInDataReducer,
		profileDetails: profileDataReducer,
		orders: orderDataReducer,
		allUsers: userListDataReducer,
		users: usersDataReducer,
		reviews: reviewDataReducer,
	},
})

export default store
