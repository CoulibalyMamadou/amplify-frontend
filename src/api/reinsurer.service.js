import { loadState, resetTokenState } from '../sessionStorage/sessionStorage'
import { getHeadersWithAuth } from './headers.service'
import { API } from '../constants'

const token = loadState() || ''

console.log('myHeaders : ', getHeadersWithAuth())
console.log('myHeaders token : ', token)

const loadHeaderWithAuth = () => {
	const token = loadState() || resetTokenState()
	const myHeaders = new Headers()
	myHeaders.append('Access-Control-Allow-Origin', '*')
	token && token.token
		? myHeaders.append('Authorization', `Bearer ${token.token.token}`)
		: resetTokenState()
	myHeaders.append('Content-Type', 'application/json')
	return myHeaders
}

export const getAllRereinsurer = () => {
	return fetch(`${API}/reinsurer/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const getReinsurer = () => {
	const token = loadState() || ''
	const myHeaders = new Headers()

	myHeaders.append('Access-Control-Allow-Origin', '*')
	myHeaders.append('Authorization', `Bearer ${token.token.token}`)
	// myHeaders.append('Origin', 'http://localhost:3000')
	// myHeaders.append('Access-Control-Allow-Credentials', 'true')
	// const headers = {
	// 	Authorization: `Bearer ${token.token.token}`
	// }
	return fetch(`${API}/reinsurer/userInfo`, {
		method: 'GET',
		// mode: 'no-cors',
		headers: loadHeaderWithAuth()
		// 	{
		// 	Accept: 'application/json',
		// 	'Content-Type': 'application/json',
		// 	Authorization: `Bearer ${token.token.token}`
		// }
	})
}

export const getRereinsurer = (reinsurerId) => {
	return fetch(`${API}/reinsurer/${reinsurerId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const getRereinsurerByIdFill = (reinsurerId) => {
	return fetch(`${API}/reinsurer/${reinsurerId}/fill`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const getAllRereinsurerListFill = () => {
	return fetch(`${API}/reinsurer/list/fill`, {
		headers: {
			Accept: 'application/json'
		}
	})
}

export const reinsurerUpdate = (body) => {
	return fetch(`/api/v1/reinsurer/${body.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body.reinsurer)
	})
}

export const reinsurerSave = (body) => {
	return fetch(`/reinsurer/save`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
}

export const createRereinsurer = (body) => {
	return fetch(`/reinsurer/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
}

export const reinsurerDelete = (body) => {
	return fetch(`/api/v1/reinsurer/${body.id}`, {
		method: 'DELETE',
		// url: `/api/v1/reinsurer/${body.id}`,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
