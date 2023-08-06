import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LogInScreen from './screens/LogInScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import { PlaceOrderScreen } from './screens/PlaceOrderScreen'
import { OrderScreen } from './screens/OrderScreen'
import { getCookie } from './middleware/getCookie'
import { useDispatch } from 'react-redux'
import { logout } from './features/users/logInDataSlice'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import AddProductScreen from './screens/AddProductScreen'
import OrderListScreen from './screens/OrderListScreen'
import Landing from './screens/Landing'
import OverviewScreen from './screens/OverviewScreen'

const App = () => {
	const token = decodeURI(getCookie('token'))
	const dispatch = useDispatch()
	if (!token) {
		dispatch(logout())
	}

	return (
		<>
			<Router>
				<Header />
				<main>
					<Routes>
						<Route path='/' element={<Landing />} />
					</Routes>
					<Container className='printable'>
						<Routes>
							<Route path='/shop' element={<HomeScreen />} />
							<Route
								path='/shop/search/:keyword/page/:pageNumber'
								element={<HomeScreen />}
							/>
							<Route path='/shop/search/:keyword' element={<HomeScreen />} />
							<Route
								path='/shop/search/:keyword/category/:category'
								element={<HomeScreen />}
							/>
							<Route
								path='/shop/search/:keyword/category/:category/page/:pageNumber'
								element={<HomeScreen />}
							/>
							<Route path='/shop/page/:pageNumber' element={<HomeScreen />} />
							<Route
								path='/shop/category/:category/page/:pageNumber'
								element={<HomeScreen />}
							/>
							<Route path='/shop/category/:category' element={<HomeScreen />} />
							<Route path='/login' element={<LogInScreen />} />
							<Route path='/register' element={<RegisterScreen />} />
							<Route path='/profile' element={<ProfileScreen />} />
							<Route path='/product/:id' element={<ProductScreen />} />
							<Route path='/cart' element={<CartScreen />} />
							<Route path='/shipping' element={<ShippingScreen />} />
							<Route path='/placeorder' element={<PlaceOrderScreen />} />
							<Route path='/cart/:id' element={<CartScreen />} />
							<Route path='/orders/:id' element={<OrderScreen />} />
							<Route path='/admin/overview' element={<OverviewScreen />} />
							<Route path='/admin/userlist' element={<UserListScreen />} />
							<Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
							<Route
								path='/admin/productlist'
								element={<ProductListScreen />}
							/>
							<Route path='/admin/product/' element={<AddProductScreen />} />
							<Route path='/admin/product/:id' element={<AddProductScreen />} />
							<Route path='/admin/orderlist' element={<OrderListScreen />} />
							{/* by putting ? after id makes it optional */}
						</Routes>
					</Container>
				</main>
				<Footer />
			</Router>
			<ToastContainer />
		</>
	)
}
export default App
