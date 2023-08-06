import { createSlice } from '@reduxjs/toolkit'
import { getProfile, updateProfile } from './UserActions'

const initialState = {
	profileInfo: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	action: '',
}
//action functions

export const profileDataSlice = createSlice({
	name: 'profileDetails',
	initialState,
	reducers: {
		resetProfileStatus: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.action = ''
		},
		resetWithProfile: (state) => {
			state.isLoading = false
			state.profileInfo = null
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.action = ''
		},
	},
	extraReducers: (builder) => {
		builder
			//for logIn User
			.addCase(getProfile.pending, (state) => {
				state.isLoading = true
				state.isError = false
				state.isSuccess = false
				state.message = ''
				state.action = 'getProfile'
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isLoading = false
				state.isError = false
				state.isSuccess = true
				state.profileInfo = action.payload
				state.message = ''
				state.action = 'getProfile'
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.profileInfo = null
				state.isError = true
				state.message = action.payload
				state.action = 'getProfile'
			})
			.addCase(updateProfile.pending, (state) => {
				state.isLoading = true
				state.isError = false
				state.isSuccess = false
				state.message = ''
				state.action = 'updateProfile'
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.updateIsSuccess = true
				state.profileInfo = action.payload
				state.message = ''
				state.action = 'updateProfile'
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'updateProfile'
			})
	},
})

export const { resetProfileStatus, resetWithProfile } = profileDataSlice.actions
export default profileDataSlice.reducer
