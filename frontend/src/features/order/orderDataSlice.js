import { createSlice } from '@reduxjs/toolkit'
import {
	createOrder,
	getAllOrders,
	getMyOrders,
	getOrderById,
	getUserOrders,
	setOrderDelivered,
	setOrderShipped,
} from './orderActions.js'

const initialState = {
	adminOrderList: null,
	orderList: null,
	order: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	action: '',
}

export const orderDataSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		resetOrderStatus: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.action = ''
		},
		resetOrderData: (state) => {
			state.orderList = null
			state.adminOrderList = null
			state.order = null
			state.isError = false
			state.isSuccess = false
			state.isLoading = false
			state.message = ''
			state.action = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.message = ''
				state.action = 'createOrder'
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.message = ''
				state.order = action.payload
				state.action = 'createOrder'
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'createOrder'
			})
			.addCase(getOrderById.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.message = ''
				state.action = 'getOrderById'
			})
			.addCase(getOrderById.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.message = ''
				state.order = action.payload
				state.action = 'getOrderById'
			})
			.addCase(getOrderById.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'getOrderById'
			})
			.addCase(getMyOrders.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.message = ''
				state.action = 'getMyOrders'
			})
			.addCase(getMyOrders.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.message = ''
				state.orderList = action.payload
				state.action = 'getMyOrders'
			})
			.addCase(getMyOrders.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'getMyOrders'
			})
			.addCase(getAllOrders.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.message = ''
				state.action = 'getAllOrders'
			})
			.addCase(getAllOrders.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.message = ''
				state.adminOrderList = action.payload
				state.action = 'getAllOrders'
			})
			.addCase(getAllOrders.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'getAllOrders'
			})
			.addCase(setOrderShipped.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.message = ''
				state.action = 'setOrderShipped'
			})
			.addCase(setOrderShipped.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.message = ''
				state.order = action.payload
				state.action = 'setOrderShipped'
			})
			.addCase(setOrderShipped.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'setOrderShipped'
			})
			.addCase(setOrderDelivered.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.message = ''
				state.action = 'setOrderDelivered'
			})
			.addCase(setOrderDelivered.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.message = ''
				state.order = action.payload
				state.action = 'setOrderDelivered'
			})
			.addCase(setOrderDelivered.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'setOrderDelivered'
			})
			.addCase(getUserOrders.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.message = ''
				state.action = 'getUserOrders'
			})
			.addCase(getUserOrders.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.message = ''
				state.orderList = action.payload
				state.action = 'getUserOrders'
			})
			.addCase(getUserOrders.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'getUserOrders'
			})
	},
})

export const { resetOrderStatus, resetOrderData } = orderDataSlice.actions
export default orderDataSlice.reducer
