import { createSlice } from '@reduxjs/toolkit'
import { addProduct, getProduct, updateProduct } from './productAction'

const initialState = {
	product: { reviews: [] },
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	action: '',
}

//getProducts

export const productDataSlice = createSlice({
	name: 'productDetails',
	initialState,
	reducers: {
		resetProductStatus: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.action = ''
		},
		resetProductData: (state) => {
			state.product = { reviews: [] }
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.action = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProduct.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.action = 'getProduct'
			})
			.addCase(getProduct.fulfilled, (state, action) => {
				state.isLoading = false
				state.isError = false
				state.message = ''
				state.isSuccess = true
				state.product = action.payload
				state.action = 'getProduct'
			})
			.addCase(getProduct.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'getProduct'
			})
			.addCase(addProduct.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.action = 'addProduct'
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false
				state.isError = false
				state.message = ''
				state.isSuccess = true
				state.product = action.payload
				state.action = 'addProduct'
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'addProduct'
			})
			.addCase(updateProduct.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.action = 'updateProduct'
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.isLoading = false
				state.isError = false
				state.message = ''
				state.isSuccess = true
				state.action = 'updateProduct'
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'updateProduct'
			})
	},
})

export const { resetProductStatus, resetProductData } = productDataSlice.actions
export default productDataSlice.reducer
