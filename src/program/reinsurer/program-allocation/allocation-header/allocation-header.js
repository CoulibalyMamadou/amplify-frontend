import './allocation-header.scss'
import AllocationConstraintInfo from './allocation-constraint-info/allocation-constraint-info'
import { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'

const AllocationHeader = ({
	listConstraint = [],
	insurer = {},
	office = {},
	layers = []
}) => {
	const [constraintList, setConstraintList] = useState(listConstraint)
	const [reinsurerConstraint, setReinsurerConstraint] = useState([])

	console.log('setConstraintList header : ', constraintList)
	console.log('reinsurerConstraint  id : ', insurer)
	console.log('reinsurerConstraint office id : ', office)
	console.log('reinsurerConstraint for data constraint : ', reinsurerConstraint)
	console.table(reinsurerConstraint)

	useEffect(() => {
		updateReinsurerConstraint()
	}, [constraintList])

	useEffect(() => {
		setConstraintList(listConstraint)
		// updateReinsurerConstraint()
	}, [listConstraint])

	const updateReinsurerConstraint = () => {
		const listConstraint = constraintList.filter((constraint, index) =>
			constraint.groupOffice.offices.includes(insurer.office)
		)
		setReinsurerConstraint((prevState) => [...listConstraint])
	}

	return (
		<>
			<section className='allocation-header'>
				<h1 className='header-title'>Allocation constraints</h1>
				{constraintList.length > 0 ? (
					<AllocationConstraintInfo
						listConstraint={constraintList}
						insurer={insurer.firstName + ' ' + insurer.lastName}
						office={office.name}
						layers={layers}
					/>
				) : (
					<p>No constraints defined for you for this program</p>
				)}
			</section>
		</>
	)
}

AllocationHeader.propTypes = {
	listConstraint: PropTypes.array,
	layers: PropTypes.array,
	insurer: PropTypes.object,
	office: PropTypes.object
}

export default AllocationHeader
