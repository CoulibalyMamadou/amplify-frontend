import './allocation-settings.scss'
import ConstraintItem from './constraint-item/constraint-item'
import ConstrainTypeEqualShare from './constraint-item/constraint-type-equal-share/constrain-type-equal-share'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const AllocationSettings = ({
	listConstraint,
	layers = [],
	reinsurer = {},
	changed,
	removed
}) => {
	const [allocationConstraint, setAllocationConstraint] = useState([])
	const [equalShare, setEqualShare] = useState(false)

	useEffect(() => {
		setAllocationConstraint(listConstraint)
	}, [listConstraint])

	const update = (id, dataValue) => {
		changed(id, dataValue)
	}

	const removeConstraint = (idLayer) => {
		removed(idLayer)
	}

	const updateEqualShare = (fieldValue) => {
		setEqualShare(fieldValue)
	}

	return (
		<>
			<section className='allocation-constraint-list'>
				<ConstrainTypeEqualShare onChanged={updateEqualShare} />
				{allocationConstraint.map((constraint, index) => {
					return (
						<ConstraintItem
							key={index}
							id={index}
							type='interval'
							layers={layers}
							defaultConstraint={constraint}
							onChanged={update}
							onRemoved={removeConstraint}
							isEqualShare={equalShare}
							reinsurer={reinsurer}
						/>
					)
				})}
			</section>
		</>
	)
}

AllocationSettings.propTypes = {
	listConstraint: PropTypes.array,
	layers: PropTypes.array,
	changed: PropTypes.func,
	reinsurer: PropTypes.object,
	removed: PropTypes.func
}

export default AllocationSettings
