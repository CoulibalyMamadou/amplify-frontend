import React, { useEffect, useRef, useState } from 'react'
import './Checkbox.scss'
import * as PropTypes from 'prop-types'

const Checkbox = ({
	id,
	name,
	label,
	subLabel,
	value = false,
	changed = null,
	elementConfig = {
		type: 'checkbox'
	},
	valid = false

	// validation = {
	//     required: true
	// },
}) => {
	// state for redirection
	const [input, setInput] = useState(value)

	const inputRef = useRef(value)

	useEffect(() => {
		changed(id, input)
	}, [input])

	useEffect(() => {
		inputRef.current.checked = value
	}, [value])

	const checkboxTypeChangeHandler = () => {
		value = inputRef.current.checked
		setInput(value)
	}

	const InputChangeHandler = (e) => {
		e.preventDefault()
		checkboxTypeChangeHandler()
	}

	return (
		<>
			<label className='field-title'>{label}</label>
			{subLabel ? <label className='field-sub-label'>{subLabel}</label> : null}
			<input
				ref={inputRef}
				className='info-field-input'
				{...elementConfig}
				defaultChecked={value}
				label={label}
				name={name}
				id={name}
				onChange={InputChangeHandler}
			/>
		</>
	)
}

Checkbox.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	subLabel: PropTypes.string,
	value: PropTypes.bool,
	changed: PropTypes.func,
	elementConfig: PropTypes.object,
	valid: PropTypes.bool
}

export default Checkbox
