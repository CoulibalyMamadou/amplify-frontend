import './constraint-type-border.scss'
import Select from '../../../../../../../form-component/Select/Select'
import Input from '../../../../../../../form-component/Input/Input'
import * as PropTypes from 'prop-types'
import ConstraintExplanation from '../constraint-explanation/constraint-explanation'
import { useEffect, useState } from 'react'
import { CONSTRAINT_TYPE } from '../../../../../../../../constants'

/**
 * Constraint border type edit component
 * @param groupName
 * @param onChanged
 * @param layerList
 * @param defaultConstraint
 * @returns {JSX.Element}
 * @constructor
 */
const ConstraintTypeBorder = ({
	groupName,

	onChanged,
	layerList = [],

	defaultConstraint = {
		type: '',
		value: '',
		target: ''
	}
}) => {
	console.log('Defaut value', defaultConstraint)
	console.log('Defaut value target', defaultConstraint.target)
	console.log('New layer list', layerList)

	/**
	 * Constraint form builder
	 * @type {{type: {valid: boolean, touched: boolean, elementConfig: {options: [{displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, value: string}]}, name: string, elementType: string, value: string}, value: {valid: boolean, touched: boolean, elementConfig: {min: number, max: number, placeholder: number, type: string}, name: string, elementType: string, value: number}, target: {valid: boolean, touched: boolean, elementConfig: {options: ({displayValue: string, value: string}|{displayValue: string, value: string}|{displayValue: string, value: *})[]}, name: string, elementType: string, value: string}}}
	 */

	const constraintForm = {
		type: {
			name: 'constraintForm',
			// label: 'constraintForm',
			elementType: 'select',
			elementConfig: {
				options: [
					// { value: '', displayValue: '' },
					{ value: CONSTRAINT_TYPE.MAXIMUM, displayValue: 'Maximum share' },
					// {
					// 	value: CONSTRAINT_TYPE.RELATIVE_MAXIMUM,
					// 	displayValue: 'Relative maximum'
					// },
					// {
					// 	value: CONSTRAINT_TYPE.RELATIVE_MINIMUM,
					// 	displayValue: 'Relative minimum'
					// },
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
			// label: 'Limit (M€)',
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
		},
		target: {
			name: 'target',
			elementType: 'select',
			elementConfig: {
				options: [
					// { value: '', displayValue: '' },
					{ value: 'Overall program', displayValue: 'Overall program' },
					...layerList.map((layer, index) => {
						return {
							value: layer._id,
							displayValue: 'Layer ' + (index + 1)
						}
					})
				]
			},
			value: defaultConstraint.target,
			valid: false,
			touched: false
		}
	}
	console.log('Target Map', constraintForm.target.elementConfig.options)

	/**
	 * constraint structure
	 * @type {{type: string, value: string, target: string}}
	 */
	const constraintStructure = {
		type: '',
		value: '',
		target: ''
	}

	/**
	 * constraint value
	 */
	const [constraint, setConstraint] = useState(constraintStructure)
	/**
	 * Constraint type
	 */
	const [constraintType, setConstraintType] = useState()
	/**
	 * constraint value field
	 */
	const [constraintValue, setConstraintValue] = useState(0)
	/**
	 * constraint target field
	 */
	const [constraintTarget, setConstraintTarget] = useState()

	useEffect(() => {
		onChanged(constraint)
		console.log('constraint changed : ', constraint)
	}, [constraintType, constraintValue, constraintTarget])

	/**
	 * layer order by Id
	 * @returns {string|string}
	 */
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

	const updateType = (id, type) => {
		setConstraintType(type)
		const temp = constraint
		temp.type = type
		setConstraint((prevState) => temp)
		console.log('constraint : ', constraint)
	}

	const updateValue = (id, value) => {
		setConstraintValue(value)
		const temp = constraint
		temp.value = value
		setConstraint((prevState) => temp)
	}

	const updateTarget = (id, target) => {
		setConstraintTarget(target)
		const temp = constraint
		temp.target = target
		setConstraint((prevState) => temp)
	}
	console.log('la value is', constraintForm.type.value)
	return (
		<section className='constraint-box'>
			{/* constrain parameter */}
			<section className='constraint-settings'>
				{/* selected group target for constrain */}
				<span className='constraint-group'>
					<p>{groupName || 'All Reinsurer Group'}</p>
				</span>
				{/* constrain type */}
				<span className='constraint-type'>
					<Select
						// key={constraintForm.name}
						id={constraintForm.type.name}
						name={constraintForm.type.name}
						label={constraintForm.type.label}
						value={constraintForm.type.value}
						elementConfig={constraintForm.type.elementConfig}
						changed={updateType}
						// changed={(event) => programFieldChangedHandler(event, formElement.id)}
					/>
				</span>
				{/* constrain value */}
				<span className='constraint-value'>
					<Input
						// key={constraintForm.name}
						id={constraintForm.value.name}
						name={constraintForm.value.name}
						label={constraintForm.value.label}
						value={constraintForm.value.value}
						elementConfig={constraintForm.value.elementConfig}
						changed={updateValue}
						// changed={(event) => programFieldChangedHandler(event, formElement.id)}
					/>
				</span>
				{/* constrain target */}
				<span className='constraint-target'>
					<Select
						id={constraintForm.target.name}
						name={constraintForm.target.name}
						label={constraintForm.target.label}
						value={constraintForm.target.value}
						elementConfig={constraintForm.target.elementConfig}
						changed={updateTarget}
					/>
				</span>
			</section>
			{/* constrain explanation */}

			<ConstraintExplanation
				constraintType={constraintType}
				constraintValue={constraintValue}
				// constraintTarget={constraintTarget}
				constraintTarget={labelValue()}
				groupName={groupName}
			/>
		</section>
	)
}
ConstraintTypeBorder.propTypes = {
	groupName: PropTypes.string,
	defaultConstraint: PropTypes.object,
	layerList: PropTypes.array,
	onChanged: PropTypes.func
}

export default ConstraintTypeBorder
