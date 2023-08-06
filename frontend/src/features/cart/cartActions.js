import { createAsyncThunk } from '@reduxjs/toolkit'
import cartDataService from './cartDataService'

//addProducts
export const addToCart = createAsyncThunk('cart/add', async (ob, thunkAPI) => {
	try {
		return await cartDataService.checkCart(ob.id, ob.qty)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})
