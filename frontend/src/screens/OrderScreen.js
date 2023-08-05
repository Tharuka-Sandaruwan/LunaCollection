import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import jsPDF from 'jspdf'
import {
	Col,
	Row,
	ListGroup,
	Image,
	ListGroupItem,
	Card,
	Button,
	Form,
} from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { resetOrderStatus } from '../features/order/orderDataSlice'
import {
	getOrderById,
	setOrderDelivered,
	setOrderShipped,
} from '../features/order/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Modal } from 'antd'
import { reviewProductByOrder } from '../features/reviews/reviewsAction'
import { resetReviewStatus } from '../features/reviews/reviewDataSlice'

export const OrderScreen = () => {
	const dispatch = useDispatch()
	const { id: orderID } = useParams()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [rating, setRating] = useState('')
	const [comment, setComment] = useState('')
	const [productID, setProductID] = useState()
	const reviewsReduxState = useSelector((state) => state.reviews)
	const [orderDetails, setOrderDetails] = useState()
	const logedUser = useSelector((state) => state.logInDetails.userInfo)
	const { order, isError, isSuccess, isLoading, message, action } = useSelector(
		(state) => state.orders
	)
	var itemsPrice
	if (order) {
		itemsPrice = order.orderItems.reduce(
			(acc, item) => acc + item.price * item.qty,
			0
		)
	}
	if (
		reviewsReduxState.action === 'reviewProductByOrder' &&
		reviewsReduxState.isSuccess
	) {
		toast.success(reviewsReduxState.message)
		dispatch(resetReviewStatus())
		dispatch(getOrderById(orderID))
		setRating('')
		setComment('')
	}
	if (
		reviewsReduxState.action === 'reviewProduct' &&
		reviewsReduxState.isError
	) {
		toast.error(reviewsReduxState.message)
		dispatch(resetReviewStatus())
	}
	const showModal = (id) => {
		setIsModalOpen(true)
		setProductID(id)
	}
	const handleOk = () => {
		if (rating !== '' && comment !== '') {
			setIsModalOpen(false)
			const object = {
				orderId: orderID,
				id: productID,
				object: { rating: rating, comment: comment },
			}
			dispatch(reviewProductByOrder(object))
		} else {
			toast.error('fields must be filled')
		}
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const handleDownload = () => {
		window.print()
		// const pdf = new jsPDF()
		// pdf.html(document.getElementsByClassName('container')[1], {
		// 	callback: function () {
		// 		pdf.save('my-document.pdf')
		// 	},
		// 	format: 'a4',
		// })
	}
	useEffect(() => {
		dispatch(getOrderById(orderID))
	}, [])

	if (isSuccess) {
		setOrderDetails(order)
		dispatch(resetOrderStatus())
	}
	return isLoading ? (
		<Loader />
	) : isError ? (
		<Message variant='danger'>{message}</Message>
	) : !order ? (
		<Loader />
	) : (
		<>
			<h1>Order ID:{order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Delivery</h2>
							<p>
								<strong>Name:</strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email :</strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong>
								{order.shippingAddress.address},{order.shippingAddress.city},
								{order.shippingAddress.postalCode}
							</p>
							<p>
								<strong>Order Shipped: </strong>
								{order.shipping.isShipped ? (
									<Message variant='success'>
										Shipped on {order.shipping.shippedAt}
									</Message>
								) : (
									<i className='fas fa-times' style={{ color: 'red' }}></i>
								)}
							</p>
							{order.delivery.isDelivered ? (
								<Message variant='success'>
									Delivered on {order.delivery.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method:</strong>
								{order.paymentMethod}
							</p>

							<Message variant='success'>
								Paid on {order.paymentResult.update_time.substring(0, 10)}
							</Message>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>

							{order.orderItems.length === 0 ? (
								toast.error('Order is Empty')
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
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
													{item.qty} x RS.{item.price} = RS.
													{item.price * item.qty}
												</Col>
												<Col md={2}>
													{order.delivery.isDelivered && !item.reviewed ? (
														<Button onClick={() => showModal(item.product)}>
															Review
														</Button>
													) : (
														<></>
													)}
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
									<Col>RS.{itemsPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Shipping</Col>
									<Col>RS.{order.shippingPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Total</Col>
									<Col>RS.{order.totalPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem className='printbtn'>
								<Row>
									<Button variant='primary' onClick={handleDownload}>
										DOWNLOAD INVOICE
									</Button>
								</Row>
							</ListGroupItem>
							{logedUser.isAdmin && !order.shipping.isShipped && (
								<ListGroupItem>
									<Row>
										<Button
											onClick={() => dispatch(setOrderShipped(order._id))}
											variant='primary'
										>
											Set as Shipped
										</Button>
									</Row>
								</ListGroupItem>
							)}
							{!logedUser.isAdmin &&
								order.shipping.isShipped &&
								!order.delivery.isDelivered && (
									<ListGroupItem>
										<Row>
											<Button
												onClick={() => dispatch(setOrderDelivered(order._id))}
												variant='primary'
											>
												Set as Delivered
											</Button>
										</Row>
									</ListGroupItem>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Modal
				title='Add review'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<>
						<Button key={'submit'} onClick={handleOk}>
							SUBMIT
						</Button>
						{'  '}
						<Button key={'back'} onClick={handleCancel}>
							CANCEL
						</Button>
					</>,
				]}
			>
				<Form>
					<Form.Group controlId='rating'>
						<Form.Label>Rating</Form.Label>
						<Form.Control
							as='select'
							value={rating}
							onChange={(e) => setRating(e.target.value)}
						>
							<option key={1} value=''>
								Select...
							</option>
							<option key={2} value='1'>
								1 - Poor
							</option>
							<option key={3} value='2'>
								2 - Fair
							</option>
							<option key={4} value='3'>
								3 - Good
							</option>
							<option key={5} value='4'>
								4 - Very Good
							</option>
							<option key={6} value='5'>
								5 - Excellent
							</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId={'comment'}>
						<Form.Label>Comment</Form.Label>
						<Form.Control
							as='textarea'
							row='3'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						></Form.Control>
					</Form.Group>
				</Form>
			</Modal>
		</>
	)
}
