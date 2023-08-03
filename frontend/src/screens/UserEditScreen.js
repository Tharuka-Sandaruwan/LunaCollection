import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getProfile, getUser, updateUser } from '../features/users/UserActions'
import Message from '../components/Message'
import { getMyOrders, getUserOrders } from '../features/order/orderActions'
import {
	getNeedReviewProducts,
	reviewedProduct,
	reviewProduct,
} from '../features/reviews/reviewsAction'
import { resetOrderStatus } from '../features/order/orderDataSlice'
import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Modal, Popconfirm } from 'antd'
import Rating from '../components/Rating'

function UserEditScreen() {
	const { id: userId } = useParams()
	const [searchParams] = useSearchParams()
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)
	const [ordersList, setOrdersList] = useState([])
	const [pageSize, setPageSize] = useState(5)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [productID, setProductID] = useState()
	const [rating, setRating] = useState('')
	const [comment, setComment] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const ordersReduxState = useSelector((state) => state.orders)
	const reviewsReduxState = useSelector((state) => state.reviews)
	const profileDetails = useSelector((state) => state.profileDetails)
	const usersReduxState = useSelector((state) => state.users)
	const logInReduxUserInfo = useSelector((state) => state.logInDetails.userInfo)
	const redirect = searchParams.get('redirect')
		? searchParams.get('redirect')
		: ''
	useEffect(() => {
		if (logInReduxUserInfo && logInReduxUserInfo.isAdmin) {
			if (
				!usersReduxState.userInfo ||
				(usersReduxState.userInfo && usersReduxState.userInfo._id !== userId)
			) {
				dispatch(getUser(userId))
				dispatch(getUserOrders(userId))
				dispatch(reviewedProduct(userId))
			} else {
				setName(usersReduxState.userInfo.name)
				setEmail(usersReduxState.userInfo.email)
				setIsAdmin(usersReduxState.userInfo.isAdmin)
			}
		} else {
			navigate('/')
		}
	}, [dispatch, logInReduxUserInfo, navigate, userId, usersReduxState.userInfo])
	if (
		ordersReduxState.orderList &&
		ordersReduxState.orderList.length > 0 &&
		ordersList.length === 0
	) {
		setOrdersList(ordersReduxState.orderList)
		dispatch(resetOrderStatus())
	}
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUser({ id: userId, object: { name, email, isAdmin } }))
	}
	const showModal = (id) => {
		setIsModalOpen(true)
		setProductID(id)
		const review = reviewsReduxState.reviewedList
			.find((value) => value._id === id)
			.reviews.find((value) => value.user === userId)
		setComment(review.comment)
		setRating(review.rating)
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
	const deleteHandler = () => {}
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
			headerName: 'IMAGE',
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

		{
			field: 'reviews',
			flex: 1,
			headerName: 'RATING',
			renderCell: ({ value }) => {
				const review = value.find((review) => review.user === userId)
				return <Rating value={review.rating} />
			},
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
							VIEW REVIEW
						</Button>
						<Popconfirm
							title='Delete the Review'
							description='Are you sure to delete this review?'
							onConfirm={() => deleteHandler(id)}
							okText='Yes'
							cancelText='No'
						>
							<Button variant='danger' className='btn-sm'>
								<i className='fas fa-trash'></i>
							</Button>
						</Popconfirm>
					</>
				)
			},
		},
	]

	return (
		<>
			<Button
				variant='light'
				className='btn-sm'
				onClick={() => {
					if (redirect === '') {
						navigate('/admin/userlist')
					} else if (redirect === 'orderlist') {
						navigate('/admin/orderlist')
					}
				}}
			>
				Go Back
			</Button>
			<Row>
				<Col md={3}>
					<h1>Edit User</h1>
					{usersReduxState.action === 'getUser' && usersReduxState.isLoading ? (
						<Loader />
					) : usersReduxState.action === 'getUser' &&
					  usersReduxState.isError ? (
						<Message variant={'danger'}>{usersReduxState.message}</Message>
					) : (
						<>
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
										disabled={
											logInReduxUserInfo && usersReduxState.userInfo
												? logInReduxUserInfo.isAdmin &&
												  usersReduxState &&
												  logInReduxUserInfo._id !==
														usersReduxState.userInfo._id
												: true
										}
										onChange={(e) => setName(e.target.value)}
									></Form.Control>
								</Form.Group>
								<Form.Group controlId='email'>
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter email'
										value={email}
										disabled={
											logInReduxUserInfo && usersReduxState.userInfo
												? logInReduxUserInfo.isAdmin &&
												  usersReduxState &&
												  logInReduxUserInfo._id !==
														usersReduxState.userInfo._id
												: true
										}
										onChange={(e) => setEmail(e.target.value)}
									></Form.Control>
								</Form.Group>
								<Form.Group controlId='idAdmin'>
									<Form.Check
										type='checkbox'
										label='isAdmin'
										checked={isAdmin}
										onChange={(e) => setIsAdmin(e.target.checked)}
									></Form.Check>
								</Form.Group>
								{usersReduxState.action === 'updateUser' &&
									usersReduxState.isSuccess && (
										<Message variant={'success'}>
											User Successfully updated
										</Message>
									)}
								{usersReduxState.action === 'updateUser' &&
									usersReduxState.isError && (
										<Message variant={'danger'}>
											{usersReduxState.message}
										</Message>
									)}
								<Button
									className='my-3'
									type='submit'
									variant='primary'
									onClick={() => submitHandler}
									disabled={
										usersReduxState.action === 'updateUser' &&
										usersReduxState.isLoading
									}
								>
									Update
								</Button>
							</Form>
						</>
					)}
				</Col>
				<Col md={9}>
					<h2>User Orders</h2>
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
					<h2>Reviews Made</h2>
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
							rows={reviewsReduxState.reviewedList || []}
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
						<Button key={'back'} onClick={handleCancel}>
							CLOSE
						</Button>
					</>,
				]}
			>
				
			</Modal>
		</>
	)
}

