import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Row, Col, Nav } from 'react-bootstrap'
import { listProducts } from '../features/products/productAction'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
//import axios from 'axios'

const HomeScreen = () => {
	//const [products, setProducts] = useState([])
	const dispatch = useDispatch()
	const [range, setRange] = useState([100, 100000])
	const [categories, setCategories] = useState([])
	const { keyword, pageNumber, category } = useParams()
	const productList = useSelector((state) => state.productList)
	const { isLoading, isError, products, isSuccess, message } = productList
	useEffect(() => {
		dispatch(listProducts({ keyword, pageNumber, category, range }))
	}, [keyword, pageNumber, category])
	useEffect(() => {
		dispatch(listProducts({ keyword, pageNumber: 1, category, range }))
	}, [range])

	useEffect(() => {
		axios.get('/api/categories').then(({ data }) => setCategories(data))
	}, [])
	const handlePriceChange = (event, price) => {
		setRange(price)
	}
	return (
		<>
			<h1>SHOP NOW</h1>
			{isError ? (
				<Message variant='danger'>{message}</Message>
			) : (
				<>
					<Row>
						<Col sm={3}>
							<h3>CATEGORIES</h3>
							<Nav variant='pills' className='flex-column' activeKey={category}>
								{categories.map(({ name }) => (
									<LinkContainer
										to={
											keyword
												? `/shop/search/${keyword}/category/${name}`
												: `/shop/category/${name}`
										}
									>
										<Nav.Link eventKey={`${name}`}>{name}</Nav.Link>
									</LinkContainer>
								))}
							</Nav>
							<h3>Prices</h3>
							<Typography id='non-linear-slider' gutterBottom>
								Price Range: {range[0]}:{range[1]}
							</Typography>
							<Slider
								getAriaLabel={() => 'Price Range'}
								value={range}
								onChange={handlePriceChange}
								valueLabelDisplay='auto'
								getAriaValueText={(value) => `$${value}`}
								min={100}
								max={100000}
								step={100}
							/>
						</Col>
						<Col sm={9}>
							<Row>
								{products &&
									products.products &&
									products.products.map((product) => (
										<Col key={product._id} sm={12} md={6} lg={3} xl={3}>
											<Product product={product} />
										</Col>
									))}
								{products && products.products.length === 0 && (
									<Message variant={'danger'}>
										No Items to show, Please check again later
									</Message>
								)}
							</Row>

							{products && (
								<Paginate
									pages={products.pages}
									page={products.page}
									category={category ? category : ''}
									price={range ? range : ''}
									keyword={keyword ? keyword : ''}
								/>
							)}
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default HomeScreen
