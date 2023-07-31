import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'

import FormContainer from '../components/FormContainer'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { logInUser } from '../features/users/UserActions'
import { resetOrderData } from '../features/order/orderDataSlice'

function LogInScreen() {
	const [searchParams] = useSearchParams()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { userInfo, isError, isLoading, message } = useSelector(
		(state) => state.logInDetails
	)
	const orders = useSelector((state) => state.orders)
	const redirect = searchParams.get('redirect')
		? searchParams.get('redirect')
		: ''
	useEffect(() => {
		if (orders.orderList) {
			dispatch(resetOrderData())
		}
		if (userInfo) {
			navigate(`/${redirect}`)
		}
		if (isError) {
			toast.error(message)
		}
	}, [userInfo, navigate, isError, message, redirect, orders, dispatch])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(logInUser({ email, password }))
		//dispatch login
	}

	return (
		<FormContainer>
			
		</FormContainer>
	)
}

export default LogInScreen
