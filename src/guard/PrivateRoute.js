import { Redirect, Route, useLocation } from 'react-router-dom'
// import { useState } from 'react'
import * as PropTypes from 'prop-types'

/**
 * Guard route verify access level
 * @param Component
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
	/**
	 * location for redirect or navigation
	 * @type {Location<LocationState>}
	 */
	const location = useLocation()

	/**
	 * check content accessibility
	 */
	// const [isValid, setIsValid] = useState(rest.isLog)
	// const [isValid, setIsValid] = useState(rest.isLog)
	// const [isValid, setIsValid] = useState(rest.isLog)
	// console.log('test : ', setIsValid(rest.isLog))
	// console.log('isvalid : ', isValid)

	// useEffect(() => {
	// 	setIsValid(rest.isLog)
	// }, [rest.isLog])

	/**
	 * Test guard and redirect if or not access enable
	 */
	return (
		<Route {...rest}>
			{rest.isLog ? (
				<Component />
			) : (
				<Redirect to={{ pathname: '/login', state: { from: location } }} />
			)}
		</Route>
	)
}

/**
 * Parameter type
 * @type {{component: Requireable<ReactComponentLike>}}
 */
PrivateRoute.propTypes = {
	component: PropTypes.elementType
}

export default PrivateRoute
