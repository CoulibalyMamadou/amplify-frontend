import './user-profile-program-home.scss'
import avatar from '../../../../assets/avatar/avatar.png'
import { useEffect, useState } from 'react'
import UpdateUserProfileProgramHome from '../update-user-profile-program/update-user-profile-program-home/update-user-profile-program-home'
import { getInsurer } from '../../../../api/insurer.service'
import { useSelector } from 'react-redux'
import { USER_TYPE } from '../../../../constants'
import { getReinsurer } from '../../../../api/reinsurer.service'

const UserProfileProgramHome = () => {
	const [insurer, setInsurer] = useState([])

	console.log('Insurer : ', insurer)
	const userType = useSelector((state) => state.auth.userType)
	console.log('userType : ', userType)

	/**
	 * verify all eligible placement
	 * get all placement for dashboard
	 */
	useEffect(() => {
		if (userType === USER_TYPE.INSURER) {
			getInsurerHandler()
		} else if (userType === USER_TYPE.REINSURER) {
			getReinsurerHandler()
		} else {
			getInsurerHandler()
		}
	}, [])

	/**
	 * get all Insurer list to showon on user-profile form
	 */
	const getInsurerHandler = async () => {
		return getInsurer()
			.then((value) => value.json())
			.then((value) => {
				console.log('Program first state   : ', insurer)
				setInsurer(value)
				console.log('Program second state : ', insurer)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	}

	/**
	 * get all Insurer list to showon on user-profile form
	 */
	const getReinsurerHandler = async () => {
		return getReinsurer()
			.then((value) => value.json())
			.then((value) => {
				console.log('Program first state   : ', insurer)
				setInsurer(value)
				console.log('Program second state : ', insurer)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	}

	return (
		<section className='placement-content'>
			{/* header of placement box */}
			<br />
			<div
				className='placement-header'
				style={{
					width: '30%',
					paddingRight: '65%',
					display: '-webkit-box'
				}}
			>
				<img src={avatar} style={{ cursor: 'pointer' }} />
			</div>
			<br />
			<UpdateUserProfileProgramHome
				user={insurer}
				userFieldChangedHandler={getInsurerHandler}
			/>
		</section>
	)
}

export default UserProfileProgramHome
