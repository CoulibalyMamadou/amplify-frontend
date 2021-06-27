import './ToastList.scss'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { MdCheckBoxOutlineBlank } from 'react-icons/all'

const ToastList = ({
	listToast = [],
	toastPosition = 'top-right',
	autoDelete = true,
	timer = 1000
}) => {
	const [list, setList] = useState([])
	const [position, setPosition] = useState(toastPosition)
	const [autoDismiss, setAutoDismiss] = useState(autoDelete)
	const [dismissTime, setDismissTime] = useState(timer)

	useEffect(() => {
		setList([...listToast])
	}, [listToast])

	useEffect(() => {
		setPosition(toastPosition)
	}, [toastPosition])

	useEffect(() => {
		setAutoDismiss(autoDismiss)
	}, [autoDelete])

	useEffect(() => {
		setDismissTime(timer)
	}, [timer])

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoDelete && listToast.length && list.length) {
				deleteToast(listToast[0].id)
			}
		}, dismissTime)

		return () => {
			clearInterval(interval)
		}

		// eslint-disable-next-line
	}, [listToast, autoDelete, timer, listToast]);

	const deleteToast = (id) => {
		const listItemIndex = list.findIndex((e) => e.id === id)
		const toastListItem = listToast.findIndex((e) => e.id === id)
		list.splice(listItemIndex, 1)
		listToast.splice(toastListItem, 1)
		setList([...list])
	}

	return (
		<>
			<div className={`notification-container ${position}`}>
				{list.map((toast, i) => (
					<div
						key={i}
						className={`notification toast ${position}`}
						style={{ backgroundColor: toast.backgroundColor }}
					>
						<button onClick={() => deleteToast(toast.id)}>X</button>
						<div className='notification-image'>
							<MdCheckBoxOutlineBlank size={'2em'} />
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

ToastList.propTypes = {
	listToast: PropTypes.array.isRequired,
	toastPosition: PropTypes.string,
	autoDelete: PropTypes.bool,
	timer: PropTypes.number
}

export default ToastList

// const listToast = [
// 	{
// 		id: 1,
// 		title: 'Success',
// 		description: 'This is a success toast component',
// 		backgroundColor: '#5cb85c',
// 		icon: 'checkIcon'
// 	},
// 	{
// 		id: 2,
// 		title: 'Danger',
// 		description: 'This is an error toast component',
// 		backgroundColor: '#d9534f',
// 		icon: 'errorIcon'
// 	}
// ]

// <ToastList
// 	listToast={listToast}
// 	toastPosition={'top-right'}
// 	autoDelete={true}
// 	timer={2000}
// />
