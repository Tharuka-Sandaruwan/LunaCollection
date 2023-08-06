import axios from 'axios'
import { getCookie } from '../../middleware/getCookie'

const getOrderById = async (id) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.get(`/api/orders/${id}`, config)
	return data
}

const makeOrder = async (object) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.post(`/api/orders`, object, config)

	return data
}

const getMyOrders = async () => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.get(`/api/orders/myorders`, config)
	return data
}
const getAllOrders = async () => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.get(`/api/orders/`, config)
	return data
}
const setOrderShipped = async (id) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.get(`/api/orders/ship/${id}`, config)
	return data
}
const setOrderDelivered = async (id) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.get(`/api/orders/deliver/${id}`, config)
	return data
}
const getUserOrders = async (id) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.get(`/api/orders/user/${id}`, config)
	return data
}
const orderDataService = {
	getOrderById,
	makeOrder,
	getMyOrders,
	getAllOrders,
	setOrderDelivered,
	setOrderShipped,
	getUserOrders,
}
export default orderDataService
