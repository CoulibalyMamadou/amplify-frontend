import './nav.scss'
import logo from '../../../assets/logo/Logo_Bifrost.svg'
import avatar from '../../../assets/avatar/avatar.png'
import notification from '../../../assets/icon/notification-new-icon.png'
import search from '../../../assets/icon/search-icon.png'
import { useHistory, useLocation } from 'react-router'
import { VIEW_ACTION_MESSAGE } from '../../../constants'
import { useEffect, useState } from 'react'
import { RiShutDownLine } from 'react-icons/all'
import { resetTokenState } from '../../../sessionStorage/sessionStorage'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../../constants/ActionTypes'

const Nav = () => {
	// url path
	const { pathname } = useLocation()
	const history = useHistory()
	const dispatch = useDispatch()

	const user = useSelector((state) => state.auth.user) || 'Unknown user'

	/**
	 * return formatted message
	 * @returns {*|string}
	 */
	const headMessageHandler = () => {
		getCurrentPathWithoutLastPart()
		return VIEW_ACTION_MESSAGE[pathname]
			? VIEW_ACTION_MESSAGE[pathname]
			: VIEW_ACTION_MESSAGE[getCurrentPathWithoutLastPart()] || 'Dashboard'
	}

	/**
	 * Get Location  programId
	 * @returns {string}
	 */
	const getCurrentPathWithoutLastPart = () => {
		return location.pathname.slice(0, location.pathname.lastIndexOf('/'))
	}

	/**
	 * content of action button
	 */
	const [headerMessage, setHeaderMessage] = useState(headMessageHandler())

	useEffect(() => {
		setHeaderMessage(headMessageHandler())
	}, [pathname])

	const logOut = () => {
		resetTokenState()
		dispatch({ type: LOGOUT })
		history.push('/')
	}

	/**
	 * Create head action button with correct redirection and right link
	 */
	return (
		<nav className='header'>
			<div className='header-title'>
				<h1>{headerMessage}</h1>
			</div>
			<div className='header-logo'>
				<img src={logo} alt='Logo Bifrost' className='login-logo' />
			</div>
			<div className='header-action'>
				<div className='app-action'>
					<img src={search} alt='search icon' className='nav-search-icon' />
					<img
						src={notification}
						alt='notification icon'
						className='nav-notification-icon'
					/>
				</div>
				<div className='user-action-bar'>
					<p className='user-info'>
						{user.firstName} {user.lastName}
					</p>
					<img src={avatar} alt='avatar Bifrost' className='nav-avatar' />
					<RiShutDownLine size={'2em'} color={'red'} onClick={logOut} />
				</div>
			</div>
		</nav>
	)
}

export default Nav
