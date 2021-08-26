import { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'
import './scenario-total-cost.scss'

const ScenarioTotalCost = ({ program, selected = { allocations: [] } }) => {
	const [totalCost, setTotalCost] = useState(0)
	/**
	 * Return premium income * sum of max price of each layer
	 * @param {*} finalCost
	 */
	const TotalCost = (finalCost) => {
		const premiumIncome = program?.premiumIncome

		const array = []
		finalCost &&
			finalCost.map((elem) => {
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
		TotalCost(selected.allocations)
	}, [selected.allocations])

	return (
		<div className={'scenario-total-cost-view'}>
			<p>Scenario total cost: {totalCost} M€</p>
		</div>
	)
}

ScenarioTotalCost.propTypes = {
	program: PropTypes.object,
	selected: PropTypes.object
}

export default ScenarioTotalCost
