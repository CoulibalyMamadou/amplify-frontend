import { getToken, loadState } from '../sessionStorage/sessionStorage'

// const token = loadState() || ''

export const getHeadersWithoutAuth = () => {
	const myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')

	return myHeaders
}

export const getHeadersWithAuth = () => {
	// !token && resetTokenState()
	const token = loadState()
	const myHeaders = new Headers({
		'Access-Control-Allow-Origin': '*',
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json'
	})
	console.log('myHeaders new come : ', myHeaders)
	console.log('myHeaders new getToken()?.token : ', getToken())
	console.log('myHeaders new loadState()?.token : ', loadState())

	return new Headers({
		'Access-Control-Allow-Origin': '*',
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json'
	})
}
