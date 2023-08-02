import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Popconfirm } from 'antd'
import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteUser, getAllUsers } from '../features/users/UserActions'
import { resetUsersListStatus } from '../features/users/userListDataSlice'

const UserListScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const allUsersReduxState = useSelector((state) => state.allUsers)
	const userInfo = useSelector((state) => state.logInDetails.userInfo)

	if (
		allUsersReduxState.action === 'deleteUser' &&
		allUsersReduxState.isSuccess
	) {
		toast.success(allUsersReduxState.message)
		dispatch(getAllUsers())
		dispatch(resetUsersListStatus())
	}
	if (
		allUsersReduxState.action === 'deleteUser' &&
		allUsersReduxState.isError
	) {
		toast.error(allUsersReduxState.message)
		dispatch(resetUsersListStatus())
	}
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getAllUsers())
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
			field: 'name',
			flex: 1,
			headerName: 'NAME',
		},
		{ field: 'email', flex: 1, headerName: 'EMAIL' },
		{
			field: 'isAdmin',
			flex: 1,
			headerName: 'ADMIN',

			renderCell: ({ value }) =>
				value ? (
					<i className='fas fa-check' style={{ color: 'green' }}></i>
				) : (
					<i className='fas fa-times' style={{ color: 'red' }}></i>
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
							onClick={() => navigate(`/admin/user/${id}/edit`)}
						>
							<i className='fas fa-edit'></i>
						</Button>

						<Popconfirm
							title='Delete the Product'
							description='Are you sure to delete this product?'
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
			<h1>Users</h1>
			{allUsersReduxState.isLoading ? (
				<Loader />
			) : allUsersReduxState.isError ? (
				<Message variant={'danger'}>{allUsersReduxState.message}</Message>
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
						rows={allUsersReduxState.usersList || []}
						columns={columns}
						components={{ Toolbar: GridToolbar }}
					/>
				</Box>
			)}
		</>
	)
}

export default UserListScreen
