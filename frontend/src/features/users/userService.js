import axios from 'axios'
import { getCookie } from '../../middleware/getCookie'

//service function to logIn
const login = async ({ email, password }, config) => {
	const response = await axios.post(
		`/api/users/login`,
		{ email, password },
		config
	)
	return response.data
}
const register = async ({ name, email, password }) => {
	const response = await axios.post('/api/users/', { name, email, password })
	return response.data
}
const getProfile = async () => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.get(`/api/users/profile`, config)
	return response.data
}
const getAllUsers = async () => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.get(`/api/users/`, config)
	return response.data
}
const deleteUser = async (id) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.delete(`/api/users/${id}`, config)
	return response.data
}
const updateProfile = async ({ name, email, password }) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.put(
		`/api/users/profile`,
		{ name, email, password },
		config
	)
	return response.data
}
const getUserById = async (id) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.get(`/api/users/${id}`, config)
	return response.data
}
const updateUserById = async (id, updateDetails) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.put(`/api/users/${id}`, updateDetails, config)
	return response.data
}
const userService = {
	login,
	register,
	getProfile,
	getAllUsers,
	deleteUser,
	updateProfile,
	getUserById,
	updateUserById,
}
export default userService
