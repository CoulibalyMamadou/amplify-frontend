import React, { useEffect, useRef, useState } from 'react'
import './Input.scss'
import * as PropTypes from 'prop-types'

const Input = ({
	id,
	name,
	label,
	subLabel,
	value,
	changed = null,
	elementConfig = {
		type: 'text',
		placeholder: 'Country',
		disabled: false
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

	const numberTypeChangeHandler = () => {
		// let { value, min } = inputRef.current
		// const max = inputRef.current.max ? inputRef.current.max : 1000000

		// value = Math.max(Number(min), Math.min(Number(max), Number(value)))

		// inputRef.current.value = value
		// setInput(value)
		setInput(inputRef.current.value)
	}

	const textTypeChangeHandler = () => {
		value = inputRef.current.value
		setInput(value)
	}

	const InputChangeHandler = (e) => {
		e.preventDefault()
		elementConfig.type === 'number'
			? numberTypeChangeHandler()
			: textTypeChangeHandler()
	}

	return (
		<>
			<label className='field-title'>{label}</label>
			{subLabel ? <label className='field-sub-label'>{subLabel}</label> : null}
			<input
				ref={inputRef}
				className='info-field-input'
				{...elementConfig}
				defaultValue={value}
				name={name}
				id={name}
				onChange={InputChangeHandler}
			/>
		</>
	)
}

Input.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	subLabel: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	changed: PropTypes.func,
	elementConfig: PropTypes.object,
	valid: PropTypes.bool
}

export default Input
