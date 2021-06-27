import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

composeEnhancer(applyMiddleware(thunk))

const configureStore = (preloadedState) => {
	// if (module.hot) {
	//     // Enable Webpack hot module replacement for reducers
	//     module.hot.accept('../reducers', () => {
	//         store.replaceReducer(rootReducer)
	//     })
	// }

	return createStore(
		rootReducer /* preloadedState, */,
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		// preloadedState
		// composeEnhancer(
		//     applyMiddleware(
		//         thunk,
		//         // api,
		//     )
		//     //createLogger())
		// )
	)
}

export default configureStore
