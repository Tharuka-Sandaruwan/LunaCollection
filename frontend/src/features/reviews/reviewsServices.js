import axios from 'axios'
import { getCookie } from '../../middleware/getCookie'

const getNeedReviewProducts = async (id) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.get(`/api/reviews/notreviewed`, config)
	return data
}
const getReviewedProducts = async (id) => {
	const token = decodeURI(getCookie('token'))
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.get(`/api/reviews/reviewed/${id}`, config)
	return data
}
const reviewProduct = async (id, object) => {
	const token = decodeURI(getCookie('token'))
	console.log(id)
	console.log(object)
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.post(`/api/reviews/${id}`, object, config)
	return data
}
const reviewProductByOrder = async (orderId, id, object) => {
	const token = decodeURI(getCookie('token'))
	console.log(id)
	console.log(object)
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	const { data } = await axios.post(
		`/api/reviews/order/${orderId}/product/${id}`,
		object,
		config
	)
	return data
}
const reviewService = {
	getNeedReviewProducts,
	getReviewedProducts,
	reviewProduct,
	reviewProductByOrder,
}
export default reviewService
