import logo from '../../assets/logo/Logo_Bifrost.svg'
import './login.scss'
import { useEffect, useRef, useState } from 'react'
import { userLogin } from '../../api/user.service'
import { INVALID_LOGIN_MESSAGE, ROUTE_PREFIX, USER_TYPE } from '../../constants'
import { Redirect, useLocation } from 'react-router'

const Login = (connect) => {
	// state for redirection
	const { state } = useLocation()
	let { from } = state || {
		from: { pathname: connect.usertype + '/dashboard' }
	}
	/**
	 * verify redirection to the last page
	 */
	// const [redirectToReferrer, setRedirectToReferrer] = useState(false)
	const [redirectToReferrer, setRedirectToReferrer] = useState(connect.isLog)
	/**
	 * Error state for display and manage login view
	 */
	const [error, setError] = useState(null)
	/**
	 * Input email field
	 * @type {React.MutableRefObject<null>}
	 */
	const inputEmail = useRef(null)
	/**
	 * Input Password field
	 * @type {React.MutableRefObject<null>}
	 */
	const inputPassword = useRef(null)

	/**
	 * Update connection status
	 */
	// useEffect(() => {
	// 	setError(connect.message)
	// 	return () => {
	// 		setError('')
	// 	}
	// }, [connect.message])

	/**
	 * Update connection status
	 */
	useEffect(() => {
		from = { pathname: connect.usertype + '/dashboard' }

		return () => {
			setError('')
		}
	}, [connect.usertype])

	/**
	 * Redirect to correct page
	 */
	useEffect(() => {
		setRedirectToReferrer(connect.isLog)
		return () => {
			setRedirectToReferrer(false)
		}
	}, [connect.isLog])

	/**
	 * Redirect to correct page
	 */
	// useEffect(() => {
	// 	setError(INVALID_LOGIN_MESSAGE)
	// 	return () => {
	// 		setError(null)
	// 	}
	// }, [connect.message])

	/**
	 * form login treatment
	 * @param e
	 */
	const signInHandler = (e) => {
		e.preventDefault()
		const credentials = {
			email: inputEmail.current.value,
			password: inputPassword.current.value
		}
		userLogin(credentials)
			.then((res) => res.json())
			.then((value) => {
				if (value.statusCode) {
					setError(INVALID_LOGIN_MESSAGE)
					console.log(' Login credentials : ', value)
					connect.setLastError(INVALID_LOGIN_MESSAGE)
				} else {
					// authenticate & dispatch info
					// update connection status
					// connect.setValidLogin()
					// connect.setUser(value)
					console.log(' Login credentials : ', value)
					console.log(' Login credentials : ', USER_TYPE)
					console.log(' connect  : ', connect)
					console.log(' connect usertype  : ', connect.usertype)
					console.log(' connect stat  : ', connect.stater)
					console.log(' connect token  : ', connect.token)
					console.log(' connect isLog  : ', connect.isLog)

					switch (connect.usertype) {
						case USER_TYPE.INSURER:
							from = { pathname: ROUTE_PREFIX.INSURER + '/dashboard' }
							break
						case USER_TYPE.REINSURER:
							from = { pathname: ROUTE_PREFIX.REINSURER + '/dashboard' }
							break
						default:
							setError(INVALID_LOGIN_MESSAGE)
					}
					connect.setAuth(value)
					// setRedirectToReferrer(false)
				}
			})
			.catch((reason) => {
				console.log(' error : ', reason)
			})
		inputEmail.current.value = ''
		inputPassword.current.value = ''
	}

	/**
	 * check if login redirect to another page
	 * redirect if refer to another page
	 */
	return redirectToReferrer ? (
		<Redirect to={from} />
	) : (
		<div className='login-content'>
			<img src={logo} alt='Logo Bifrost' className='login-logo' />
			<label className='login-title'>Log in</label>
			<form onSubmit={signInHandler} className='login-form'>
				<input
					className='login-form-input'
					ref={inputEmail}
					type='text'
					name='email'
					id='email'
					placeholder='Email'
				/>
				<input
					className='login-form-input'
					ref={inputPassword}
					type='password'
					name='password'
					id='password'
					placeholder='Password'
				/>
				<button type='submit' className='login-form-button'>
					LOG IN
				</button>
			</form>
			{error && <p className='error_box'> {error}</p>}
			{/* <p className='error_box'> Identifier ou mot de passe incorrect</p> */}
		</div>
	)
}

export default Login
