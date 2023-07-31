import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
	return (
		<div className='rating'>

		</div>
	)
}

Rating.defaultProps = {
	color: '#f8e825',
}
Rating.prototype = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
}
export default Rating
