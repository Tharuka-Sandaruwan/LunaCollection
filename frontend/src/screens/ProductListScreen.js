import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
	deleteProduct,
	getAllProducts,
	listProducts,
} from '../features/products/productAction'
import { resetProductListStatus } from '../features/products/productListDataSlice'

const ProductListScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const allProductsReduxState = useSelector((state) => state.productList)
	const userInfo = useSelector((state) => state.logInDetails.userInfo)

	if (
		allProductsReduxState.action === 'deleteProduct' &&
		allProductsReduxState.isSuccess
	) {
		toast.success(allProductsReduxState.message)
		dispatch(listProducts())
		dispatch(resetProductListStatus())
	}
	if (
		allProductsReduxState.action === 'deleteProduct' &&
		allProductsReduxState.isError
	) {
		toast.error(allProductsReduxState.message)
		dispatch(resetProductListStatus())
	}
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getAllProducts())
		} else {
			navigate('/')
		}
	}, [dispatch, navigate, userInfo])
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure ?')) {
			dispatch(deleteProduct(id))
		}
	}
	const AddProductHandler = () => {
		navigate('/admin/product')
	}
	const columns = [
		{ field: '_id', flex: 1, headerName: 'ID' },
		{
			field: 'name',
			flex: 1,
			headerName: 'NAME',
		},
		{ field: 'price', flex: 1, headerName: 'PRICE' },
		{
			field: 'category',
			flex: 1,
			headerName: 'CATEGORY',
			valueGetter: ({ value }) => value.name,
			// valueFormatter: ({ value }) => value.name,
			// renderCell: ({ value }) => value.name,
		},
		{
			field: 'countInStock',
			headerName: 'STOCK',
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
							onClick={() => navigate(`/admin/product/${id}`)}
						>
							<i className='fas fa-edit'></i>
						</Button>
						<Button
							variant='danger'
							className='btn-sm'
							onClick={() => deleteHandler(id)}
						>
							<i className='fas fa-trash'></i>
						</Button>
					</>
				)
			},
		},
	]
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-end'>
					<Button className='my-3 ' onClick={AddProductHandler}>
						<i className='fas fa-plus'></i>Add Product
					</Button>
				</Col>
			</Row>
			{allProductsReduxState.isLoading ? (
				<Loader />
			) : allProductsReduxState.isError ? (
				<Message variant={'danger'}>{allProductsReduxState.message}</Message>
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
						rows={allProductsReduxState.allProducts || []}
						columns={columns}
						components={{ Toolbar: GridToolbar }}
					/>
				</Box>
			)}
		</>
	)
}

export default ProductListScreen
