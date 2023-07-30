import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/users/logInDataSlice'
import { resetWithProfile } from '../features/users/profileDataSlice'
import { useNavigate } from 'react-router-dom'
import { resetUsersList } from '../features/users/userListDataSlice'
import SearchBox from './SearchBox'

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userLogInDetails = useSelector((state) => state.logInDetails)
	const { userInfo } = userLogInDetails
	const logoutHandler = () => {
		dispatch(logout())
		dispatch(resetWithProfile())
		dispatch(resetUsersList())
		document.cookie =
			'isAdmin= ; expires = Thu, 01 Jan 1970 00:00:00 GMT path=/;'
		document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT path=/;'
		document.cookie = 'name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT path=/;'

		navigate('/')
	}
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>Luna Collection</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' className='ms-auto' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<SearchBox />
							<LinkContainer to='/'>
								<Nav.Link>
									<i className='fas fa-house'></i>Home
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/shop'>
								<Nav.Link>
									<i className='fas fa-shop'></i>Shop
								</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i>Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i>Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title={'Admin'} id='adminmenu'>
									<LinkContainer to='/admin/overview'>
										<NavDropdown.Item>Overview</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
