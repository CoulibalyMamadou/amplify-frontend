import './quoter-item.scss'
import * as PropTypes from 'prop-types'
import { TiDeleteOutline } from 'react-icons/all'
import { useEffect, useState } from 'react'

/**
 * Quoter item edit component
 * @param toggleSelected toggle selection
 * @param unSelected deselect
 * @param selected selected status
 * @param resettable
 * @param target target field
 * @param index item index on list
 * @param quoter
 * @returns {JSX.Element}
 * @constructor
 */
const QuoterItem = ({
	toggleSelected,
	unSelected,
	selected,
	resettable = true,
	target,
	index,
	quoter = {}
}) => {
	/**
	 * class to apply on interaction
	 */
	const [selectedClass, setSelectedClass] = useState('')
	/**
	 * verify item selection
	 */
	const [isSelected, setIsSelected] = useState(selected)

	useEffect(() => {
		toggleSelected(index, target, isSelected)
	}, [isSelected])

	useEffect(() => {
		setIsSelected(selected)
	}, [selected])

	/**
	 * interact on item click
	 * toggle selection item
	 */
	const insurerChoose = () => {
		isSelected ? setSelectedClass('') : setSelectedClass('select')
		setIsSelected(!isSelected)
	}

	/**
	 * auto exclude item whenever list it's in
	 */
	const insurerExclude = () => {
		unSelected(index, target)
	}

	/**
	 * Set content bloc for quoter item
	 */
	return (
		<>
			<span className='quoter-badge'>
				<span
					className={'quoter-item ' + selectedClass}
					onClick={insurerChoose}
				>
					{quoter.name}
				</span>
				{resettable && (
					<span className='delete-badge' onClick={insurerExclude}>
						<TiDeleteOutline size='1em' />
					</span>
				)}
			</span>
		</>
	)
}

/**
 * Quoter item parameter type
 * @type {{toggleSelected: Requireable<(...args: any[]) => any>, index: Requireable<number>, unSelected: Requireable<(...args: any[]) => any>, resettable: Requireable<boolean>, selected: Requireable<boolean>, quoter: Requireable<object>, target: Requireable<string>}}
 */
QuoterItem.propTypes = {
	index: PropTypes.number,
	target: PropTypes.string,
	toggleSelected: PropTypes.func,
	unSelected: PropTypes.func,
	resettable: PropTypes.bool,
	selected: PropTypes.bool,
	quoter: PropTypes.object
}

export default QuoterItem
