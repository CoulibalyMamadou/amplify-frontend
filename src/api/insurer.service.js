import { loadState, resetTokenState } from '../sessionStorage/sessionStorage'
// const API = 'http://localhost:8080'
// const API = 'http://localhost:8000'
const API = 'http://mamadoucoulibaly.com/'
// const API = 'http://mamadoucoulibaly.com/api'

export const getAllInsurer = () => {
	return fetch(`http://localhost:8000/insurer/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const getAllReinsurer = () => {
	return fetch(`http://localhost:8000/reinsurer/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const getInsurer = () => {
	const token = loadState() || ''
	const myHeaders = new Headers()
	myHeaders.append('Access-Control-Allow-Origin', '*')
	token && token.token
		? myHeaders.append('Authorization', `Bearer ${token.token.token}`)
		: resetTokenState()
	// myHeaders.append('Authorization', `Bearer ${token.token.token}`)

	return fetch(`${API}/insurer/userInfo`, {
		method: 'GET',
		headers: myHeaders
	})
}
export const getInsurerById = (insurerId) => {
	return fetch(`http://localhost:8000/insurer/${insurerId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const getInsurerByIdFill = (insurerId) => {
	return fetch(`http://localhost:8000/insurer/${insurerId}/fill`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const getAllInsurerListFill = () => {
	return fetch(`${API}/insurer/list/fill`, {
		headers: {
			Accept: 'application/json'
		}
	})
}

export const insurerUpdate = (body) => {
	return fetch(`/api/v1/insurer/${body.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body.insurer)
	})
}

export const insurerSave = (body) => {
	return fetch(`/insurer/save`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
}

export const createInsurer = (body) => {
	return fetch(`/insurer/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
}

export const insurerDelete = (body) => {
	return fetch(`/api/v1/insurer/${body.id}`, {
		method: 'DELETE',
		// url: `/api/v1/insurer/${body.id}`,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
