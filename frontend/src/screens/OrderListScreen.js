import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Popconfirm } from 'antd'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { getAllOrders } from '../features/order/orderActions'
import { resetOrderStatus } from '../features/order/orderDataSlice'
import { deleteUser, getAllUsers } from '../features/users/UserActions'
import { resetUsersListStatus } from '../features/users/userListDataSlice'
import { Box } from '@mui/material'

const OrderListScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const ordersReduxState = useSelector((state) => state.orders)
	const userInfo = useSelector((state) => state.logInDetails.userInfo)

	if (ordersReduxState.action === 'deleteOrder' && ordersReduxState.isSuccess) {
		toast.success(ordersReduxState.message)
		dispatch(getAllUsers())
		dispatch(resetUsersListStatus())
	}
	if (ordersReduxState.action === 'deleteOrder' && ordersReduxState.isError) {
		toast.error(ordersReduxState.message)
		dispatch(resetOrderStatus())
	}
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getAllOrders())
		} else {
			navigate('/')
		}
	}, [dispatch, navigate, userInfo])
	const deleteHandler = (id) => {
		dispatch(deleteUser(id))
	}

	const columns = [
		{ field: '_id', flex: 1, headerName: 'ID' },
		{
			field: 'user',
			flex: 1,
			headerName: 'EMAIL',
			renderCell: ({ value }) => {
				return value.email
			},
		},
		{ field: 'totalPrice', flex: 1, headerName: 'TOTAL AMOUNT' },
		{ field: 'createdAt', flex: 1, headerName: 'DATE' },
		{
			field: 'shipping',
			headerName: 'SHIPPING',
			headerAlign: 'center',
			flex: 1,
			renderCell: ({ value }) => {
				return value.isShipped ? (
					value.shippedAt
				) : (
					<i className='fas fa-times' style={{ color: 'red' }}></i>
				)
			},
		},
		{
			field: 'delivery',
			flex: 1,
			headerName: 'DELIVERY',
			headerAlign: 'center',
			renderCell: ({ value }) => {
				return value.isDelivered ? (
					value.deliveredAt
				) : (
					<i className='fas fa-times' style={{ color: 'red' }}></i>
				)
			},
		},
		{
			field: 'actions',
			flex: 1,
			headerName: 'Actions',
			headerAlign: 'center',
			renderCell: ({ id }) => {
				return (
					<Button
						variant='light'
						className='btn-sm'
						onClick={() => navigate(`/orders/${id}`)}
					>
						<i className='fas fa-edit'></i>
					</Button>
				)
			},
		},
	]

	return (
		<>
			<h1>Orders</h1>
			{ordersReduxState.isLoading ? (
				<Loader />
			) : ordersReduxState.isError ? (
				<Message variant={'danger'}>{ordersReduxState.message}</Message>
			) : (
				<Box
					m='0 0 0 0'
					height='75vh'
					sx={{
						'& .MuiDataGrid-root': {
							border: 'none',
						},
						'& .MuiDataGrid-cell': {
							borderBottom: 'none',
						},
						'& .name-column--cell': {
							color: 'green',
						},
						'& .MuiDataGrid-columnHeaders': {
							borderBottom: 'none',
						},
					}}
				>
					<DataGrid
						getRowId={(row) => row._id}
						rows={ordersReduxState.adminOrderList || []}
						columns={columns}
						components={{ Toolbar: GridToolbar }}
						// onSelectionModelChange={(ids) => {
						// 	const selectedIDs = new Set(ids);
						// 	const selectedRowData = products.filter((row) =>
						// 		selectedIDs.has(row._id.toString())
						// 	);
						// 	console.log(selectedRowData);
						// }}
					/>
				</Box>
			)}
		</>
	)
}

export default OrderListScreen
