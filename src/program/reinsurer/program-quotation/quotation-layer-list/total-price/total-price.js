import * as PropTypes from 'prop-types'
import './total-price.scss'
import { useEffect, useState } from 'react'

const TotalPrice = ({
	program,
	quotation = [
		{
			quote: {
				quantity: 0,
				price: 0
			}
		}
	]
}) => {
	const [sum, setSum] = useState(0)

	useEffect(() => {
		console.log('quotation coming : ', quotation[0])
		console.log('quotation coming : ', program[0])
		TotalPrice(quotation)
	}, [quotation, program])

	/**
	 * Return premium income * sum of max price of each layer
	 * @param {*} quote
	 * @returns {string}
	 */
	const TotalPrice = (quote) => {
		const premiumIncome = program?.premiumIncome
		console.log('quotation in : ', quote)
		console.log('quotation in  program: ', program)

		const array = []
		quote &&
			quote.map((elem) => {
				return array.push(maxPrice(elem.quote))
			})
		console.log('quotation in array : ', array)

		/**
		 * Return the sum of the array
		 */
		const sumPrice = array.reduce((a, b) => a + b, 0) / 100

		/**
		 * Return the sum * by prmium income
		 */
		const num = sumPrice * premiumIncome
		console.log('quotation in array num premiumIncome: ', premiumIncome)
		console.log('quotation in array num: ', num)

		/**
		 * Return value with 4 decimal
		 */
		setSum(num.toFixed(4))
		// return num.toFixed(4)
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
		<section className='budget-totalPrice'>
			<p>Budget of the cedent for the program : {program.cedentBudget} (M€)</p>
			<p>
				Total price of reinsurer: {/* TotalPrice(quotation) */} {sum} (M€)
			</p>
		</section>
	)
}

TotalPrice.propTypes = {
	program: PropTypes.object,
	quotation: PropTypes.array
}

export default TotalPrice
