import { createSlice } from '@reduxjs/toolkit'
import { getUser, updateUser } from './UserActions'

const initialState = {
	userInfo: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	action: '',
}
//action functions

export const usersDataSlice = createSlice({
	name: 'usersDetails',
	initialState,
	reducers: {
		resetUserStatus: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.action = ''
		},
		resetWithUser: (state) => {
			state.isLoading = false
			state.userInfo = null
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.action = ''
		},
	},
	extraReducers: (builder) => {
		builder
			//for logIn User
			.addCase(getUser.pending, (state) => {
				state.isLoading = true
				state.isError = false
				state.isSuccess = false
				state.message = ''
				state.action = 'getUser'
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isError = false
				state.isSuccess = true
				state.userInfo = action.payload
				state.message = ''
				state.action = 'getUser'
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'getUser'
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true
				state.isError = false
				state.isSuccess = false
				state.message = ''
				state.action = 'updateUser'
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isError = false
				state.isSuccess = true
				state.userInfo = action.payload
				state.message = ''
				state.action = 'updateUser'
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'updateUser'
			})
	},
})

export const { resetProfileStatus, resetWithProfile } = usersDataSlice.actions
export default usersDataSlice.reducer
