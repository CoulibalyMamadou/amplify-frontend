import { combineReducers } from 'redux'
import * as ActionTypes from '../constants'
import { loadState } from '../sessionStorage/sessionStorage'

const preloadState = loadState()

const credentialInitialState = preloadState || { message: '', status: 401 }

// Updates an entity cache in response to any action with response.entities.
const auth = (state = credentialInitialState, action) => {
	switch (action.type) {
		case ActionTypes.SET_AUTH:
			return { ...action.auth }

		case ActionTypes.DELETE_AUTH:
			return { auth: {}, isLog: false }

		case ActionTypes.GET_AUTH:
			return state ? { ...state } : null

		case ActionTypes.GET_AUTH_TYPE:
			return state ? { ...state } : null
		// return state.auth ? { ...state } : null

		case ActionTypes.INVALID_LOGIN:
			return { message: ActionTypes.INVALID_LOGIN_MESSAGE, status: 401 }

		case ActionTypes.LOGOUT:
			return { status: 401 }
		// return { message: ActionTypes.LOGIN_MESSAGE, status: 401 }

		default:
			return state
	}
}

const rootReducer = combineReducers({
	auth
	// connect,
	// entities,
	// ...auth
	// entities,
	// pagination,
	// errorMessage,
})

export default rootReducer
