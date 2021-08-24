import * as PropTypes from 'prop-types'
import './cedent-subjectivities.scss'
import { useEffect, useState } from 'react'
import { CONSTRAINT_TYPE } from '../../../../../constants/index'

const CendentSubjectivities = ({ constraint, reinsurer, program }) => {
	/**
	 * Dsiplay constraints
	 */
	const [displayConstraint, setDisplayConstraint] = useState([])
	/**
	 * Layer list
	 */
	const layerList = []
	program.layers &&
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
	 * Return list of the constraints
	 * @param {*} constraint
	 */
	const constraintToDisplay = (constraint) => {
		const display =
			constraint.constraints &&
			constraint.constraints.map((elem, index) => {
				const type = elem.constraint.type
				const value = elem.constraint.value
				const layer = labelValue(elem.constraint.target)
				const insurer = program.office.name
				let infoDisplay = ''
				if (type === CONSTRAINT_TYPE.MAXIMUM) {
					if (layer) {
						infoDisplay = `${insurer} requires that ${reinsurer} cannot obtain more than a ${value}% share of ${layer}`
					} else {
						infoDisplay = `${insurer} requires that ${reinsurer} cannot obtain more than a ${value}% share of Overall program`
					}
				}
				if (type === CONSTRAINT_TYPE.CONDITIONAL_MINIMUM) {
					if (layer) {
						infoDisplay = `${insurer} requires that ${reinsurer} obtains at least a ${value}% share of ${layer} if below market price`
					} else {
						infoDisplay = `${insurer} requires that ${reinsurer} obtains at least a ${value}% share of Overall program if below market price`
					}
				}

				if (type === CONSTRAINT_TYPE.RELATIVE_MINIMUM) {
					if (layer) {
						infoDisplay = `${insurer} requires that ${reinsurer} obtains at least a ${value}% share of ${layer} if below market price`
					} else {
						infoDisplay = `${insurer} requires that ${reinsurer} obtains at least a ${value}% share of Overall program if below market price`
					}
				}
				if (type === CONSTRAINT_TYPE.RELATIVE_MAXIMUM) {
					if (layer) {
						infoDisplay = `${insurer} requires that ${reinsurer} obtains at least a ${value}% share of the program if below market price${layer}`
					} else {
						infoDisplay = `${insurer} requires that ${reinsurer} obtains at least a ${value}% share of the program if below market price Overall program`
					}
				}
				return (
					<ul key={index}>
						<li>{infoDisplay}</li>
					</ul>
				)
			})
		setDisplayConstraint(display)
	}

	useEffect(() => {
		constraintToDisplay(constraint)
	}, [constraint])

	return (
		<div className='insurer-constraint'>
			<h4>Cedent Subjectivities</h4>
			<div>{displayConstraint}</div>
		</div>
	)
}

CendentSubjectivities.propTypes = {
	constraint: PropTypes.object,
	reinsurer: PropTypes.string,
	program: PropTypes.object
}

export default CendentSubjectivities
