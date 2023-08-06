import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Chart } from 'react-google-charts'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { getCookie } from '../middleware/getCookie'
import axios from 'axios'
const OverviewScreen = () => {
	const [overviewData, setOverviewData] = useState({
		usercount: 5,
		registercount: 5,
		productcount: 5,
		ordercount: 10,
	})
	const [dataOrders, setDataOrders] = useState([
		['Month', 'Sales Count'],
		['Jan', 12],
		['Feb', 12],
		['March', 12],
		['Apr', 12],
		['May', 12],
		['Jun', 12],
		['Jul', 12],
		['Aug', 12],
		['Sept', 12],
		['Oct', 12],
		['Nov', 12],
		['Dec', 12],
	])
	const [regData, setRegData] = useState([
		['Month', 'Register Count'],
		['1', 0],
		['2', 0],
		['3', 0],
		['4', 0],
		['5', 0],
		['6', 0],
		['7', 0],
		['8', 0],
		['9', 0],
		['10', 0],
		['11', 0],
		['12', 0],
	])
	useEffect(() => {
		const getData = async () => {
			const token = decodeURI(getCookie('token'))
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
			const { data } = await axios.get('/api/overview', config)
			console.log(data)
			setOverviewData((prevState) => ({
				...prevState,
				ordercount: data.orderCount,
				productcount: data.productCount,
				usercount: data.userCount,
			}))
			setDataOrders([['Month', 'Sales Count'], ...data.orderData])
			setRegData([['Month', 'Register Count'], ...data.regCount])
		}
		getData()
	}, [])

	const ordersOptions = {
		title: 'Sales Count for past 12 Month',
		legend: { position: 'none' },
		hAxis: { title: 'Month' },
		vAxis: { title: 'Sales Count' },
		chartArea: { width: '80%', height: '70%' },
		colors: ['#e0440e'],
	}
	const regOptions = {
		title: 'User Registration Count for past 12 Month',
		legend: { position: 'none' },
		hAxis: { title: 'Month' },
		vAxis: { title: 'Register Count' },
		chartArea: { width: '80%', height: '70%' },
		colors: ['#e0440e'],
	}
	return (
		<>
			<Row className='mt-5'>
				<Col>
					<Card variant='outlined'>
						<CardContent>
							<Typography variant='h5' component='h2'>
								Total User Count
							</Typography>

							<Typography variant='h4'>{overviewData.usercount}</Typography>
						</CardContent>
						<CardActions>
							<LinkContainer to='/admin/userlist'>
								<Button size='small'>Go to Users</Button>
							</LinkContainer>
						</CardActions>
					</Card>
				</Col>
				<Col>
					<Card variant='outlined'>
						<CardContent>
							<Typography variant='h5' component='h2'>
								Total Products Count
							</Typography>

							<Typography variant='h4'>{overviewData.productcount}</Typography>
						</CardContent>
						<CardActions>
							<LinkContainer to='/admin/productlist'>
								<Button size='small'>Go to Products</Button>
							</LinkContainer>
						</CardActions>
					</Card>
				</Col>
				<Col>
					<Card variant='outlined'>
						<CardContent>
							<Typography variant='h5' component='h2'>
								Total Orders for a Year
							</Typography>

							<Typography variant='h4'>{overviewData.ordercount}</Typography>
						</CardContent>
						<CardActions>
							<LinkContainer to='/admin/orderlist'>
								<Button size='small'>Go to Orders</Button>
							</LinkContainer>
						</CardActions>
					</Card>
				</Col>
			</Row>
			<Row>
				<Chart
					chartType='ColumnChart'
					width='100%'
					height='400px'
					data={dataOrders}
					options={ordersOptions}
				/>
			</Row>
			<Row>
				<Chart
					chartType='ColumnChart'
					width='100%'
					height='400px'
					data={regData}
					options={regOptions}
				/>
			</Row>
		</>
	)
}

export default OverviewScreen
