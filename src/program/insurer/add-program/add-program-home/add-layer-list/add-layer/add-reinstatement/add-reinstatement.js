import './add-reinstatement.scss'
import { useEffect, useState } from 'react'
import Input from '../../../../../../../form-component/Input/Input'
import Select from '../../../../../../../form-component/Select/Select'
import * as PropTypes from 'prop-types'
import { FaPlusCircle } from 'react-icons/fa'
import { MdDelete } from 'react-icons/all'
import Checkbox from '../../../../../../../form-component/Checkbox/Checkbox'

/**
 * Reinstatement Edit component
 * @param changed update function on change
 * @returns {JSX.Element}
 * @constructor
 */
const AddReinstatement = ({ changed = null }) => {
	/**
	 * Form description for reinstatement Edit
	 * @type {{clause: {valid: boolean, touched: boolean, elementConfig: {min: number, max: number, placeholder: number, type: string}, name: string, label: string, elementType: string, value: number}, number: {valid: boolean, touched: boolean, elementConfig: {min: number, placeholder: number, type: string}, name: string, label: string, elementType: string, value: number}, infinite: {valid: boolean, touched: boolean, elementConfig: {defaultValue: boolean, type: string}, name: string, label: string, elementType: string, value: boolean}, type: {valid: boolean, touched: boolean, elementConfig: {options: [{displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, value: string}]}, name: string, label: string, elementType: string, value: string}}}
	 */
	const reinstatementForm = {
		type: {
			name: 'type',
			label: 'Type',
			elementType: 'select',
			//	elementConfig: REINSTATEMENT_TYPE_OPTIONS,
			value: 'Pro rata capita',
			valid: false,
			touched: false
		},
		infinite: {
			name: 'infinite',
			label: 'Infinite reinstatement',
			elementType: 'checkbox',
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
		},
		number: {
			name: 'number',
			label: 'Number of reinstatement',
			elementType: 'input',
			elementConfig: {
				// type: 'number',
				type: 'text',
				placeholder: 0.0,
				min: 0.0
			},
			value: 0.0,
			valid: false,
			touched: false
		},
		clause: {
			name: 'clause',
			label: 'Clause (%)',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: 100,
				min: 0.0,
				max: 100.0
			},
			value: 100,
			valid: false,
			touched: false
		}
	}

	/**
	 * Reinstatement value
	 */
	const [reinstatement, setReinstatement] = useState({})
	const [asReinstatement, setAsReinstatement] = useState(false)
	const [isChecked, setIsChecked] = useState(false)

	useEffect(() => {
		changed(reinstatement)
	}, [reinstatement])

	/**
	 * Update layer value
	 * @param inputIdentifier index of in reinstatement list
	 * @param inputValue update value for reinstatement
	 */
	const updateHandler = (inputIdentifier, inputValue) => {
		setReinstatement((prevState) => ({
			...prevState,
			[inputIdentifier]: inputValue
		}))
	}

	/**
	 * Update layer value
	 * @param inputIdentifier index of in reinstatement list
	 * @param inputValue update value for reinstatement
	 */
	const updateCheckedHandler = (inputIdentifier, inputValue) => {
		setReinstatement((prevState) => ({
			...prevState,
			[inputIdentifier]: inputValue
		}))
		setIsChecked(inputValue)
	}

	/**
	 * Remove reinstatement from layer
	 */
	const removeReinstatement = () => {
		setReinstatement({})
		setAsReinstatement(false)
	}

	const updateReinstatementView = () => {
		setAsReinstatement(!asReinstatement)
	}

	/**
	 * Format & generate value for layer form
	 * @type {*[]}
	 */
	const formElementsArray = []
	for (const key in reinstatementForm) {
		formElementsArray.push({
			id: key,
			config: reinstatementForm[key]
		})
	}

	/**
	 * reinstatement edit bloc
	 */
	return (
		<div className='layer-reinstatement'>
			{asReinstatement ? (
				<>
					{formElementsArray.map((formElement) => {
						switch (formElement.config.elementType) {
							case 'checkbox':
								return (
									<Checkbox
										// {...constrain}
										id={formElement.id}
										key={formElement.id}
										name={formElement.config.name}
										label={formElement.config.label}
										value={isChecked}
										// value={constrain.value}
										elementConfig={formElement.config.elementConfig}
										changed={updateCheckedHandler}
									/>
								)
							case 'input':
								return (
									<Input
										id={formElement.config.name}
										key={formElement.id}
										name={formElement.config.name}
										label={formElement.config.label}
										value={formElement.config.value}
										elementConfig={formElement.config.elementConfig}
										changed={updateHandler}
									/>
								)
							case 'select':
								return (
									<Select
										id={formElement.id}
										key={formElement.id}
										name={formElement.config.name}
										label={formElement.config.label}
										// value={formElement.config.value}
										elementConfig={formElement.config.elementConfig}
										changed={updateHandler}
									/>
								)

							default:
								return (
									<Input
										id={formElement.id}
										key={formElement.id}
										name={formElement.config.name}
										label={formElement.config.label}
										value={formElement.config.value}
										elementConfig={formElement.config.elementConfig}
										changed={updateHandler}
									/>
								)
						}
					})}

					<MdDelete
						size='1.4em'
						color='red'
						className='trash-icon'
						onClick={removeReinstatement}
					/>
				</>
			) : (
				<div className='layer-reinstatement-button'>
					<button className='action-button' onClick={updateReinstatementView}>
						<FaPlusCircle className='icon-plus' />
						Add reinstatement
					</button>
				</div>
			)}
		</div>
	)
}

/**
 * Add reinstatement parameter type
 * @type {{changed: Requireable<(...args: any[]) => any>}}
 */
AddReinstatement.propTypes = {
	changed: PropTypes.func
}

export default AddReinstatement
