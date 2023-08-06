import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
	const [keyword, setKeyword] = useState('')
	const navigate = useNavigate()
	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			navigate(`/shop/search/${keyword}`)
		} else {
			navigate('/shop/')
		}
	}
	return (
		<Form
			onSubmit={submitHandler}
			style={{ display: 'flex', flexDirection: 'row' }}
		>
			<Form.Control
				type='text'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search Products..'
				className='mr-sm2 ml-sm-4'
			></Form.Control>
			<Button type='submit' variant='outline-success' className='p-2'>
				Search
			</Button>
		</Form>
	)
}

export default SearchBox
