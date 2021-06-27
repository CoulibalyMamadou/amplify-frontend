import { loadState, saveState } from '../sessionStorage/sessionStorage'
import configureStore from './configureStore'

/**
 * load data from redux
 * mus do some verification before  it'll be valid for data s
 * @type {any}
 */
const persistedState = loadState()
const store = configureStore(persistedState)

/**
 * function for saving data in localstorage
 * get & create all needed information for localStorage
 * describe persistent data on localStorage
 */
const historyManager = () => {
	saveState({
		// user: store.getState().entities.user,
		// entities: store.getState().entities,
		// connect: store.getState().connect,
		// auth: store.getState().auth
		...store.getState().auth
		// isLogged: store.getState().entities.isLogged
	})
}

/**
 * Subscriber for data change and execute all action needed when data change
 */
store.subscribe(historyManager)

export default store
