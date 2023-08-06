import { Divider } from 'antd'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<footer
			style={{
				backgroundColor: 'rgb(52,58,64)',
			}}
		>
			<Container style={{ color: 'white!important' }}>
				<Row className='justify-content-md-center mx-0 py-3'>
					<Col>
						<h2 className=' text-white'>+94-77-100 2158 </h2>
						<br />
						<h4 className=' text-white'>
							109G
							<br /> Theresa Mawatha,
							<br /> Kandana
							<br /> 11320
						</h4>
						<br />
						<a href='mailto:tharindurcg1@gmail.com'>
							<h6 className=' text-white'>webmaster@example.com </h6>{' '}
						</a>
					</Col>
					<Col>
						<h2 className=' text-white'>company </h2>
						<br />

						<a href='#'>
							<h5 className=' text-white'>about us </h5>{' '}
						</a>
						<br />
						<a href='#'>
							<h5 className=' text-white'>contact us </h5>{' '}
						</a>
						<br />
						<a href='#'>
							<h5 className=' text-white'>privacy policy</h5>{' '}
						</a>
						<br />
						<a href='#'>
							<h5 className=' text-white'>return policy</h5>{' '}
						</a>
						<br />
					</Col>
					<Col className='text-start '>
						<h2 className=' text-white'>help </h2>
						<br />

						<a href='#'>
							<h5 className=' text-white'>terms n conditions </h5>{' '}
						</a>
						<br />
						<a href='#'>
							<h5 className=' text-white'>return policy </h5>{' '}
						</a>
						<br />
						<a href='#'>
							<h5 className=' text-white'>we are hiring</h5>{' '}
						</a>
						<br />
						<div>
							<img
								style={{ width: '50px', marginRight: '10px' }}
								src='/images/visa.png'
							></img>
							<img
								style={{ width: '50px', marginRight: '10px' }}
								src='/images/maestro.png'
							></img>
							<img
								style={{ width: '50px', marginRight: '10px' }}
								src='/images/paypal.png'
							></img>
						</div>
					</Col>
				</Row>
				<Divider style={{ backgroundColor: 'white' }} />
				<Row className='justify-content-md-center mx-0 py-3 text-white'>
					2023 copyrights@LunaCollectionLK
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
