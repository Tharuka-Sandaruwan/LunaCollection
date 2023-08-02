import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, reset } from '../features/users/logInDataSlice'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap'
import { addShippingAddress } from '../features/cart/cartDataSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
const ShippingScreen = () => {
	const shippingAddress = useSelector((state) => state.cart.shippingAddress)
	const [formFields, setFormFields] = useState({
		address: shippingAddress.address,
		city: shippingAddress.city,
		postalCode: shippingAddress.postalCode,
	})
	const { address, city, postalCode } = formFields
	const dispatch = useDispatch()

	const navigate = useNavigate()
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(addShippingAddress(formFields))
		navigate('/placeorder')
	}
	const handleOnChange = (e) => {
		setFormFields((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}
	return (
		<>
			<CheckoutSteps step1></CheckoutSteps>
			<FormContainer>
				<h1>Shipping</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='address'>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							name='address'
							placeholder='Enter address'
							value={address}
							required
							onChange={handleOnChange}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='city'>
						<Form.Label>City</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter city'
							value={city}
							name='city'
							required
							onChange={handleOnChange}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='postalCode'>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter postal code'
							value={postalCode}
							required
							name='postalCode'
							onChange={handleOnChange}
						></Form.Control>
					</Form.Group>
					{/* <Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						name='country'
						required
						onChange={handleOnChange}
					></Form.Control>
				</Form.Group> */}
					<Button type='submit' variant='primary'>
						Continue
					</Button>
				</Form>
			</FormContainer>
		</>
	)
}

export default ShippingScreen
