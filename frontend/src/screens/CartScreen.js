import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { removeFromCart } from '../features/cart/cartDataSlice'
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	ListGroupItem,
	Row,
} from 'react-bootstrap'
import { addToCart } from '../features/cart/cartActions'
function CartScreen() {
	const { id: proID } = useParams()
	const [searchParams] = useSearchParams()
	const qty = searchParams.get('qty')
	const color = searchParams.get('color')
	const ob = { id: proID, qty: qty }
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cart = useSelector((state) => state.cart)
	const { cartItems, isLoading, isError } = cart
	useEffect(() => {
		if (proID) {
			dispatch(addToCart(ob))
		}
	}, [dispatch, proID, qty])

	const checkoutHandler = () => {
		navigate('/login?redirect=shipping')
	}
	const removeFromCartHandler = (id) => {
		console.log('remove')
		dispatch(removeFromCart(id))
	}
	return (
		<>
			<Row>
				<Col md={8}>
					<h1>Shopping Cart</h1>
					{cartItems.length === 0 ? (
						<Message>
							Your cart is empty<Link to='/shop'>Go Back</Link>
						</Message>
					) : (
						<ListGroup variant='flush'>
							{cartItems.map((item) => (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3}>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={2}>Rs.{item.price}</Col>
										<Col md={2}>
											<Form.Control
												as='select'
												value={item.qty}
												onChange={(e) => {
													const ob = {
														id: item.product,
														qty: Number(e.target.value),
													}
													dispatch(addToCart(ob))
												}}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
										<Col md={2}>
											<Button
												type='button'
												variant='light'
												onClick={() => removeFromCartHandler(item.product)}
											>
												<i className='fas fa-trash'></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>
									Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
									)
								</h2>
								Rs.
								{cartItems
									.reduce((acc, item) => acc + item.qty * item.price, 0)
									.toFixed(2)}
							</ListGroup.Item>
							<ListGroupItem>
								<Button
									type='button'
									className='btn-block w-100'
									disabled={cartItems.length === 0 ? true : false}
									onClick={checkoutHandler}
								>
									Proceed To Checkout
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default CartScreen
