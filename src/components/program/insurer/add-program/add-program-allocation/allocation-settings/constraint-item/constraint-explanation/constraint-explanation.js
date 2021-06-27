import './constraint-explanation.scss'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { CONSTRAINT_TYPE } from '../../../../../../../../constants'

const ConstraintExplanation = ({
	constraintType,
	constraintValue,
	constraintTarget,
	groupName
}) => {
	console.log('constraintTarget : ', constraintTarget)
	console.log('groupName : ', groupName)
	const [infoDisplay, setInfoDisplay] = useState()

	const updateMessage = () => {
		let message = ''
		switch (constraintType) {
			case CONSTRAINT_TYPE.MAXIMUM:
				message =
					'Every reinsurer in  ' +
					groupName +
					' cannot obtain more than a ' +
					constraintValue +
					'% share of ' +
					constraintTarget
				break
			case CONSTRAINT_TYPE.RELATIVE_MINIMUM:
				message =
					'Every reinsurer in ' +
					groupName +
					' Group obtains at least a ' +
					constraintValue +
					'% share of' +
					constraintTarget +
					' if below market price on '
				break
			case CONSTRAINT_TYPE.RELATIVE_MAXIMUM:
				message =
					'Every reinsurer in ' +
					groupName +
					' Group obtains more than ' +
					constraintValue +
					'% share of' +
					constraintTarget +
					' if below market price on '
				break
			case CONSTRAINT_TYPE.CONDITIONAL_MINIMUM:
				message =
					'If bellow market price, every reinsurer in group ' +
					groupName +
					' cannot obtain more than a ' +
					constraintValue +
					'% share of ' +
					constraintTarget
				break
			case CONSTRAINT_TYPE.EQUAL:
				message =
					'A single reinsurer of ' +
					groupName +
					' cannot obtain only ' +
					constraintValue +
					' share of ' +
					constraintTarget
				break
			default:
				message = 'Configure allocation'
				break
		}

		setInfoDisplay(message)
	}

	useEffect(() => {
		updateMessage()
	}, [constraintType, constraintValue, constraintTarget])

	return (
		<>
			{/* constrain explanation */}
			<p className='constraint-explanation'>{infoDisplay}</p>
		</>
	)
}
ConstraintExplanation.propTypes = {
	constraintType: PropTypes.string,
	constraintValue: PropTypes.number,
	constraintTarget: PropTypes.string,
	groupName: PropTypes.string
}

export default ConstraintExplanation
