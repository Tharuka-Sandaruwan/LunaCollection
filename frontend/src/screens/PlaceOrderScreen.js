import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
	Button,
	Col,
	Row,
	ListGroup,
	Image,
	ListGroupItem,
	Card,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { resetCart, setPrices } from '../features/cart/cartDataSlice'
import { resetOrderStatus } from '../features/order/orderDataSlice'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../features/order/orderActions'
import axios from 'axios'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
export const PlaceOrderScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [sdkReady, setSdkReady] = useState(false)

	const { isError, isSuccess, message, order, action } = useSelector(
		(state) => state.orders
	)
	const cart = useSelector((state) => state.cart)
	const { cartItems, shippingAddress, paymentMethod } = cart

	//Calculate Prizes
	const itemsPrice = cart.cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	)
	const shippingPrice = 10
	const totalPrice = itemsPrice + shippingPrice
	const addPayPalScript = async () => {
		const { data: clientID } = await axios.get('/api/config/paypal')
		setSdkReady(clientID)
	}
	useEffect(() => {
		if (!sdkReady) {
			addPayPalScript()
		}
		if (action === 'createOrder' && isSuccess) {
			navigate(`/orders/${order._id}`)
			dispatch(resetOrderStatus())
			dispatch(resetCart())
		}
		if (action === 'createOrder' && isError) {
			toast.error(message)
			dispatch(resetOrderStatus())
		}
	}, [isSuccess, isError, message, action, navigate, order, dispatch, sdkReady])

	const placeOrderHandler = (details) => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				shippingPrice,
				totalPrice,
				paymentResult: {
					id: details.id,
					status: details.status,
					update_time: details.update_time,
					email_address: details.payer.email_address,
				},
			})
		)
	}
	return (
		<>
			<CheckoutSteps step1 step2 step3 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{cart.shippingAddress.address},{cart.shippingAddress.city},
								{cart.shippingAddress.postalCode}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>

							<strong>Method:</strong>
							{cart.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>

							{cart.cartItems.length === 0 ? (
								<p>No items in the cart</p>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroupItem key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x Rs.{item.price} = Rs.
													{item.price * item.qty}
												</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h2>Order Summary</h2>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Items</Col>
									<Col>Rs.{itemsPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Shipping</Col>
									<Col>Rs.{shippingPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Total</Col>
									<Col>Rs.{totalPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								{sdkReady && cart.cartItems.length > 0 && (
									<PayPalScriptProvider options={{ 'client-id': sdkReady }}>
										<PayPalButtons
											disabled={false}
											forceReRender={[totalPrice, 'USD']}
											fundingSource={undefined}
											createOrder={(data, actions) => {
												return actions.order.create({
													purchase_units: [
														{
															amount: {
																currency_code: 'USD',
																value: totalPrice,
															},
														},
													],
												})
											}}
											onApprove={(data, actions) => {
												return actions.order.capture().then((details) => {
													// Your code here after capture the order
													placeOrderHandler(details)
												})
											}}
										/>
									</PayPalScriptProvider>
								)}
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
