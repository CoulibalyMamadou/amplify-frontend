import './head-action.scss'
// import add from '../../../../../assets/icon/add-icon.png'
import { matchPath, useHistory, useLocation, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { BsHouseFill } from 'react-icons/bs'
import {
	ACTION_BUTTON_INSURER_ALLOCATION,
	ACTION_BUTTON_INSURER_REVIEW,
	ACTION_BUTTON_INSURER_UNCOMPLETE,
	LIST_LINK,
	ROUTE_PREFIX,
	StatusStructureTypeEnum
} from '../../../../../constants'
import { getProgramStatus } from '../../../../../api/program.service'
import { requestInterceptor } from '../../../../../sessionStorage/sessionStorage'
import { RiArrowLeftSLine } from 'react-icons/all'

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

	const [canAccess, setCanAccess] = useState(false)
	const [status, setStatus] = useState('')

	const getStatus = () => {
		// if (programId)
		console.log('canAcces programId : ', getCurrentParamWithoutPath())

		const id = getCurrentParamWithoutPath()
		if (id !== 'dashboard')
			getProgramStatus(getCurrentParamWithoutPath())
				.then((response) => response.json())
				.then((program) => {
					/**
					 s	 * Intercept Error code from API request
					 */
					requestInterceptor(program)
					setStatus(program.status)
					console.log('canAcces status : ', status)
					console.log('canAcces program : ', program)
				})
	}
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
		getCurrentPathWithoutLastPart() === LIST_LINK.SUBMIT_PROGRAM
			? homeHandler()
			: programId
			? history.push(headerAction.link + '/' + programId)
			: history.push(headerAction.link)
	}

	/**
	 * Redirection to the right link compared to programId or matchParams
	 */
	const navigationGoBack = () => {
		history.goBack()
		// programId ? history.goBack() : history.push(headerAction.link)
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

		console.log('url  de la page : ', url)
		console.log('status : ', status)
		console.log(
			'StatusStructureTypeEnum.UN_COMPLETE : ',
			StatusStructureTypeEnum.UN_COMPLETE
		)
		let actionButton = {}
		switch (status) {
			case StatusStructureTypeEnum.UN_COMPLETE:
				actionButton = ACTION_BUTTON_INSURER_UNCOMPLETE
				break
			case StatusStructureTypeEnum.COMPLETE:
				actionButton = ACTION_BUTTON_INSURER_ALLOCATION
				break
			default:
				actionButton = ACTION_BUTTON_INSURER_REVIEW
				break
		}
		console.log('actionButton : ', actionButton)
		console.log('canAccess : ', canAccess)

		return actionButton[pathname]
			? actionButton[pathname]
			: actionButton[url]
			? actionButton[url].link === '/insurer/dashboard'
				? {
						link: actionButton[url].link,
						message: actionButton[url].message
				  }
				: {
						...actionButton[url],
						link: actionButton[url].link + '/' + getCurrentParamWithoutPath()
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
		history.push(ROUTE_PREFIX.INSURER + '/dashboard')
	}

	/**
	 * content of action button
	 */
	const [headerAction, setHeaderAction] = useState(
		actionButtonInitHandler(pathname)
	)

	useEffect(() => {
		setHeaderAction(actionButtonInitHandler(pathname))
		setCanAccess(false)
		getStatus()

		return () => {
			setCanAccess(false)
			setHeaderAction({})
		}
	}, [pathname])

	useEffect(() => {
		// setCanAccess(false)
		console.log('headerAction come : ', headerAction)
		// console.log(
		// 	'status include : ',
		// 	headerAction.requireStatus.includes(status)
		// )
		if (headerAction.guard && headerAction.requireStatus.includes(status)) {
			console.log('status come : ', status)
			setCanAccess(true)
		}
	}, [headerAction])

	useEffect(() => {
		setHeaderAction(actionButtonInitHandler(pathname))
	}, [status])

	/**
	 * Create head action button with correct redirection and right link
	 */
	return (
		<>
			<section className='placement-action'>
				{match ? (
					<button
						className='action-button-other'
						onClick={navigationLinkHandler}
						data-testid='NEW-PROGRAM'
					>
						{headerAction.message}
					</button>
				) : (
					<>
						<button className='action-button-home' onClick={homeHandler}>
							<BsHouseFill size='1em' />
						</button>
						{canAccess && (
							<div className='navigation-button'>
								<button
									className='action-button-other'
									onClick={navigationGoBack}
								>
									<RiArrowLeftSLine size={'1em'} className='action-img' />
								</button>
								<button
									className='action-button-other'
									onClick={navigationLinkHandler}
								>
									{headerAction.message}
								</button>
							</div>
						)}
					</>
				)}
			</section>
		</>
	)
}

export default HeadAction
