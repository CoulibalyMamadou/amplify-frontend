import './constraint-item-explain.scss'
import { CONSTRAINT_TYPE } from '../../../../../../../constants'
import * as PropTypes from 'prop-types'

const ConstraintItemExplain = ({
	constraintType,
	constraintValue,
	constraintTarget,
	reinsurer
}) => {
	let infoDisplay = ''
	switch (constraintType) {
		case CONSTRAINT_TYPE.MAXIMUM:
			infoDisplay =
				'Reinsurer ' +
				reinsurer +
				' requires a maximum share of ' +
				constraintValue +
				'% of ' +
				constraintTarget
			break
		case CONSTRAINT_TYPE.RELATIVE_MINIMUM:
			infoDisplay =
				'Reinsurer ' +
				reinsurer +
				' requires a minimum share of ' +
				constraintValue +
				'% of its allocation on ' +
				constraintTarget
			break
		case CONSTRAINT_TYPE.RELATIVE_MAXIMUM:
			infoDisplay =
				'Reinsurer ' +
				reinsurer +
				' requires a maximum share of ' +
				constraintValue +
				'% of its allocation on ' +
				constraintTarget
			break
		case CONSTRAINT_TYPE.EQUAL:
			infoDisplay =
				reinsurer +
				' requires that obtain only ' +
				constraintValue +
				'% share of the ' +
				constraintTarget
			break
		case CONSTRAINT_TYPE.CONDITIONAL_MINIMUM:
			infoDisplay =
				'Reinsurer ' +
				reinsurer +
				' requires a minimum share of ' +
				constraintValue +
				'% of ' +
				constraintTarget +
				' if bellow market price'
			break
		default:
			infoDisplay = ' '
			break
	}

	return (
		<>
			<span className='constraint-display'>{infoDisplay}</span>
		</>
	)
}

ConstraintItemExplain.propTypes = {
	insurer: PropTypes.string,
	constraintType: PropTypes.string,
	constraintValue: PropTypes.number,
	constraintTarget: PropTypes.string,
	reinsurer: PropTypes.string
}

export default ConstraintItemExplain
