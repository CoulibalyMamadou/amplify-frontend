import './reinsurer-program-home.scss'
import { FaFilter, MdSort } from 'react-icons/all'
import ProgramList from './program-list/program-list'
import { useEffect, useState } from 'react'
import { getAllReinsurerProgramListFill } from '../../../../api/program.service'
import { requestInterceptor } from '../../../../sessionStorage/sessionStorage'
import { getReinsurer } from '../../../../api/reinsurer.service'

const ReinsurerProgramHome = () => {
	const [programList, setProgramList] = useState([])

	/**
	 * verify all eligible placement
	 * get all placement for dashboard
	 */
	useEffect(() => {
		getProgramListHandler().then((value) => {
			console.log('Program first state   : ', programList)
			setProgramList(value)
			console.log('Program second state : ', programList)
			getReinsurerInfo().then((info) => {
				console.log('Info user : ', info)
			})
			// return value
		})
		// .then(value => setProgramList(value))
		console.log('Program second state : ', programList)
	}, [])

	/**
	 * get all program liste to populate dashboard
	 */
	const getProgramListHandler = async () => {
		return getAllReinsurerProgramListFill()
			.then((value) => value.json())
			.then((value) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(value)
				console.log('Program first state   : ', programList)
				setProgramList(value)
				console.log('Program second state : ', programList)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	}

	/**
	 * get all program list to populate dashboard
	 */
	const getReinsurerInfo = async () => {
		return getReinsurer()
			.then((value) => value.json())
			.then((value) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(value)
				console.log('reinsurer info  : ', value)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	}

	return (
		<>
			<section className='placement-content'>
				{/* header of placement box */}
				<div className='placement-header'>
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
				</div>

				{/* body of placement body */}
				<section className='placement-display'>
					{programList ? <ProgramList listProgram={programList} /> : ''}
				</section>

				{/* content footer of placement body */}
			</section>
		</>
	)
}

export default ReinsurerProgramHome
