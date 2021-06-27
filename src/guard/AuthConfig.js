import { getAuth } from '../actions'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

/**
 * Redux data retrieve
 * @param state store data in redux
 * @returns {{loggedAs: *, isLog: (boolean|*)}} One for id | second verify user connected
 */
const mapStateToProps = (state) => {
	return {
		/* Check state login */
		// isLog: state.connect.isLogged,
		/* Check state who's connect */
		// loggedAs: state.entities.user?.email

		userType: () => state.auth.userType,
		isLog: () => !!state.auth.token,
		/* Authenticate in App */
		token: () => state.auth.token
	}
}

/**
 * Connect to program
 * @param dispatch researcher function
 * @returns {{authenticate: (function(): *), isLogged: (function(): *)}}
 */
const mapDispatchToProps = (dispatch) => {
	return {
		/* Check state login */
		// isLogged: () => dispatch(isLogin()),
		/* Authenticate in App */
		// authenticate: () => dispatch(getUser())
		/* Check state login */
		usertype: () => dispatch(getAuth()).usertype,
		/* Authenticate in App */
		token: () => dispatch(getAuth())
	}
}

const AuthConfig = connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

export default AuthConfig
