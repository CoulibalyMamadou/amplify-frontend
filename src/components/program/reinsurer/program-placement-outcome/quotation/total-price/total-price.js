import * as PropTypes from 'prop-types'
import './total-price.scss'
import { useEffect, useState } from 'react'

const TotalPrice = ({ program, quotation }) => {
	const [sum, setSum] = useState(0)
	const newQuotation = quotation && quotation[0]

	useEffect(() => {
		console.log('quotation coming : ', newQuotation)
		console.log('quotation coming : ', program)
		TotalPrice(newQuotation)
	}, [newQuotation, program])

	/**
	 * Return premium income * sum of max price of each layer
	 * @param {*} quote
	 * @returns {string}
	 */
	const TotalPrice = (quote) => {
		const premiumIncome = program?.premiumIncome

		const array = []
		quote &&
			quote.map((elem) => {
				return array.push(maxPrice(elem.quote))
			})

		/**
		 * Return the sum of the array
		 */
		const sumPrice = array.reduce((a, b) => a + b, 0) / 100

		/**
		 * Return the sum * by prmium income
		 */
		const num = sumPrice * premiumIncome

		/**
		 * Return value with 4 decimal
		 */
		setSum(num.toFixed(4))
	}

	/**
	 * Return max value of the array quote
	 * @param {*} arr
	 * @returns {number}
	 */
	const maxPrice = (arr) => {
		console.log('array : ', arr)
		return Math.max(...arr.map((max) => max?.price || 0), 0)
	}

	return (
		<section className='totalPrice'>
			<p>Total price of reinsurer: {sum} (M€)</p>
		</section>
	)
}

TotalPrice.propTypes = {
	program: PropTypes.object,
	quotation: PropTypes.array
}

export default TotalPrice
