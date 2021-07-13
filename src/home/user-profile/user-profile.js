import './user-profile.scss'
import Nav from '../nav/nav'
import UserProfilerRouter from './user-profile-router/user-profile-router'

const UserProfile = () => {
	/**
	 * Structure for reinsurer Content
	 */
	return (
		<>
			<Nav />
			<UserProfilerRouter />
		</>
	)
}

export default UserProfile
