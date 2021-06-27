import './Toast.scss'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const Toast = ({
	listToast = [],
	toastPosition = 'top-right',
	autoDismiss = true,
	timer = 1000
}) => {
	// const { toastList, position, autoDelete, dismissTime } = props
	const [toastList, setToastList] = useState(listToast)
	const [position, setPosition] = useState(toastPosition)
	const [autoDelete, setAutoDelete] = useState(autoDismiss)
	const [dismissTime, setDismissTime] = useState(timer)

	useEffect(() => {
		setToastList([...listToast])
	}, [listToast])

	useEffect(() => {
		setPosition(toastPosition)
	}, [toastPosition])

	useEffect(() => {
		setAutoDelete(dismissTime)
	}, [toastList])

	useEffect(() => {
		setDismissTime(timer)
	}, [timer])

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoDismiss && listToast.length && toastList.length) {
				deleteToast(listToast[0].id)
			}
		}, dismissTime)

		return () => {
			clearInterval(interval)
		}

		// eslint-disable-next-line
	}, [listToast, autoDelete, dismissTime, list]);

	const deleteToast = (id) => {
		const listItemIndex = toastList.findIndex((e) => e.id === id)
		const toastListItem = toastList.findIndex((e) => e.id === id)
		toastList.splice(listItemIndex, 1)
		toastList.splice(toastListItem, 1)
		toastList([...toastList])
	}

	return (
		<>
			<div className={`notification-container ${position}`}>
				{toastList.map((toast, i) => (
					<div
						key={i}
						className={`notification toast ${position}`}
						style={{ backgroundColor: toast.backgroundColor }}
					>
						<button onClick={() => deleteToast(toast.id)}>X</button>
						<div className='notification-image'>
							<img src={toast.icon} alt='' />
						</div>
						<div>
							<p className='notification-title'>{toast.title}</p>
							<p className='notification-message'>{toast.description}</p>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

Toast.propTypes = {
	listToast: PropTypes.array.isRequired,
	toastPosition: PropTypes.string,
	autoDismiss: PropTypes.bool,
	timer: PropTypes.number
}

export default Toast
