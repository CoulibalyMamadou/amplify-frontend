import './allocation-settings.scss'
import ConstraintItem from './constraint-item/constraint-item'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

/**
 * Allocation settings edit component
 * @param listConstraint list constraint create
 * @param changed update list constraint
 * @param removed removed constraint
 * @returns {JSX.Element}
 * @constructor
 */
const AllocationSettings = ({ listConstraint, changed, removed }) => {
	/**
	 * constraint list
	 */
	const [constraint, setConstraint] = useState([])

	useEffect(() => {
		const updateConstraint = []
		listConstraint.map((value, index) => updateConstraint.push(value))
		console.log('constraint : ', constraint)
		setConstraint(updateConstraint)
	}, [listConstraint])

	/**
	 * Update constraint list
	 * @param id id target
	 * @param dataValue new value
	 */
	const update = (id, dataValue) => {
		changed(id, dataValue)
	}

	/**
	 * removed constraint item
	 * @param idLayer id constraint target
	 */
	const removeConstraint = (idLayer) => {
		removed(idLayer)
	}

	/**
	 * Content allocation settings
	 */
	return (
		<>
			<section className='allocation-constraint-list'>
				{constraint.map((constraint, index) => {
					return (
						<ConstraintItem
							key={index}
							id={index}
							type='interval'
							defaultConstraint={constraint.constraint}
							groupName={constraint.groupOffice.name}
							onChanged={update}
							onRemoved={removeConstraint}
						/>
					)
				})}

				{/* <ConstraintItem type='interval'/> */}
			</section>
		</>
	)
}

AllocationSettings.propTypes = {
	listConstraint: PropTypes.array,
	changed: PropTypes.func,
	removed: PropTypes.func
}

export default AllocationSettings
