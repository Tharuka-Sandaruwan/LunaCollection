import { configureStore } from '@reduxjs/toolkit'

import productListDataReducer from './features/products/productListDataSlice'


const store = configureStore({
	reducer: {
		productList: productListDataReducer,
		
	},
})

export default store
