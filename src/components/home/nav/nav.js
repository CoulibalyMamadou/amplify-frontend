import './nav.scss'
import logo from '../../../assets/logo/Logo_Bifrost.svg'
import avatar from '../../../assets/avatar/avatar.png'
import settingIcon from '../../../assets/icon/settings-icon.png'
import logoutIcon from '../../../assets/icon/logout-icon.png'
// import notification from '../../../assets/icon/notification-new-icon.png'
// import search from '../../../assets/icon/search-icon.png'
import { useHistory, useLocation } from 'react-router'
import { VIEW_ACTION_MESSAGE, LIST_LINK } from '../../../constants'
import { useEffect, useRef, useState } from 'react'
import { resetTokenState } from '../../../sessionStorage/sessionStorage'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../../constants/ActionTypes'

const Nav = () => {
	const dropdownRef = useRef(null)
	const [isActive, setIsActive] = useState(false)
	const onClick = () => setIsActive(!isActive)
	useEffect(() => {
		const pageClickEvent = (e) => {
			// If the active element exists and is clicked outside of
			if (
				dropdownRef.current !== null &&
				!dropdownRef.current.contains(e.target)
			) {
				setIsActive(!isActive)
			}
		}
		// If the item is active (ie open) then listen for clicks
		if (isActive) {
			window.addEventListener('click', pageClickEvent)
		}
		return () => {
			window.removeEventListener('click', pageClickEvent)
		}
	}, [isActive])

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
		console.log('OOOO', VIEW_ACTION_MESSAGE)
		return VIEW_ACTION_MESSAGE[pathname]
			? VIEW_ACTION_MESSAGE[pathname]
			: VIEW_ACTION_MESSAGE[getCurrentPathWithoutLastPart()] || 'Dashboard'
	}

	/**
	 * Get Location  programId
	 * @returns {string}
	 */
	const getCurrentPathWithoutLastPart = () => {
		console.log(
			'OOOO',
			location.pathname.slice(0, location.pathname.lastIndexOf('/'))
		)
		return location.pathname.slice(0, location.pathname.lastIndexOf('/'))
	}

	/**
	 * content of action button
	 */
	const [headerMessage, setHeaderMessage] = useState(headMessageHandler())
	console.log('XXXX', headerMessage)

	useEffect(() => {
		setHeaderMessage(headMessageHandler())
	}, [pathname])

	const logOut = () => {
		resetTokenState()
		dispatch({ type: LOGOUT })
		history.push('/')
	}

	const Home = () => {
		history.push(LIST_LINK.HOME)
	}

	/**
	 * Create head action button with correct redirection and right link
	 */
	return (
		<nav className='header'>
			<div className='header-title'>
				<h1>{headerMessage}</h1>
			</div>
			<div className='header-logo' onClick={Home}>
				<img src={logo} alt='Logo Bifrost' className='login-logo' />
			</div>
			<div className='header-action'>
				{/* <div className='app-action'>
					<a href='/'>
						<img src={search} alt='search icon' className='nav-search-icon' />
					</a>
					<a>
						<img
							src={notification}
							alt='notification icon'
							className='nav-notification-icon'
						/>
					</a>
				</div> */}
				<div className='user-action-bar' onClick={onClick}>
					<p className='user-info'>
						{user.firstName} {user.lastName}
					</p>
					<div className='menu-container'>
						<a className='menu-trigger'>
							<img src={avatar} alt='avatar Bifrost' className='nav-avatar' />
						</a>
						<nav
							id=' '
							ref={dropdownRef}
							className={`menu ${isActive ? 'active' : 'inactive'}`}
						>
							<ul>
								<li>
									<a href='/user-profile'>
										<img src={settingIcon} />
										&nbsp; &nbsp;
										<p className='center'>Settings</p>
									</a>
								</li>
								<li className='flex'>
									<a href='' onClick={logOut}>
										<img src={logoutIcon} /> &nbsp; &nbsp; &nbsp;
										<p className='center'>Logout</p>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Nav
