import { loadState, resetTokenState } from '../sessionStorage/sessionStorage'
import { getHeadersWithAuth } from './headers.service'
import { API } from '../constants'

const token = loadState() || ''

console.log('myHeaders : ', getHeadersWithAuth())
// console.log('myHeaders myHeaders : ', myHeaders)
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

export const getProgramById = (programId) => {
	return fetch(`${API}/program/${programId}`, {
		method: 'GET',
		headers: loadHeaderWithAuth()
		// headers: myHeaders
		// 	{
		// 	'Content-Type': 'application/json'
		// }
	})
}

export const getProgramByIdFill = (programId) => {
	return fetch(`${API}/program/${programId}/fill`, {
		method: 'GET',
		headers: loadHeaderWithAuth()
		// 	{
		// 	'Content-Type': 'application/json'
		// }
	})
}

export const getProgramLayersByIdFill = (programId) => {
	return fetch(`${API}/program/${programId}/layer/fill`, {
		method: 'GET',
		headers: loadHeaderWithAuth()
		// 	{
		// 	'Content-Type': 'application/json'
		// }
	})
}

export const getProgramQuoterListById = (programId) => {
	return fetch(`${API}/program/quoter/list/fill/${programId}`, {
		method: 'GET',
		headers: loadHeaderWithAuth()
		// 	{
		// 	'Content-Type': 'application/json'
		// }
	})
}

export const getProgramQuoterListFillById = (programId) => {
	return fetch(`${API}/program/quoter/list/fill/${programId}`, {
		method: 'GET',
		headers: loadHeaderWithAuth()
		// 	{
		// 	'Content-Type': 'application/json'
		// }
	})
}

export const saveProgramLayersUpdate = (layers) => {
	return fetch(`${API}/program/layer/patch`, {
		method: 'PATCH',
		headers: loadHeaderWithAuth(),
		body: JSON.stringify(layers)
	})
}

export const quoterListUpdate = (body) => {
	return fetch(`${API}/program/quoter/list/${body.programId}`, {
		method: 'PATCH',
		headers: loadHeaderWithAuth(),
		body: JSON.stringify(body.quoterList)
	})
}

export const getProgramList = () => {
	return fetch(`${API}/program`, {
		headers: loadHeaderWithAuth()
	})
}

export const getAllProgramListFill = () => {
	return fetch(`${API}/program/list/fill`, {
		headers: loadHeaderWithAuth()
	})
}

export const getAllReinsurerProgramListFill = () => {
	return fetch(`${API}/program/reinsurer/list/fill`, {
		headers: loadHeaderWithAuth()
	})
}

export const getAllProgramConstraintListFill = (programId) => {
	return fetch(`${API}/program/constraint/list/fill/${programId}`, {
		headers: loadHeaderWithAuth()
	})
}

export const getAllConstraintListFill = (programId) => {
	return fetch(`${API}/program/constraint/fill/${programId}`, {
		headers: loadHeaderWithAuth()
	})
}

export const getProgramStatus = (programId) => {
	return fetch(`${API}/program/status/${programId}`, {
		headers: loadHeaderWithAuth()
	})
}

export const getProgramQuoteConstraintListFill = ({ programId }) => {
	// return fetch(`${API}/program/quoteConstraint/${programId}`, {
	return fetch(`${API}/quoteConstraint/${programId}`, {
		headers: loadHeaderWithAuth()
	})
}

export const getProgramQuoteConstraintListFillOfOffice = ({ programId }) => {
	// return fetch(`${API}/program/quoteConstraint/${programId}`, {
	return fetch(`${API}/quoteConstraint/${programId}`, {
		headers: loadHeaderWithAuth()
	})
}

export const getAllProgramQuotationListFill = ({ programId }) => {
	// return fetch(`${API}/program/quotation/${programId}`, {
	return fetch(`${API}/quotation/${programId}`, {
		headers: loadHeaderWithAuth()
	})
}

export const createConstraintProgram = ({
	programId,
	constraintsAllocation
}) => {
	return fetch(`${API}/program/create/constraint/${programId}`, {
		method: 'POST',
		headers: loadHeaderWithAuth(),
		body: JSON.stringify({
			constraints: constraintsAllocation
		})
	})
}

export const createProgramQuoteConstraint = ({ programId, programQuote }) => {
	const myHeaders = new Headers()
	myHeaders.append('Access-Control-Allow-Origin', '*')
	myHeaders.append('Authorization', `Bearer ${token.token}`)
	myHeaders.append('Content-Type', 'application/json')

	return fetch(`${API}/program/quoteConstraint/${programId}`, {
		method: 'POST',
		headers: loadHeaderWithAuth(),
		body: JSON.stringify(programQuote)
	})
}

export const createProgramQuotation = ({ programId, programQuote }) => {
	return fetch(`${API}/program/quotation/${programId}`, {
		method: 'POST',
		headers: loadHeaderWithAuth(),
		body: JSON.stringify(programQuote)
	})
}

export const programUpdate = (body) => {
	return fetch(`/api/v1/program/${body.id}`, {
		method: 'PATCH',
		headers: loadHeaderWithAuth(),
		body: JSON.stringify(body.program)
	})
}

export const programSave = (body) => {
	return fetch(`/program/save`, {
		method: 'POST',
		headers: loadHeaderWithAuth(),
		body: JSON.stringify(body)
	})
}

export const createProgram = (body) => {
	// const token = loadState() || ''
	// const myHeaders = new Headers()
	// myHeaders.append('Access-Control-Allow-Origin', '*')
	// myHeaders.append('Authorization', `Bearer ${token.token.token}`)
	// myHeaders.append('Content-Type', 'application/json')

	return fetch(`${API}/program`, {
		method: 'POST',
		headers: loadHeaderWithAuth(),
		body: JSON.stringify(body)
	})
}

export const programDelete = (body) => {
	return fetch(`/api/v1/program/${body.id}`, {
		method: 'DELETE',
		headers: loadHeaderWithAuth()
	})
}
