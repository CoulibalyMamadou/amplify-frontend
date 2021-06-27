// import { browserHistory } from 'react-router'

/**
 * load data form local storage
 *
 * update it to store only user connexion info (without password) & JWT token for verification
 * @returns {any|undefined}
 */
export const loadState = () => {
	try {
		const serialState = sessionStorage.getItem('appState')
		if (serialState === null) {
			resetTokenState()
			return undefined
		}
		return JSON.parse(serialState)
	} catch (err) {
		resetTokenState()
		return undefined
	}
}

/**
 * load data form local storage
 *
 * update it to store only user connexion info (without password) & JWT token for verification
 * @returns {any|undefined}
 */
export const getToken = () => {
	try {
		const serialState = loadState()

		return JSON.parse(serialState)

		// resetTokenState()
	} catch (err) {
		return undefined
	}
}

/**
 * load data form local storage
 *
 * update it to store only user connexion info (without password) & JWT token for verification
 * @returns {any|undefined}
 */
export const loadTokenState = () => {
	try {
		const serialState = sessionStorage.getItem('appState')
		if (serialState === null) {
			return undefined
		}
		// return JSON.parse(serialState.token)
		return JSON.parse(serialState)
	} catch (err) {
		return undefined
	}
}

/**
 * load data form local storage
 *
 * update it to store only user connexion info (without password) & JWT token for verification
 * @returns {any|undefined}
 */
export const resetTokenState = () => {
	// const history = browserHistory()
	try {
		// sessionStorage.clear()
		location.href('/login')
	} catch (err) {
		return undefined
	}
}

/**
 * load data form local storage
 *
 * update it to store only user connexion info (without password) & JWT token for verification
 * @returns {any|undefined}
 */
export const requestInterceptor = (res) => {
	if (res.statusCode === 401) resetTokenState()
	console.log('res : ', res)
}

/**
 * save data form local storage
 *
 * update it to store only user connexion info (without password) & JWT token for verification
 * @param state
 */
export const saveState = (state) => {
	try {
		const serialState = JSON.stringify(state)
		sessionStorage.setItem('appState', serialState)
	} catch (err) {
		console.log(err)
	}
}
