import './allocation-settings.scss'
import ConstraintItem from './constraint-item/constraint-item'
import ConstrainTypeEqualShare from './constraint-item/constraint-type-equal-share/constrain-type-equal-share'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const AllocationSettings = ({
	listConstraint,
	isEqualShare,
	layers = [],
	reinsurer,
	changed,
	removed,
	equalShared
}) => {
	const [allocationConstraint, setAllocationConstraint] = useState([])
	const [equalShare, setEqualShare] = useState(false)

	useEffect(() => {
		setAllocationConstraint(listConstraint)
	}, [listConstraint])

	useEffect(() => {
		setEqualShare(isEqualShare)
	}, [isEqualShare])

	const update = (id, dataValue) => {
		changed(id, dataValue)
	}

	const removeConstraint = (idLayer) => {
		removed(idLayer)
	}

	const updateEqualShare = (fieldValue) => {
		// setEqualShare(fieldValue)
		equalShared(fieldValue)
	}

	return (
		<>
			<section className='allocation-constraint-list'>
				<ConstrainTypeEqualShare
					isEqualShare={isEqualShare}
					onChanged={updateEqualShare}
				/>
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
	isEqualShare: PropTypes.bool,
	changed: PropTypes.func,
	removed: PropTypes.func,
	equalShared: PropTypes.func,
	reinsurer: PropTypes.string
}

export default AllocationSettings
