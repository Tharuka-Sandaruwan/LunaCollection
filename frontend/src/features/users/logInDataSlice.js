import { createSlice } from '@reduxjs/toolkit'
import { logInUser, registerUser } from './UserActions'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
	userInfo: userInfo ? userInfo : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	action: '',
}

export const logInDataSlice = createSlice({
	name: 'userDetails',
	initialState,
	reducers: {
		setUserInfoName: (state, action) => {
			state.userInfo.name = action.payload
		},
		setUserInfoMail: (state, action) => {
			state.userInfo.email = action.payload
		},
		resetLogIn: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.action = ''
		},
		logout: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
			state.userInfo = null
			localStorage.removeItem('userInfo')
			document.cookie =
				'isAdmin= ; expires = Thu, 01 Jan 1970 00:00:00 GMT path=/;'
			document.cookie =
				'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT path=/;'
			document.cookie =
				'name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT path=/;'
		},
	},
	extraReducers: (builder) => {
		builder
			//for logIn User
			.addCase(logInUser.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.isError = false
				state.message = ''
			})
			.addCase(logInUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.userInfo = action.payload
				state.message = ''
				state.action = 'login'
				localStorage.setItem('userInfo', JSON.stringify(action.payload))
			})
			.addCase(logInUser.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.userInfo = null
				state.action = 'login'
				//state.product = []
			})
			//for register user
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true
				state.isError = false
				state.isSuccess = false
				state.message = ''
				state.action = 'registerUser'
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.userInfo = action.payload
				state.message = ''
				state.action = 'registerUser'
				localStorage.setItem('userInfo', JSON.stringify(action.payload))
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
				state.action = 'registerUser'
				//state.product = []
			})
	},
})

export const { resetLogIn, logout, setUserInfoName, setUserInfoMail } =
	logInDataSlice.actions
export default logInDataSlice.reducer
