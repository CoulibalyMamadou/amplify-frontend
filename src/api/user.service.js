// const API = 'http://localhost:8080'
// const API = 'http://localhost:8000'
const API = 'http://mamadoucoulibaly.com/'
// const API = 'http://mamadoucoulibaly.com/api'

export const userSignIn = (body) => {
	return fetch(`${API}/insurer/signIn`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
}

export const userLogin = (body) => {
	return fetch(`${API}/authanticate/signIn`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
}

export const userList = () => {
	return fetch('http://localhost:8000/insurer', {
		headers: {
			Accept: 'application/json'
		}
	})
}

export const userUpdate = (id, user) => {
	return fetch(`/api/v1/user/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
}

export const userDelete = (id) => {
	return fetch(`/api/v1/insurer/${id}`, {
		method: 'DELETE',
		// url: `/api/v1/user/${body.id}`,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

//
// export const signIn = (body) => {
//     return fetch({
//         method: 'POST',
//         url: `${API}/sign-in`,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });
// };
