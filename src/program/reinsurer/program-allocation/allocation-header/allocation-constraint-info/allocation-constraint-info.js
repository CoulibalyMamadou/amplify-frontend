import './allocation-constraint-info.scss'
import ConstraintInfoItem from './constraint-info-item/constraint-info-item'
import { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'

const AllocationConstraintInfo = ({
	listConstraint = [],
	insurer = '',
	office = '',
	layers = []
}) => {
	const options = [
		...layers.map((layer, index) => {
			return { value: layer._id, displayValue: 'Layer ' + (index + 1) }
		})
	]
	const [constraintList, setConstraintList] = useState(listConstraint)

	useEffect(() => {
		setConstraintList(listConstraint)
	}, [listConstraint])

	const labelValue = (target) => {
		const recup = options.find((option) => option.value === target) || ''

		return recup.displayValue || 'Overall program'
	}

	console.log('info layers : ', layers)
	console.log('listConstraint : ', listConstraint)
	console.log('constraintList : ', constraintList)

	return (
		<>
			<section className='allocation-constraint-info'>
				{constraintList.map((constraint, index) => {
					return (
						<ConstraintInfoItem
							key={index}
							constraintType={constraint.constraint.type}
							constraintValue={constraint.constraint.value}
							constraintTarget={labelValue(constraint.constraint.target)}
							// constraintTarget={constraint.constraint.target}
							office={office}
						/>
					)
				})}
			</section>
		</>
	)
}

AllocationConstraintInfo.propTypes = {
	listConstraint: PropTypes.array,
	layers: PropTypes.array,
	insurer: PropTypes.string,
	office: PropTypes.string
}

export default AllocationConstraintInfo
