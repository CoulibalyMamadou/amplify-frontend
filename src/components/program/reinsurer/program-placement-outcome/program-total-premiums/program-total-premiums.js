import { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'
import './program-total-premiums.scss'

const PorgramTotalPremiums = ({ program, finalResult }) => {
	const [totalCost, setTotalCost] = useState(0)
	console.log('final ', finalResult)
	/**
	 * Return premium income * sum of max price of each layer
	 * @param {*} finalCost
	 */
	const TotalCost = (finalCost) => {
		const premiumIncome = program?.premiumIncome

		const array = []
		finalCost?.finalScenario?.allocations &&
			finalCost.finalScenario.allocations.map((elem) => {
				return array.push(elem.price)
			})
		console.log('array', array)
		/**
		 * Return the sum of the array
		 */
		const sumPrice = array.reduce((a, b) => a + b, 0) / 100
		/**
		 * Return the sum * by premium income
		 */
		const num = sumPrice * premiumIncome
		/**
		 * Return value with 4 decimal
		 */
		setTotalCost(num.toFixed(4))
	}

	useEffect(() => {
		TotalCost(finalResult)
	}, [finalResult])

	return (
		<div className={'scenario-total-cost-view'}>
			<p>Program total premiums: {totalCost} M€</p>
		</div>
	)
}

PorgramTotalPremiums.propTypes = {
	program: PropTypes.object,
	finalResult: PropTypes.object
}

export default PorgramTotalPremiums
