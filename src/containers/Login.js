import Login from '../components/login/login'
import { connect } from 'react-redux'
import { errorLogin, setAuth } from '../actions'

const mapStateToProps = (state) => ({
	// isLog: state.connect.isLogged,
	// stateConnect: state.connect,
	// stateEntities: state.entities
	stater: state,
	usertype: state.auth.userType,
	isLog: !!state.auth.token,
	token: state.auth.token,
	message: state.auth.message
	// completedCount: getCompletedTodoCount(state)
})

const errorToProps = (dispatch, ownProps) => ({
	setLastError: (ownProps) => {
		dispatch(errorLogin(ownProps))
	},
	setAuth: (ownProps) => {
		dispatch(setAuth(ownProps))
	}
	// setUser: (ownProps) => {
	// 	dispatch(setUser(ownProps))
	// },
	// setValidLogin: () => {
	// 	dispatch(validLogin())
	// }
})

export default connect(mapStateToProps, errorToProps)(Login)
