import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { Modal } from 'antd'
import { Form, Button, Col, Row, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import {
	setUserInfoName,
	setUserInfoMail,
} from '../features/users/logInDataSlice'
import { resetProfileStatus } from '../features/users/profileDataSlice'
import { getProfile, updateProfile } from '../features/users/UserActions'
import { getMyOrders } from '../features/order/orderActions'
import { resetOrderStatus } from '../features/order/orderDataSlice'
import Message from '../components/Message'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, Dialog, DialogContent, Grid } from '@mui/material'
import {
	getNeedReviewProducts,
	reviewProduct,
} from '../features/reviews/reviewsAction'
import { resetReviewStatus } from '../features/reviews/reviewDataSlice'

function ProfileScreen() {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [ordersList, setOrdersList] = useState([])
	const [pageSize, setPageSize] = useState(5)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [productID, setProductID] = useState()
	const [rating, setRating] = useState('')
	const [comment, setComment] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { userInfo } = useSelector((state) => state.logInDetails)
	const ordersReduxState = useSelector((state) => state.orders)
	const reviewsReduxState = useSelector((state) => state.reviews)
	const profileDetails = useSelector((state) => state.profileDetails)

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			dispatch(getMyOrders())
			dispatch(getProfile())
			dispatch(getNeedReviewProducts())
		}
	}, [dispatch, navigate, userInfo])
	if (
		reviewsReduxState.action === 'reviewProduct' &&
		reviewsReduxState.isSuccess
	) {
		dispatch(getNeedReviewProducts())
		toast.success(reviewsReduxState.message)
		dispatch(resetReviewStatus())
		setRating('')
		setComment('')
	}
	if (
		reviewsReduxState.action === 'reviewProduct' &&
		reviewsReduxState.isError
	) {
		dispatch(getNeedReviewProducts())
		toast.error(reviewsReduxState.message)
		dispatch(resetReviewStatus())
	}
	if (profileDetails.profileInfo && email === '') {
		setEmail(profileDetails.profileInfo.email)
		setName(profileDetails.profileInfo.name)
	}
	if (
		ordersReduxState.orderList &&
		ordersReduxState.orderList.length > 0 &&
		ordersList.length === 0
	) {
		setOrdersList(ordersReduxState.orderList)
		dispatch(resetOrderStatus())
	}

	if (profileDetails.action === 'updateProfile' && profileDetails.isSuccess) {
		toast.success('succesfully updated')
		dispatch(setUserInfoName(name))
		dispatch(setUserInfoMail(email))
		dispatch(resetProfileStatus())
	}
	if (profileDetails.action === 'getProfile' && profileDetails.isSuccess) {
		setName(profileDetails.profileInfo.name)
		setEmail(profileDetails.profileInfo.email)
		dispatch(resetProfileStatus())
	}

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
		} else {
			dispatch(updateProfile({ name, email, password }))
		}
	}

	const showModal = (id) => {
		setIsModalOpen(true)
		setProductID(id)
	}
	const handleOk = () => {
		if (rating !== '' && comment !== '') {
			setIsModalOpen(false)
			const object = {
				id: productID,
				object: { rating: rating, comment: comment },
			}
			dispatch(reviewProduct(object))
		} else {
			toast.error('fields must be filled')
		}
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const columns = [
		{ field: '_id', flex: 1, headerName: 'ID' },
		{
			field: 'createdAt',
			flex: 1,
			headerName: 'DATE',
		},
		{ field: 'totalPrice', flex: 1, headerName: 'TOTAL' },
		{
			field: 'shipping',
			flex: 1,
			headerName: 'SHIPPED',
			valueGetter: ({ value }) =>
				value.isShipped ? value.shippedAt : value.isShipped,
			renderCell: ({ value }) =>
				!value ? (
					<i className='fas fa-times' style={{ color: 'red' }}></i>
				) : (
					value
				),
		},
		{
			field: 'delivery',
			flex: 1,
			headerName: 'DELIVERED',
			valueGetter: ({ value }) =>
				value.isDelivered ? value.deliveredAt : value.isDelivered,
			// valueFormatter: ({ value }) => value.name,
			renderCell: ({ value }) =>
				!value ? (
					<i className='fas fa-times' style={{ color: 'red' }}></i>
				) : (
					value
				),
		},

		{
			field: 'actions',
			flex: 1,
			headerName: 'Actions',
			headerAlign: 'center',
			renderCell: ({ id }) => {
				return (
					<>
						<Button
							variant='light'
							className='btn-sm'
							onClick={() => navigate(`/orders/${id}`)}
						>
							Details
						</Button>
					</>
				)
			},
		},
	]
	const reviewColumns = [
		{
			field: 'image',
			flex: 1,
			headerName: 'ID',
			renderCell: ({ value }) => (
				<img
					src={value}
					style={{ width: '50px', height: '50px' }}
					alt='product'
				/>
			),
		},
		{
			field: 'name',
			flex: 1,
			headerName: 'NAME',
		},
		{ field: 'category', flex: 1, headerName: 'CATEGORY' },
		{
			field: 'price',
			flex: 1,
			headerName: 'PRICE',
		},

		{
			field: 'actions',
			flex: 1,
			headerName: 'Actions',
			headerAlign: 'center',
			renderCell: ({ id }) => {
				return (
					<>
						<Button
							variant='light'
							className='btn-sm'
							onClick={() => showModal(id)}
						>
							REVIEW
						</Button>
					</>
				)
			},
		},
	]
	return (
		<>
			<Row>
				<Col md={3}>
					<h2>User Profile</h2>
					{profileDetails.isLoading && <Loader />}
					{profileDetails.isError && (
						<Message variant={'danger'}>{profileDetails.message}</Message>
					)}
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
							Update
						</Button>
					</Form>
				</Col>
				<Col md={9}>
					<h2>My Orders</h2>
					{ordersReduxState.isLoading &&
						ordersReduxState.action === 'getMyOrders' && <Loader />}
					{ordersReduxState.isError &&
						ordersReduxState.action === 'getMyOrders' && (
							<Message variant={'danger'}>{ordersReduxState.message}</Message>
						)}
					<Box
						m='0 0 0 0'
						height={'60vh'}
						sx={{
							'& .MuiDataGrid-root': {
								border: 'none',
							},
							'& .MuiDataGrid-cell': {
								borderBottom: 'none',
							},
							'& .MuiDataGrid-columnHeaders': {
								borderBottom: 'none',
							},
						}}
					>
						<DataGrid
							getRowId={(row) => row._id}
							rows={ordersReduxState.orderList || []}
							columns={columns}
							components={{ Toolbar: GridToolbar }}
							rowsPerPageOptions={[5, 10, 20]}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							pagination
						/>
					</Box>
				</Col>
				<Col md={12}>
					<h2>Need Reviews</h2>
					{reviewsReduxState.isLoading &&
						reviewsReduxState.action === 'getNeedReviewProducts' && <Loader />}
					{reviewsReduxState.isError &&
						reviewsReduxState.action === 'getNeedReviewProducts' && (
							<Message variant={'danger'}>{reviewsReduxState.message}</Message>
						)}
					<Box
						m='0 0 0 0'
						height={'60vh'}
						sx={{
							'& .MuiDataGrid-root': {
								border: 'none',
							},
							'& .MuiDataGrid-cell': {
								borderBottom: 'none',
							},
							'& .MuiDataGrid-columnHeaders': {
								borderBottom: 'none',
							},
						}}
					>
						<DataGrid
							getRowId={(row) => row._id}
							rows={reviewsReduxState.needReviewList || []}
							columns={reviewColumns}
							components={{ Toolbar: GridToolbar }}
							rowsPerPageOptions={[5, 10, 20]}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							pagination
						/>
					</Box>
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

export default ProfileScreen
