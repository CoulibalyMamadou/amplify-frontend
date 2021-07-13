import React, { useEffect, useRef } from 'react'
import './DropdownNav.scss'
import * as PropTypes from 'prop-types'
import useDetectOutsideClick from '../../../middleware/useDetectOutsideClick'

const DropdownNav = ({ value, title, options, onChange }) => {
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
			<div className=''>
				<div className='menu-container'>
					<button onClick={toggleVisibility} className='menu-trigger'>
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
						<img
							src='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg'
							alt='User avatar'
						/>
					</button>
					<div className={`menu ${isActive ? 'active' : 'inactive'}`}>
						<ul>
							<li>
								<input ref={searchRef} type='search' />
							</li>
							{options
								.filter((i) => value.findIndex((v) => v === i.id) === -1)
								.map((item) => (
									<li
										onClick={() => applyChange(item.id)}
										// className='dropdown-item'
										key={item.id}
									>
										<a href='#'>
											{/* <img src={item.logo}/> */}
											{item.label}
										</a>
									</li>
								))}
							<li>
								<a href='#'>Messages</a>
							</li>
							<li>
								<a href='#'>Trips</a>
							</li>
							<li>
								<a href='#'>Saved</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

DropdownNav.propTypes = {
	value: PropTypes.array,
	title: PropTypes.string,
	options: PropTypes.array,
	onChange: PropTypes.func
}

export default DropdownNav
