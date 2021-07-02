import './allocation-settings-review.scss'
import { FaPen } from 'react-icons/fa'
import * as PropTypes from 'prop-types'

const AllocationSettings = ({ program = {}, handleClick, constraint }) => {
	/**
	 * Return an object with layer id
	 */
	const options = program.layers && [
		program.layers.map((layer, index) => {
			return { value: layer._id, displayValue: 'Layer ' + (index + 1) }
		})
	]

	/**
	 * Compare target with layer id and retrun displayValue
	 * @param {*} target
	 * @returns {string}
	 */
	const labelValue = (target) => {
		const recup = options[0].find((option) => option.value === target) || ''
		return recup.displayValue || ''
	}
	/**
	 * Return the correct sentence regarding to the settings enter
	 * @param {*} constraint
	 * @returns {string}
	 */

	const constraintSentence = (constraint) => {
		const constraintList = [constraint]

		for (const constraintInfo of constraintList) {
			const layer = labelValue(constraintInfo.constraint.target)
			const type = constraintInfo.constraint.type
			const value = constraintInfo.constraint.value
			const name = constraintInfo.groupOffice.name || ''

			if (type === 'max') {
				if (layer) {
					return `A single reinsurer in ${name} Group cannot obtain more than a ${value}% share of ${layer}`
				} else {
					return `A single reinsurer in ${name} Group cannot obtain more than a ${value}% share of Overall program`
				}
			}
			if (type === 'cond_min') {
				if (layer) {
					return `If bellow market price, every reinsurer in ${name} should obtain at least a ${value}% share of ${layer}`
				} else {
					return `If bellow market price, every reinsurer in ${name} should obtain at least a  ${value}% share of Overall program`
				}
			}

			if (type === 'rel_min') {
				if (layer) {
					return `Every reinsurer in ${name} Group obtains at least a ${value}% share of ${layer}`
				} else {
					return `Every reinsurer in ${name} Group obtains at least a ${value}% share of Overall program`
				}
			}
			if (type === 'rel_max') {
				if (layer) {
					return `Every reinsurer in ${name} Group cannot obtain more than a  ${value}% share of ${layer}`
				} else {
					return `Every reinsurer in ${name} Group cannot obtain more than a ${value}% share of Overall program`
				}
			}
		}
	}
	return (
		<section className='allocation-settings'>
			<section className='display-modify'>
				<h3>Allocation settings</h3>
				{program.status === 'UNCOMPLETE' ? (
					<FaPen
						className='faPen'
						id='DOCUMENT'
						data-testid='DOCUMENT'
						onClick={handleClick}
					/>
				) : (
					<div></div>
				)}
			</section>
			<section className='display-allocation-settings'>
				{constraint.constraints &&
					constraint.constraints.map((constraint, index) => {
						return (
							<ul key={index}>
								<li>{constraintSentence(constraint)}</li>
							</ul>
						)
					})}
			</section>
		</section>
	)
}

AllocationSettings.propTypes = {
	program: PropTypes.object,
	handleClick: PropTypes.func,
	constraint: PropTypes.object
}
export default AllocationSettings
