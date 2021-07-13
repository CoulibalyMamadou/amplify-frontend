import './add-head-action.scss'
import add from '../../../../../assets/icon/add-icon.png'
import { useHistory, useLocation } from 'react-router'
import { BsHouseFill } from 'react-icons/bs'
import { ACTION_BUTTON } from '../../../../../constants'
import { useState } from 'react'

const AddHeadAction = () => {
	const history = useHistory()
	// url path
	const { pathname } = useLocation()

	const supportingDocumentHandler = () => {
		// history.push(headerAction.link)
	}

	const actionButtonInitHandler = () => {
		// history.push('/program/add')
		return ACTION_BUTTON[pathname]
	}

	const [headerAction, setHeaderAction] = useState(
		actionButtonInitHandler() || {
			link: '/program/add',
			message: 'New program'
		}
	)
	console.log('setHeaderAction : ', setHeaderAction)

	const homeHandler = () => {
		history.push('/dashboard')
	}

	return (
		<section className='add-placement-action'>
			<button className='action-button-home' onClick={homeHandler}>
				<BsHouseFill size='1em' />
			</button>
			<button
				className='action-button-other'
				onClick={supportingDocumentHandler}
			>
				<img src={add} alt={headerAction.message} className='action-img' />
				{headerAction.message}
			</button>
		</section>
	)
}

export default AddHeadAction
