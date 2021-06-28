import './user-profile-program-home.scss'
import addUser from '../../../../assets/avatar/avatar16.svg'
/* import { FaFilter, MdSort } from 'react-icons/all'
import ProgramList from './user-profile-program-list/user-profile-program-list' */
import { useEffect, useState } from 'react'
import UpdateUserProfileProgramHome from '../update-user-profile-program/update-user-profile-program-home/update-user-profile-program-home'
import { getInsurer } from '../../../../api/insurer.service'
// import { getReinsurer } from '../../../../api/reinsurer.service'

const UserProfileProgramHome = () => {
	const [insurer, setInsurer] = useState([])
	//	const [reinsurer, setReinsurer] = useState([])
	console.log('Insurer : ', insurer)
	//	console.log('Reinsurer : ', reinsurer)
	/**
	 * verify all eligible placement
	 * get all placement for dashboard
	 */
	useEffect(() => {
		getInsurerHandler()
	}, [])

	/* useEffect(() => {
		getReinsurerHandler()
	}, []) */

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
	/* 	const getReinsurerHandler = async () => {
		return getReinsurer()
			.then((value) => value.json())
			.then((value) => {
				console.log('Program first state   : ', insurer)
				setReinsurer(value)
				console.log('Program second state : ', insurer)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	} */

	/* 	const updateUserProfile = (userProfileUpdate) => {
		set
	}
 */
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
				<img src={addUser} style={{ cursor: 'pointer' }} />
			</div>
			<br />
			<UpdateUserProfileProgramHome
				user={insurer}
				userFieldChangedHandler={getInsurerHandler}
			/>

			{/* <div
				className='placement-head'
				style={{
					width: '400px',
					padding: '10px',
					margin: '5px auto',
					position: 'relative',
					display: 'flex',
					// flex-flow: column;
					justifyContent: 'flex - start',
					align: 'center',
					// height: calc(100% - 60px),
					// height: calc('100%' - '60px'),
					background: '#FFFFFF'
				}}
				
			> */}
			{/* <form>
					<div className='form-group'>
						<label>Nom: </label>
						<input type='text' className='form-control' value='' onChange='' />
					</div>
					<div className='form-group'>
						<label>Marque: </label>
						<input type='text' className='form-control' value='' onChange='' />
					</div>
					<div className='form-group'>
						<label>Prix: </label>
						<input
							type='number'
							min='0'
							className='form-control'
							value=''
							onChange=''
						/>
					</div>
					<div className='form-group'>
						<label>Quantité: </label>
						<input
							type='number'
							min='0'
							className='form-control'
							value=''
							onChange=''
						/>
					</div>

					<br />

					<div className='form-group'>
						<input
							type='submit'
							value='Modifier Produit'
							onClick={() => (window.location.href = '/')}
							className='btn btn-primary'
						/>
					</div>
				</form> */}

			{/* <form>
				<div className='form-row'>
					<div className='form-group col-md-6'>
						<label htmlFor='inputCity'>First Name</label>
						<input type='text' className='form-control' id='inputCity' />
					</div>
					<div className='form-group col-md-6'>
						<label htmlFor='inputCity'>Last Name</label>
						<input type='text' className='form-control' id='inputCity' />
					</div>
				</div>
				<div className='form-row'>
					<div className='form-group col-md-6'>
						<label htmlFor='inputCity'>Company</label>
						<input type='text' className='form-control' id='inputCity' />
					</div>
					<div className='form-group col-md-4'>
						<label htmlFor='inputCity'>Office</label>
						<input type='text' className='form-control' id='inputCity' />
					</div>
					<div className='form-group col-md-2'>
						<label htmlFor='inputState'>Position</label>
						<select id='inputState' className='form-control'>
							<option selected>Reinsurance underwriter</option>
							<option>...</option>
						</select>
					</div>
				</div>
			</form> */}
			{/* </div> */}
			{/* <div className='placement-header'>
				<div className='placement-action'>
					<p className='placement-action-title'>All placements</p>
					<div className='placement-action-button'>
						<span>
							<MdSort /> Sort
						</span>
						<span>
							<FaFilter /> Filter
						</span>
					</div>
				</div>
				<div className='placement-head'>
					<span>Placement details</span>
					<span>Status</span>
					<span>Placed by</span>
					<span>Quotation starts</span>
					<span>Quotation ends</span>
					<span> : </span>
				</div>
			</div> */}

			{/* body of placement body */}
			{/* <section className='placement-display'>
				{programList ? <ProgramList listProgram={programList} /> : ''}
			</section> */}

			{/* content footer of placement body */}
		</section>
	)
}

export default UserProfileProgramHome
