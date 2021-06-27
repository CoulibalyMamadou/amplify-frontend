import { getUser } from '../actions'
import { connect } from 'react-redux'
import App from '../components/App/App'

const mapStateToProps = (state) => ({
	stateConnect: state.connect,
	stateEntities: state.entities
})

const contentProps = (dispatch, ownProps) => ({
	getUser: (ownProps) => {
		dispatch(getUser(ownProps))
	}
})

export default connect(mapStateToProps, contentProps)(App)
