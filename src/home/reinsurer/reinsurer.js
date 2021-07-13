import './reinsurer.scss'
import Nav from '../nav/nav'
import ReinsurerRouter from './reinsurer-router/reinsurer-router'

const Reinsurer = () => {
	console.log('Reinsurer component')
	/**
	 * Structure for reinsurer Content
	 */
	return (
		<>
			<Nav />
			<ReinsurerRouter />
		</>
	)
}

export default Reinsurer
