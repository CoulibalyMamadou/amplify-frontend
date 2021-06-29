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

export const getAllOffice = () => {
	return fetch(`${API}/office/all`, {
		method: 'GET',
		headers: loadHeaderWithAuth()
	})
}

export const getAllOfficeQuoter = (programId) => {
	return fetch(`${API}/program/quoteList/${programId}`, {
		method: 'GET',
		headers: loadHeaderWithAuth()
	})
}

export const getOffice = () => {
	return fetch(`${API}/office`, {
		method: 'GET',
		headers: loadHeaderWithAuth()
	})
}

export const getOfficeByIdFill = (officeId) => {
	return fetch(`${API}/office/${officeId}/fill`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const getAllReofficeListFill = () => {
	return fetch(`${API}/office/list/fill`, {
		headers: {
			Accept: 'application/json'
		}
	})
}

export const officeUpdate = (body) => {
	return fetch(`/api/v1/office/${body.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body.office)
	})
}

export const officeSave = (body) => {
	return fetch(`/office/save`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
}

export const createReoffice = (body) => {
	return fetch(`/office/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
}

export const officeDelete = (body) => {
	return fetch(`/api/v1/office/${body.id}`, {
		method: 'DELETE',
		// url: `/api/v1/office/${body.id}`,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
