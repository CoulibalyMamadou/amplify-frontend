import './head-action.scss'
import { FaPlusCircle } from 'react-icons/fa'
import { matchPath, useHistory, useLocation, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { BsHouseFill } from 'react-icons/bs'
import {
	ACTION_BUTTON,
	LIST_LINK,
	ROUTE_PREFIX
} from '../../../../../constants'

const HeadAction = () => {
	/**
	 * get user navigation history for redirection
	 * @type {History<LocationState>}
	 */
	const history = useHistory()

	/**
	 * Route param for composed route
	 * ProgramId here
	 */
	const { programId } = useParams()

	/**
	 * Url path
	 */
	const { pathname } = useLocation()
	const location = useLocation()

	/**
	 * Check if location math with some predefine route
	 * @type {match<{[K in keyof Params]?: string}>}
	 */
	const match = matchPath(pathname, {
		path: [
			ROUTE_PREFIX.INSURER,
			ROUTE_PREFIX.INSURER + '/dashboard',
			ROUTE_PREFIX.INSURER + '/program/add'
		],
		exact: true,
		strict: true
	})

	/**
	 * Redirection to the right link compared to programId or matchParams
	 */
	const navigationLinkHandler = () => {
		programId
			? history.push(headerAction.link + '/' + programId)
			: history.push(headerAction.link)
	}

	/**
	 * Get Location  programId
	 * @returns {string}
	 */
	const getCurrentPathWithoutLastPart = () => {
		return location.pathname.slice(0, location.pathname.lastIndexOf('/'))
	}

	/**
	 * GetLocation Without programId
	 * @returns {string}
	 */
	const getCurrentParamWithoutPath = () => {
		return location.pathname.slice(
			location.pathname.lastIndexOf('/') + 1,
			location.pathname.length
		)
	}

	/**
	 * create next link from current Link
	 * @param pathname
	 * @returns {*|{link, message}|{link: string, message}|{link: string, message: string}}
	 */
	const actionButtonInitHandler = (pathname) => {
		const url = getCurrentPathWithoutLastPart()

		return ACTION_BUTTON[pathname]
			? ACTION_BUTTON[pathname]
			: ACTION_BUTTON[url]
			? ACTION_BUTTON[url].link === '/insurer/dashboard'
				? {
						link: ACTION_BUTTON[url].link,
						message: ACTION_BUTTON[url].message
				  }
				: {
						link: ACTION_BUTTON[url].link + '/' + getCurrentParamWithoutPath(),
						message: ACTION_BUTTON[url].message
				  }
			: {
					link: ROUTE_PREFIX.INSURER + '/program/add',
					message: 'New program'
			  }
	}

	/**
	 * return to home
	 */
	const homeHandler = () => {
		history.push(LIST_LINK.HOME)
	}

	/**
	 * content of action button
	 */
	const [headerAction, setHeaderAction] = useState(
		actionButtonInitHandler(pathname)
	)

	useEffect(() => {
		setHeaderAction(actionButtonInitHandler(pathname))
	}, [pathname])

	/**
	 * Create head action button with correct redirection and right link
	 */
	return (
		<>
			<section className='placement-action'>
				{match ? (
					<button className='action-button' onClick={navigationLinkHandler}>
						<FaPlusCircle className='icon-plus' />
						{headerAction.message}
					</button>
				) : (
					<>
						<button className='action-button-home' onClick={homeHandler}>
							<BsHouseFill size='1em' />
						</button>
						{/* <button className='action-button' onClick={navigationLinkHandler}>
							<FaPlusCircle className='icon-plus' />
							{headerAction.message}
						</button> */}
					</>
				)}
			</section>
		</>
	)
}

export default HeadAction
