import * as PropTypes from 'prop-types'
import './reinsurer-subjectivities.scss'
import { useEffect, useState } from 'react'
import { CONSTRAINT_TYPE } from '../../../../../constants'

const QuotationConstraints = ({
	reinsurer,
	constraintQuotation,
	equalShare,
	program
}) => {
	/**
	 * Display quote contraints
	 */
	const [displayConstraintQuote, setDisplayConstraintQuote] = useState([])
	/**
	 * Display equal share allocation
	 */
	const [equal, setEqual] = useState([])
	/**
	 * Layer list
	 */
	const layerList = []
	program?.layers &&
		program.layers.map((elem) => {
			return layerList.push(elem._id)
		})

	/**
	 * Return an object with layer id
	 */
	const options = layerList && [
		layerList.map((layer, index) => {
			return { value: layer, displayValue: 'Layer ' + (index + 1) }
		})
	]

	/**
	 * Compare target with layer id and retrun displayValue
	 * @param {*} target
	 * @returns {string}
	 */
	const labelValue = (target) => {
		if (target !== 'Overall program') {
			const recup = options[0].find((option) => option.value === target) || ''
			return recup.displayValue || ''
		}
	}

	/**
	 * Return list of the quote constraints
	 * @param {*} constraintQuotation
	 */
	const constraintQuoteToDisplay = (constraintQuotation) => {
		let infoDisplay = ''

		if (equalShare) {
			infoDisplay = `${reinsurer} requires an equal share allocation on every layers`
			setEqual(infoDisplay)
		}
		const display =
			constraintQuotation &&
			constraintQuotation.map((elem, index) => {
				const type = elem.type
				const value = elem.value
				const layer = labelValue(elem.target)

				if (type === CONSTRAINT_TYPE.MAXIMUM) {
					if (layer) {
						infoDisplay = `Reinsurer ${reinsurer} requires a maximum share of ${value}% of ${layer}`
					} else {
						infoDisplay = `Reinsurer ${reinsurer} requires a maximum share of ${value}% of Overall program`
					}
				}
				if (type === CONSTRAINT_TYPE.CONDITIONAL_MINIMUM) {
					if (layer) {
						infoDisplay = `Reinsurer ${reinsurer} requires a minimum share of ${value}% of ${layer} if bellow market price`
					} else {
						infoDisplay = `Reinsurer ${reinsurer} requires a minimum share of ${value}% of Overall program if bellow market price`
					}
				}

				if (type === CONSTRAINT_TYPE.RELATIVE_MINIMUM) {
					if (layer) {
						infoDisplay = `Reinsurer ${reinsurer} requires a minimum share of ${value}% of its allocation on ${layer}`
					} else {
						infoDisplay = `Reinsurer ${reinsurer} requires a minimum share of ${value}% of its allocation on Overall program`
					}
				}
				if (type === CONSTRAINT_TYPE.RELATIVE_MAXIMUM) {
					if (layer) {
						infoDisplay = `Reinsurer ${reinsurer} requires a maximum share of ${value}% of its allocation on ${layer}`
					} else {
						infoDisplay = `Reinsurer ${reinsurer} requires a maximum share of ${value}% of its allocation on Overall program`
					}
				}

				return (
					<ul key={index}>
						<li>{infoDisplay}</li>
					</ul>
				)
			})
		setDisplayConstraintQuote(display)
	}

	useEffect(() => {
		constraintQuoteToDisplay(constraintQuotation)
	}, [constraintQuotation])

	return (
		<div className='quotation-constraints'>
			<h4>Reinsurer Subjectivities</h4>
			<div>{displayConstraintQuote}</div>
			<div className='equal-share'>{equal}</div>
		</div>
	)
}

QuotationConstraints.propTypes = {
	constraintQuotation: PropTypes.array,
	reinsurer: PropTypes.string,
	equalShare: PropTypes.bool,
	program: PropTypes.object
}

export default QuotationConstraints
