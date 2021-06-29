import './useToast.scss'
import React, { useEffect, useRef, useState } from 'react'
import { BsCheck, MdError, MdInfo, MdWarning } from 'react-icons/all'
import * as PropTypes from 'prop-types'

const useToast = ({ toastMessage = '', variant = 'success', style = {} }) => {
	/**
	 * Reference of toast component
	 * @type {React.MutableRefObject<null>}
	 */
	const toastRef = useRef(null)

	/**
	 * Message in toast content
	 */
	const [message, setMessage] = useState('')

	/**
	 * Status in toast content
	 */
	const [status, setStatus] = useState('')

	/**
	 * Toast must be show ?
	 */
	const [showToast, setShowToast] = useState(false)

	useEffect(() => {
		setMessage(toastMessage)
	}, [toastMessage])

	useEffect(() => {
		if (message.length > 2) setShowToast(true)
	}, [message])

	useEffect(() => {
		if (showToast) openToast()
	}, [showToast])

	/**
	 * Open toast for view
	 */
	const openToast = () => {
		toastRef.current.classList.add('show')
		setTimeout(function () {
			toastRef.current.classList && toastRef.current.classList.remove('show')
			setShowToast(false)
		}, 2000)
	}

	/**
	 * Update toast content for showing
	 * @param info message for toast
	 * @param type type of toast style
	 */
	const updateToast = (info, type = 'success') => {
		setMessage((prevState) => info)
		setStatus(type)
		setShowToast(true)
	}
	/**
	 * icon for toast
	 */
	let icon

	switch (status) {
		case 'success':
			icon = <BsCheck size={'2em'} fillOpacity={'#2db92d'} />
			break
		case 'error':
			icon = <MdError size={'2em'} fillOpacity={'#ff0000'} />
			break
		case 'info':
			icon = <MdInfo size={'2em'} fillOpacity={'#33ccff'} />
			break
		case 'warning':
			icon = <MdWarning size={'2em'} fillOpacity={'#ffcc00'} />
			break
		default:
			break
	}

	/**
	 * Render for toast component
	 * describe toast content and style
	 * @returns {JSX.Element}
	 * @constructor
	 */
	const ToastComponent = () => (
		<React.Fragment>
			{showToast ? (
				<div
					ref={toastRef}
					className={' snackbar ' + status}
					// style={{ ...toastStyle, ...style }}
				>
					<div className={'content'}>
						<span className={'icon'}>{icon}</span>
						{message}
					</div>
				</div>
			) : null}
		</React.Fragment>
	)

	/**
	 * return value for component
	 */
	return { updateToast, ToastComponent }
}

useToast.propTypes = {
	toastMessage: PropTypes.string.isRequired,
	variant: PropTypes.string,
	style: PropTypes.object
}

export default useToast
