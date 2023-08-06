import { createAsyncThunk } from '@reduxjs/toolkit'
import orderDataService from './orderDataService'

//addProducts
export const createOrder = createAsyncThunk(
	'order/add',
	async (object, thunkAPI) => {
		try {
			// console.log('createOrdergetCalled')
			const response = await orderDataService.makeOrder(object)
			return response
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

//get Order by id
export const getOrderById = createAsyncThunk(
	'order/get',
	async (id, thunkAPI) => {
		try {
			return await orderDataService.getOrderById(id)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

//get Logged in users all orders
export const getMyOrders = createAsyncThunk(
	'order/myOrders',
	async (_, thunkAPI) => {
		try {
			return await orderDataService.getMyOrders()
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)
//get all orders for admin
export const getAllOrders = createAsyncThunk(
	'order/all',
	async (_, thunkAPI) => {
		try {
			return await orderDataService.getAllOrders()
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)
//set orders shipped by admin
export const setOrderShipped = createAsyncThunk(
	'order/shipped',
	async (id, thunkAPI) => {
		try {
			return await orderDataService.setOrderShipped(id)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)
//set orders shipped by User
export const setOrderDelivered = createAsyncThunk(
	'order/delivered',
	async (id, thunkAPI) => {
		try {
			return await orderDataService.setOrderDelivered(id)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const getUserOrders = createAsyncThunk(
	'order/users',
	async (id, thunkAPI) => {
		try {
			return await orderDataService.getUserOrders(id)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)
