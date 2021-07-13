import React from 'react'
import classes from './Input/Input.scss'

const FormComponent = ({
	props,
	name,
	elementType = 'input',
	elementConfig = {
		type: 'text',
		placeholder: 'Country'
	},
	value = '',
	validation = {
		required: true
	},
	valid = false,
	touched = false,
	onChanged
}) => {
	let inputElement = null
	const inputClasses = [classes.InputElement]

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break
		case 'select':
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			)
			break
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
	}

	return inputElement
}

export default FormComponent
