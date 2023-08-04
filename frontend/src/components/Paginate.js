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
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            keyword && category
              ? `/shop/search/${keyword}/category/${category}/page/${x + 1}`
              : keyword
              ? `/shop/search/${keyword}/page/${x + 1}`
              : category
              ? `/shop/category/${category}/page/${x + 1}`
              : `/shop/page/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
			</Pagination>
		)
	)
}

export default Paginate
