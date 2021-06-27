import './home.scss'
import { Route, Switch } from 'react-router-dom'
import AuthConfig from '../../guard/AuthConfig'
import Insurer from './insurer/insurer'
import Reinsurer from './reinsurer/reinsurer'
import NotFound from '../NotFound/notFound'
import { LOGOUT, USER_TYPE } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Enter point of program where page is build
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => {
	/**
	 * Routing for all project for accredited person
	 */

	const appState = useSelector((state) => state)
	const dispatch = useDispatch()
	useEffect(() => {
		if (appState.auth.status === 401) dispatch({ type: LOGOUT })
	}, [])

	const isUserType = (target) => {
		return appState.auth.userType === target
		// ? appState.auth.userType === target
		// : dispatch({ type: LOGOUT })
	}

	return (
		<>
			<Switch>
				{isUserType(USER_TYPE.INSURER) && (
					<AuthConfig path='/insurer' component={Insurer} />
				)}

				{isUserType(USER_TYPE.REINSURER) && (
					<AuthConfig path='/reinsurer' component={Reinsurer} />
				)}

				<Route component={NotFound} />
			</Switch>
		</>
	)
}

export default Home
