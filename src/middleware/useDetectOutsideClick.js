import { useState, useEffect } from 'react'
import * as PropTypes from 'prop-types'

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 * @param {boolean} initialState
 */
const useDetectOutsideClick = (el, initialState) => {
	/**
	 * However state clicked
	 */
	const [isActive, setIsActive] = useState(initialState)

	useEffect(() => {
		const onClick = (e) => {
			// If the active element exists and is clicked outside of
			if (el.current !== null && !el.current.contains(e.target)) {
				setIsActive(!isActive)
			}
		}

		// If the item is active (ie open) then listen for clicks outside
		if (isActive) {
			window.addEventListener('click', onClick)
		}

		return () => {
			window.removeEventListener('click', onClick)
		}
	}, [isActive, el])

	return [isActive, setIsActive]
}

useDetectOutsideClick.propTypes = {
	el: PropTypes.node,
	initialState: PropTypes.bool
}

export default useDetectOutsideClick
