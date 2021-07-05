import './constrain-type-equal-share.scss'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Checkbox from '../../../../../../form-component/Checkbox/Checkbox'

const ConstrainTypeEqualShare = ({ isEqualShare, onChanged }) => {
	const constrain = {
		name: 'equalShare',
		label: 'Equal share allocation ',
		elementType: 'input',
		elementConfig: {
			type: 'checkbox',
			defaultValue: false
		},
		value: false,
		// validation: {
		//     required: true
		// },
		valid: false,
		touched: false
	}
	const [isChecked, setIsChecked] = useState(isEqualShare)

	useEffect(() => {
		setIsChecked(isEqualShare)
	}, [isEqualShare])

	const constraintFieldUpdateHandler = (id, fieldValue) => {
		console.log('Field value  : ', fieldValue)
		onChanged(fieldValue)
		// setIsChecked(fieldValue)
	}

	return (
		<section className='constraint-box'>
			{/* constrain parameter */}
			<section className='constraint-settings'>
				<Checkbox
					{...constrain}
					name={constrain.name}
					label={constrain.label}
					value={isChecked}
					// value={constrain.value}
					elementConfig={constrain.elementConfig}
					changed={constraintFieldUpdateHandler}
				/>
			</section>
			{/* constrain explanation */}

			<p className='constraint-explanation'>
				Reinsurer Quoter 1 {isChecked ? 'requires' : 'does not require'} an
				equal share allocation on every layers
			</p>
		</section>
	)
}

ConstrainTypeEqualShare.propTypes = {
	isEqualShare: PropTypes.bool,
	onChanged: PropTypes.func
}

export default ConstrainTypeEqualShare
