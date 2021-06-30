import React, { useEffect, useRef, useState } from 'react'

import './Select.scss'
import { string } from 'prop-types'
import * as PropTypes from 'prop-types'

const Select = ({
	id,
	name,
	label,
	value,
	changed = null,
	elementConfig = {
		options: [
			{
				value: string,
				displayValue: string,
				disabled: false,
				hidden: false,
				selected: false
			}
		]
	},
	valid = false

	// validation = {
	//     required: true
	// },
}) => {
	// console.log('value is', groupName)

	const selectRef = useRef(value)

	const [inputValue, setInputValue] = useState(value)

	useEffect(() => {
		changed(id, selectRef.current.value)
	}, [inputValue])
	// pour faire des control sur input
	const InputChangeHandler = (e) => {
		e.preventDefault()
		setInputValue(selectRef.current.value)
		// changed(id, selectRef.current.value)
	}

	return (
		<>
			<label className='field-title'>{label}</label>
			<select
				ref={selectRef}
				className='info-field-select'
				defaultValue={value}
				onChange={InputChangeHandler}
			>
				{elementConfig.options
					? elementConfig.options.map((option, index) => (
							<option
								key={index}
								value={option.value}
								disabled={option.disabled}
								hidden={option.hidden}
							>
								{option.displayValue}
							</option>
					  ))
					: null}

				{elementConfig.optGroup
					? elementConfig.optGroup.map((optgroup, index) => (
							<optgroup key={index} label={optgroup.label}>
								{optgroup.options.map((option) => (
									<option
										key={option.value}
										value={option.value}
										disabled={option.disabled}
									>
										{option.displayValue}
									</option>
								))}
							</optgroup>
					  ))
					: null}
			</select>
		</>
	)
}

Select.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	subLabel: PropTypes.string,
	value: PropTypes.string,
	changed: PropTypes.func,
	elementConfig: PropTypes.object,
	valid: PropTypes.bool
}

export default Select
