import logo from '../../assets/logo/Logo_Bifrost.svg'
import './notFound.scss'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import add from '../../assets/icon/add-icon.png'
import { useHistory } from 'react-router'

const NotFound = () => {
	const isNotConnect = useSelector((state) => !!state.auth.token)

	const history = useHistory()

	const goToDashboard = () => {
		history.push('/')
	}
	/**
	 * Content for error Page
	 */
	return (
		<section className='add-placement-content'>
			<div className='not-found-content'>
				<img src={logo} alt='Logo Bifrost' className='login-logo' />
				<label className='not-found-message'>
					ERROR 404 <span> :( </span> PAGE NOT FOUND
				</label>
				{isNotConnect ? (
					<button className='action-button' onClick={goToDashboard}>
						<img src={add} alt='Supporting documents' className='action-img' />
						Go to Dashboard
					</button>
				) : (
					<Redirect to={{ pathname: '/' }} />
				)}
			</div>
		</section>
	)
}

export default NotFound
