import { configureStore } from '@reduxjs/toolkit'

import productListDataReducer from './features/products/productListDataSlice'
import productDataReducer from './features/products/productDataSlice'


const store = configureStore({
	reducer: {
		productList: productListDataReducer,
		productDetails: productDataReducer,
		
	},
})

export default store
