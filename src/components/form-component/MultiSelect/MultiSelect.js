import React, { useRef } from 'react'
import './MultiSelect.scss'
import { string } from 'prop-types'
import * as PropTypes from 'prop-types'

const MultiSelect = ({
	id,
	name,
	label,
	value,
	changed = null,
	elementConfig = {
		options: [
			{
				value: string,
				displayValue: string
			}
		]
	},
	valid = false
}) => {
	const selectRef = useRef(value)
	// pour faire des control sur input
	const InputChangeHandler = (e) => {
		e.preventDefault()
		console.log('refValue : ', selectRef.current.value)
		changed(id, selectRef.current.value)
	}

	console.log('refValue : ', InputChangeHandler)

	let expanded = false

	const showCheckboxes = () => {
		const checkboxes = document.getElementById('checkboxes')
		if (!expanded) {
			checkboxes.style.display = 'block'
			expanded = true
		} else {
			checkboxes.style.display = 'none'
			expanded = false
		}
	}

	return (
		<>
			<div className='multiselect'>
				<div className='selectBox' onClick={showCheckboxes}>
					<select>
						<option>Select an option</option>
					</select>
					<div className='overSelect'> </div>
				</div>
				<div id='checkboxes'>
					{/* <select className='select-option' multiple> */}
					<label>
						<input type='checkbox' id='two' /> Second checkbox
					</label>
					<label htmlFor='one'>
						<input type='checkbox' id='one' />
						First checkbox
					</label>
					<label htmlFor='two'>
						<input type='checkbox' id='two' />
						Second checkbox
					</label>
					<label htmlFor='three'>
						<input type='checkbox' id='three' />
						Third checkbox
					</label>

					{/* 
						<option value='test'> test</option>
						<option value='travail' onClick={InputChangeHandler}>
							raval
						</option>
						<option value='levrure'> levur</option>
						<option value='treas'> treas</option> 
					</select> */}
				</div>
			</div>
		</>
	)
}

MultiSelect.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	subLabel: PropTypes.string,
	value: PropTypes.string,
	changed: PropTypes.func,
	elementConfig: PropTypes.object,
	valid: PropTypes.bool
}

export default MultiSelect
