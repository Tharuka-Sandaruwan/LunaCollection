import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import {  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProduct } from '../features/products/productAction'

const ProductScreen = () => {
	const [qty, setQty] = useState(1)

	//takes the id variable from url
	const { id: proID } = useParams()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getProduct(proID))
	}, [dispatch, proID])

	const handleAddToCart = () => {
		navigate(`/cart/${proID}?qty=${qty}`)
	}

	const { isLoading, isError, product, message } = useSelector(
		(state) => state.productDetails
	)

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<Message variant='danger'>{message}</Message>
			) : (
				<>
					<Row>
						<Col sm={12} md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3} sm={12}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price:Rs.{product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description:{product.shortDescription}
								</ListGroup.Item>
								<ListGroup.Item>
									Long Description:{product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>Rs.{product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										{/* <Link to={`../cart/${proID}?qty=${qty}`}> */}
										<Button
											className='btn-block w-100'
											type='button'
											disabled={product.countInStock === 0}
											onClick={handleAddToCart}
										>
											ADD TO CART
										</Button>
										{/* </Link> */}
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					
				</>
			)}
		</>
	)
}

export default ProductScreen
