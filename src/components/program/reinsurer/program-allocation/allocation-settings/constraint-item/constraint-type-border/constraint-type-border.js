import './constraint-type-border.scss'
import Select from '../../../../../../form-component/Select/Select'
import Input from '../../../../../../form-component/Input/Input'
import ConstraintItemExplain from '../constraint-item-explain/constraint-item-explain'
import { CONSTRAINT_TYPE } from '../../../../../../../constants'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const ConstraintTypeBorder = ({
	layerList = [],
	reinsurer = {},
	isEqualShare = false,
	defaultConstraint = {
		type: '',
		value: '',
		target: ''
	},
	onChanged
}) => {
	const constraintForm = {
		target: {
			name: 'target',
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: '', displayValue: '' },
					{ value: 'Overall program', displayValue: 'Overall program' },
					...layerList.map((layer, index) => {
						return { value: layer._id, displayValue: 'Layer ' + (index + 1) }
					})
				]
			},
			value: defaultConstraint.target || '',
			valid: false,
			touched: false
		},
		type: {
			name: 'type',
			// label: 'constraintForm',
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: '', displayValue: '' },
					{ value: CONSTRAINT_TYPE.MAXIMUM, displayValue: 'Maximum share' },
					{
						value: CONSTRAINT_TYPE.RELATIVE_MAXIMUM,
						displayValue: 'Relative maximum'
					},
					{
						value: CONSTRAINT_TYPE.RELATIVE_MINIMUM,
						displayValue: 'Relative minimum'
					},
					{
						value: CONSTRAINT_TYPE.CONDITIONAL_MINIMUM,
						displayValue: 'Conditional minimum share'
					}
				]
			},
			value: defaultConstraint.type || '',
			valid: false,
			touched: false
		},
		value: {
			name: 'value',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: 0,
				min: 0,
				max: 100
			},
			value: defaultConstraint.value || 0,
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		}
	}

	// console.log('default constraint coming  structure: ', defaultConstraint)

	const constraintStructure = {
		type: defaultConstraint.type || '',
		value: defaultConstraint.value || 0,
		target: defaultConstraint.target || ''
	}

	const [constraint, setConstraint] = useState(constraintStructure)

	const [constraintType, setConstraintType] = useState('')
	const [constraintValue, setConstraintValue] = useState(0)
	const [constraintTarget, setConstraintTarget] = useState('')
	const [targetOption, setTargetOption] = useState(
		constraintForm.target.elementConfig
	)
	const [typeOption, setTypeOption] = useState({
		...constraintForm.type.elementConfig
	})

	useEffect(() => {
		onChanged(constraint)
	}, [constraint])

	useEffect(() => {
		updateTypeOption()
		updateTargetOption()
	}, [isEqualShare, constraint.type])

	/**
	 * update type choice at equal share change
	 */
	const updateTypeOption = () => {
		let options = []
		isEqualShare
			? (options = {
					options: [
						{ value: '', displayValue: 'Choose type', disabled: true },
						{ value: CONSTRAINT_TYPE.MAXIMUM, displayValue: 'Maximum share' },
						{
							value: CONSTRAINT_TYPE.CONDITIONAL_MINIMUM,
							displayValue: 'Conditional minimum share'
						}
					]
			  })
			: (options = {
					options: [
						{ value: '', displayValue: 'Choose type', disabled: true },
						{ value: CONSTRAINT_TYPE.MAXIMUM, displayValue: 'Maximum share' },
						{
							value: CONSTRAINT_TYPE.RELATIVE_MAXIMUM,
							displayValue: 'Relative maximum'
						},
						{
							value: CONSTRAINT_TYPE.RELATIVE_MINIMUM,
							displayValue: 'Relative minimum'
						},
						{
							value: CONSTRAINT_TYPE.CONDITIONAL_MINIMUM,
							displayValue: 'Conditional minimum share'
						}
					]
			  })
		setTypeOption(options)
	}

	/**
	 * update target choice at equal share change
	 */

	const updateTargetOption = () => {
		let options = []
		isEqualShare
			? (options = {
					options: [
						// {
						// 	value: '',
						// 	displayValue: 'Select layers',
						// 	disabled: true
						// },
						{ value: 'Overall program', displayValue: 'Overall program' }
					]
			  })
			: constraint.type === 'rel_min' || constraint.type === 'rel_max'
			? (options = {
					options: [
						...layerList.map((layer, index) => {
							return { value: layer._id, displayValue: 'Layer ' + (index + 1) }
						})
					]
			  })
			: (options = {
					options: [
						// {
						// 	value: '',
						// 	displayValue: 'Select layers',
						// 	disabled: true
						// 	// hidden: true
						// },
						{ value: 'Overall program', displayValue: 'Overall program' },
						...layerList.map((layer, index) => {
							return { value: layer._id, displayValue: 'Layer ' + (index + 1) }
						})
					]
			  })
		setTargetOption(options)
	}
	console.log('QQQQQ', targetOption)
	/**
	 * update constraint type value on change
	 * @param id constraint Id
	 * @param type update type
	 */
	const updateType = (id, type) => {
		setConstraintType(type)
		const temp = constraint
		temp.type = type
		setConstraint((prevState) => temp)
		console.log('constraint : ', constraint)
	}

	/**
	 * update constraint value value on change
	 * @param id constraint Id
	 * @param value update value
	 */
	const updateValue = (id, value) => {
		setConstraintValue(value)
		const temp = constraint
		temp.value = value
		setConstraint((prevState) => temp)
	}

	/**
	 * update constraint target value on change
	 * @param id constraint Id
	 * @param target update target
	 */
	const updateTarget = (id, target) => {
		setConstraintTarget(target)
		const temp = constraint
		temp.target = target
		setConstraint((prevState) => temp)
	}

	const labelValue = () => {
		const {
			target: {
				elementConfig: { options }
			}
		} = constraintForm
		const recup =
			options.find((option) => option.value === constraintTarget) || ''

		return recup.displayValue || ''
	}

	return (
		<section className='constraint-border-box'>
			{/* constrain parameter */}
			<section className='constraint-border-settings'>
				{/* constrain target */}
				<span className='constraint-border-target'>
					<Select
						id={constraintForm.target.name}
						name={constraintForm.target.name}
						label={constraintForm.target.label}
						value={constraintForm.target.value}
						elementConfig={targetOption}
						changed={updateTarget}
					/>
				</span>
				{/* constrain type */}
				<span className='constraint-type'>
					<Select
						id={constraintForm.type.name}
						name={constraintForm.type.name}
						label={constraintForm.type.label}
						value={constraintForm.type.value}
						elementConfig={typeOption}
						changed={updateType}
					/>
				</span>
				{/* constrain value */}
				<span className='constraint-value'>
					<Input
						id={constraintForm.value.name}
						name={constraintForm.value.name}
						label={constraintForm.value.label}
						elementConfig={constraintForm.value.elementConfig}
						value={constraintForm.value.value}
						changed={updateValue}
					/>
				</span>
			</section>
			<ConstraintItemExplain
				reinsurer={reinsurer}
				constraintTarget={labelValue()}
				constraintType={constraintType}
				constraintValue={constraintValue}
			/>
		</section>
	)
}

ConstraintTypeBorder.propTypes = {
	layerList: PropTypes.array,
	isEqualShare: PropTypes.bool,
	reinsurer: PropTypes.object,
	defaultConstraint: PropTypes.object,
	onChanged: PropTypes.func
}

export default ConstraintTypeBorder
