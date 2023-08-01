import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { resetLogIn } from '../features/users/logInDataSlice'
import FormContainer from '../components/FormContainer'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { registerUser } from '../features/users/UserActions'

function RegisterScreen() {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordMessage, setPasswordMessage] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userLogInDetails = useSelector((state) => state.logInDetails)
	const { userInfo, isError, isLoading, isSuccess, message } = userLogInDetails

	useEffect(() => {
		if (isSuccess || userInfo) {
			navigate('/')
			dispatch(resetLogIn())
		}
		if (isError) {
			toast.error(message)
			dispatch(resetLogIn())
		}
		if (passwordMessage) {
			toast.error(passwordMessage)
			setPasswordMessage('')
			dispatch(resetLogIn())
		}
	}, [
		userInfo,
		navigate,
		isSuccess,
		message,
		isError,
		dispatch,
		passwordMessage,
	])
	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setPasswordMessage('Passwords do not match')
		} else {
			dispatch(registerUser({ name, email, password }))
		}
	}

	return (
		<FormContainer>
			<h1>Register</h1>
			{isLoading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>User Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button className='my-3' type='submit' variant='primary'>
					Register
				</Button>
			</Form>
			
		</FormContainer>
	)
}


