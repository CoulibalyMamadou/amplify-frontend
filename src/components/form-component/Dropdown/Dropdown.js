import React, { useEffect, useRef } from 'react'
import './Dropdown.scss'
import * as PropTypes from 'prop-types'
import useDetectOutsideClick from '../../../middleware/useDetectOutsideClick'

const Dropdown = ({ value, title, options, onChange }) => {
	const listData = [
		{
			label: 'New York',
			value: 'newYork'
		},
		{
			label: 'Dublin',
			value: 'dublin'
		},
		{
			label: 'Istanbul',
			value: 'istanbul'
		},
		{
			label: 'California',
			value: 'colifornia'
		},
		{
			label: 'Izmir',
			value: 'izmir'
		},
		{
			label: 'Oslo',
			value: 'oslo'
		}
	]

	console.log('list data : ', listData)

	const searchRef = useRef(null)

	const dropdownRef = useRef(null)

	// const [isActive, setIsActive] = useState(true)
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

	useEffect(() => {
		if (isActive && searchRef.current) {
			searchRef.current.focus()
		}
	}, [isActive])

	const applyChange = (newItemId) => {
		// onChange && onChange([...value, newItemId])
		onChange([...value, newItemId])
	}

	const removeValue = (removedItemId) => {
		onChange && onChange(value.filter((i) => i !== removedItemId))
	}

	const toggleVisibility = () => {
		setIsActive(!isActive)
	}

	return (
		<>
			<div ref={dropdownRef} className='dropdown-container'>
				<label>{title}</label>
				<div className='dropdown-input' onClick={toggleVisibility}>
					<span className='arrow-down'> </span>
					{
						<div className='dropdown-values'>
							{value.length ? (
								value.map((v) => (
									<div key={v} className='dropdown-value'>
										{' '}
										{options[v].label}{' '}
										<span
											className='dropdown-remove'
											onClick={() => removeValue(v)}
										>
											X
										</span>
									</div>
								))
							) : (
								<div
									// onClick={() => setIsActive(!isActive)}
									className='dropdown-placeholder'
								>
									Select an item
								</div>
							)}
						</div>
					}
				</div>
				<div className={isActive ? 'dropdown-active' : 'dropdown-inactive'}>
					{options
						.filter((i) => value.findIndex((v) => v === i.id) === -1)
						.map((item) => (
							<div
								onClick={() => applyChange(item.id)}
								className='dropdown-item'
								key={item.id}
							>
								<img src={item.logo} />
								{item.label}
							</div>
						))}
				</div>
			</div>
		</>
	)
}

Dropdown.propTypes = {
	value: PropTypes.array,
	title: PropTypes.string,
	options: PropTypes.array,
	onChange: PropTypes.func
}

export default Dropdown
