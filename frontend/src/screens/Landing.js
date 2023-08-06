import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Row, Col, Nav, Container, Image, Navbar } from 'react-bootstrap'
import {
	latestProducts,
	listProducts,
	trendingProducts,
} from '../features/products/productAction'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { Carousel } from 'antd'
import { Carousel as BCarousel } from 'react-bootstrap'

//import axios from 'axios'

const Landing = () => {
	//const [products, setProducts] = useState([])
	const dispatch = useDispatch()
	const { isLoading, isError, latest, trending, isSuccess, message } =
		useSelector((state) => state.productList)

	const banners = ['banner.jpg', 'banner2.jpg']
	useEffect(() => {
		dispatch(latestProducts())
		dispatch(trendingProducts())
	}, [])

	return (
		<>
			<Carousel autoplay effect='fade'>
				{banners.map((banner) => (
					<div>
						<div
							style={{
								background: `url('/images/${banner}') no-repeat fixed  `,
								backgroundSize: 'cover',
								height: '90vh',
							}}
						></div>
					</div>
				))}
			</Carousel>
			<Navbar
				bg='dark'
				variant='dark'
				className='py-3'
				style={{
					display: 'block',
					backgroundColor: 'grey',
					color: 'white',
					height: 'fit-content',
				}}
			>
				<BCarousel>
					<BCarousel.Item>
						<div>
							<Row
								style={{ textAlign: 'center' }}
								className='justify-content-md-center 							'
							>
								<Col xs lg='2'>
									<>
										<Image
											roundedCircle
											style={{ width: '150px' }}
											src='/images/ring.jpg'
										/>
										<LinkContainer to='/shop/category/rings'>
											<Nav.Link>
												<h3>Rings</h3>
											</Nav.Link>
										</LinkContainer>
									</>
								</Col>
								<Col xs lg='2'>
									<>
										<Image
											roundedCircle
											style={{ width: '150px' }}
											src='/images/bracelet.jpg'
										/>
										<LinkContainer to='/shop/category/bracelet'>
											<h3>Bracelet</h3>
										</LinkContainer>
									</>
								</Col>
								<Col xs lg='2'>
									<>
										{' '}
										<Image
											roundedCircle
											style={{ width: '150px' }}
											src='/images/necklace.jpg'
										/>
										<LinkContainer to='/shop/category/necklace'>
											<h3>necklace</h3>
										</LinkContainer>
									</>
								</Col>
							</Row>
						</div>
					</BCarousel.Item>
					<BCarousel.Item>
						<div>
							<Row
								style={{ textAlign: 'center' }}
								className='justify-content-md-center 							'
							>
								<Col xs lg='2'>
									<>
										{' '}
										<Image
											roundedCircle
											style={{ width: '150px' }}
											src='/images/chains.jpg'
										/>
										<LinkContainer to='/shop/category/chains'>
											<h3>chains</h3>
										</LinkContainer>
									</>
								</Col>
								<Col xs lg='2'>
									<>
										<Image
											roundedCircle
											style={{ width: '150px' }}
											src='/images/earstuds.jpg'
										/>
										<LinkContainer to='/shop/category/ear studs'>
											<h3>ear studs</h3>
										</LinkContainer>
									</>
								</Col>
								<Col xs lg='2'>
									<>
										<Image
											roundedCircle
											style={{ width: '150px' }}
											src='/images/pendant.jpg'
										/>
										<LinkContainer to='/shop/category/pendants'>
											<h3>pendant</h3>
										</LinkContainer>
									</>
								</Col>
							</Row>
						</div>
					</BCarousel.Item>
				</BCarousel>
			</Navbar>
			<Container>
				<h1>our Latest Products</h1>
				<Row>
					{latest.length > 0 &&
						latest.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={3} xl={3}>
								<Product product={product} />
							</Col>
						))}
				</Row>
				<div>
					<h1>
						<a
							href='https://www.instagram.com/lunacollectionlk/'
							target='blank'
						>
							@lunacollectionlk
						</a>{' '}
						on Instagram
					</h1>
					<Row>
						<Col xs sm={6} lg={4}>
							<a
								href='https://www.instagram.com/p/CW0Y9s_BVs5/'
								target='_blank'
							>
								<Image
									style={{ width: '400px' }}
									src='/images/instagram1.png'
									alt='Instagram Post'
								/>
							</a>
						</Col>
						<Col xs sm={6} lg={4}>
							<a
								href='https://www.instagram.com/p/CP2T4Q5hiH5/'
								target='_blank'
							>
								<Image
									style={{ width: '400px', height: '500px' }}
									src='/images/instagram2.png'
									alt='Instagram Post'
								/>
							</a>
						</Col>
						<Col xs sm={6} lg={4}>
							<a
								href='https://www.instagram.com/p/COriC23BAG0/'
								target='_blank'
							>
								<Image
									style={{ width: '400px' }}
									src='/images/instagram3.png'
									alt='Instagram Post'
								/>
							</a>
						</Col>
					</Row>
				</div>
				<div>
					<h1>our Trending products</h1>
					<Row>
						{trending.length > 0 &&
							trending.map((product) => (
								<Col key={product._id} sm={12} md={6} lg={3} xl={3}>
									<Product product={product} />
								</Col>
							))}
					</Row>
				</div>
			</Container>
		</>
	)
}

export default Landing
