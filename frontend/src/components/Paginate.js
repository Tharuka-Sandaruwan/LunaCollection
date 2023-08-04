import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({
	pages,
	page,
	isAdmin = false,
	keyword = '',
	category = '',
	price = '',
}) => {
	return (
		pages > 1 && (
			<Pagination>
				
			</Pagination>
		)
	)
}

export default Paginate
