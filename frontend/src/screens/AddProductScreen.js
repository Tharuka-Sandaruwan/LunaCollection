import React from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'

function AddProductScreen() {
	return (
		<>
			<Button
				variant='light'
				className='btn-sm'
				onClick={() => navigate('/admin/productlist')}
			>
				Go Back
			</Button>
			<FormContainer>
				<h1>{proID ? 'Edit Product' : 'Add Product'}</h1>
				{productReduxState.action === 'getProduct' &&
				productReduxState.isError ? (
					<Message variant={'danger'}>{productReduxState.message}</Message>
				) : (
					<>
						<Form onSubmit={submitHandler}>
							<Form.Group controlId='image'>
								<Form.Label>Product Image</Form.Label>
								<Form.Control
									type='file'
									name='image'
									accept='image/*'
									required={!proID}
									onChange={(e) => {
										setProductDetails((prevState) => ({
											...prevState,
											[e.target.name]: e.target.files[0],
										}))
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='imagePreview' className='text-center my-3'>
								<Image
									src={
										typeof productDetails.image === 'string'
											? productDetails.image
											: productDetails.image
											? URL.createObjectURL(productDetails.image)
											: ''
									}
									alt='Image Preview'
									style={{ height: '200px', width: '200px' }}
								/>
							</Form.Group>
							<Form.Group controlId='name'>
								<Form.Label>Product Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter product name'
									value={productDetails.name}
									onChange={changeHandler}
									name={'name'}
									required
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='category'>
								<Form.Label>Category</Form.Label>
								<Form.Select
									value={productDetails.category}
									onChange={changeHandler}
									name={'category'}
									required
								>
									<option key={'dummy'} value={null}>
										Select Category
									</option>
									{categories.map((item, index) => (
										<option key={index} value={item._id}>
											{item.name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
							<Form.Group controlId='shortDescription'>
								<Form.Label>Short Description</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter short description'
									value={productDetails.shortDescription}
									onChange={changeHandler}
									name={'shortDescription'}
									required
								/>
							</Form.Group>
							<Form.Group controlId='description'>
								<Form.Label>Product Description</Form.Label>
								<Form.Control
									as='textarea'
									placeholder='Long Description'
									rows={10}
									value={productDetails.description}
									onChange={changeHandler}
									name={'description'}
									required
								/>
							</Form.Group>
							<Form.Group controlId='price'>
								<Form.Label>Product Price</Form.Label>
								<Form.Control
									type='number'
									placeholder='Price'
									value={productDetails.price}
									onChange={changeHandler}
									name={'price'}
									required
								/>
							</Form.Group>
							<Form.Group controlId='countInStock'>
								<Form.Label>Product stock count</Form.Label>
								<Form.Control
									type='number'
									placeholder='Stock count'
									value={productDetails.countInStock}
									onChange={changeHandler}
									name={'countInStock'}
									required
								/>
							</Form.Group>

							{productReduxState.action === 'addProduct' &&
								productReduxState.isError && (
									<Message variant={'danger'}>
										{productReduxState.message}
									</Message>
								)}
							{productReduxState.action === 'updateProduct' &&
								productReduxState.isError && (
									<Message variant={'danger'}>
										{productReduxState.message}
									</Message>
								)}
							<Button
								className='my-3'
								type='submit'
								variant='primary'
								disabled={productReduxState.isLoading}
							>
								{proID ? 'Update' : 'Submit'}
							</Button>
						</Form>
					</>
				)}
			</FormContainer>
		</>
	)
}

export default AddProductScreen