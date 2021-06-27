import './constraint-info-item.scss'
import { CONSTRAINT_TYPE } from '../../../../../../../constants'
import * as PropTypes from 'prop-types'

const ConstraintInfoItem = ({
	constraintType = '',
	constraintValue = 0,
	constraintTarget = '',
	office = ''
}) => {
	let infoDisplay = ''

	console.log('constraint value  : ', constraintType)
	console.log('constraint office value  : ', office)

	switch (constraintType) {
		case CONSTRAINT_TYPE.MAXIMUM:
			infoDisplay =
				'Insurance Company requires that ' +
				office +
				' cannot obtain more than a ' +
				constraintValue +
				'% share of ' +
				constraintTarget
			break
		case CONSTRAINT_TYPE.RELATIVE_MAXIMUM:
			infoDisplay =
				'Insurance Company requires that ' +
				office +
				' obtains at least a ' +
				constraintValue +
				'% share of the program if below market price' +
				constraintTarget
			break
		case CONSTRAINT_TYPE.RELATIVE_MINIMUM:
			infoDisplay =
				'Insurance Company requires that ' +
				office +
				' obtains at least a ' +
				constraintValue +
				' share of ' +
				constraintTarget +
				' if below market price'
			break
		case CONSTRAINT_TYPE.CONDITIONAL_MINIMUM:
			infoDisplay =
				'Insurance Company requires that ' +
				office +
				' obtains at least a ' +
				constraintValue +
				' share of ' +
				constraintTarget +
				' if below market price'
			break
		case CONSTRAINT_TYPE.EQUAL:
			infoDisplay =
				'Insurance Company requires that ' +
				office +
				' cannot obtain only ' +
				constraintValue +
				' share of ' +
				constraintTarget
			break
		default:
			infoDisplay =
				'Insurance Company requires that ' +
				office +
				' ' +
				constraintTarget +
				' cannot obtain only ' +
				constraintValue +
				' share of the program'
			break
	}

	return (
		<>
			<span className='constraint-display'>{infoDisplay}</span>
		</>
	)
}

ConstraintInfoItem.propTypes = {
	constraintType: PropTypes.string,
	constraintValue: PropTypes.number,
	constraintTarget: PropTypes.string,
	office: PropTypes.string
}

export default ConstraintInfoItem
