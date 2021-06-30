import './program-review.scss'
import { useEffect, useState } from 'react'
import {
	getProgramByIdFill,
	getProgramQuoterListById,
	getAllProgramConstraintListFill
} from '../../../../api/program.service'

import { LIST_LINK } from '../../../../constants/index'
import { useLocation, useHistory } from 'react-router'
import GeneralInformation from './general-information/general-information'
import Documents from './documents/documents'
import TargetPrice from './target-price/target-price'
import ReinsurerTypes from './reinsurer-types/reinsurer-types'
import AllocationSettings from './allocation-settings-review/allocation-settings-review'

const ProgramReview = () => {
	/**
	 * Url path
	 */
	const location = useLocation()
	/**
	 * Get user navigation history for redirection
	 * @type {History<LocationState>}
	 */
	const history = useHistory()

	/**
	 * Program value
	 */
	const [program, setProgram] = useState({})

	/**
	 * Quoters and followers list
	 */
	const [quoterList, setQuoterList] = useState([])

	/**
	 * Program costraint
	 */
	const [constraint, setConstraint] = useState([])

	/**
	 * Loader
	 */
	const [isLoading, setIsLoading] = useState(true)

	/**
	 * Get Location Without program path
	 * @returns {string}
	 */
	const getCurrentParamWithoutPath = () => {
		return location.pathname.slice(
			location.pathname.lastIndexOf('/') + 1,
			location.pathname.length
		)
	}
	const id = getCurrentParamWithoutPath()
	/**
	 * Get all the info of a a program by id
	 * @returns
	 */
	const getProgramInfo = async () => {
		return getProgramByIdFill(id)
			.then((res) => res.json())
			.then((result) => {
				setProgram(result)

				return result
			})
			.then(
				getProgramQuoterListById(id)
					.then((res) => res.json())
					.then((response) => {
						setQuoterList(response)
						console.log(response)
						getAllProgramConstraintListFill(id)
							.then((res) => res.json())
							.then((responseConstraint) => {
								setConstraint(responseConstraint)
								setIsLoading(false)
								return responseConstraint
							})
							.catch((reason) => {
								console.log('Program unknown : ', reason)
							})

						return response
					})

					.catch((reason) => {
						console.log('Program unknown : ', reason)
					})
			)

			.catch((reason) => {
				console.log('Program unknown : ', reason)
			})
	}

	useEffect(() => {
		getProgramInfo().then((result) => {
			console.log('program link Program : ', result)
		})
	}, [])

	/**
	 * Redirect to the page to modify
	 * @param {*} event
	 */
	const handleClick = (event) => {
		const identification = event.currentTarget.id

		if (identification === 'DOCUMENT') {
			history.push(LIST_LINK.ADD_DOCUMENT + '/' + id)
		}
		if (identification === 'ADD_ALLOCATION_CONSTRAINT') {
			history.push(LIST_LINK.ADD_ALLOCATION_CONSTRAINT + '/' + id)
		}
		if (identification === 'ADD_QUOTER_LIST') {
			history.push(LIST_LINK.ADD_QUOTER_LIST + '/' + id)
		}
		if (identification === 'ADD_TARGET_PRICE') {
			history.push(LIST_LINK.ADD_TARGET_PRICE + '/' + id)
		}
	}

	return isLoading ? (
		<div></div>
	) : (
		<section className='review-content'>
			<section className='review-display'>
				<section className='review-informations'>
					<GeneralInformation program={program} handleClick={handleClick} />
					<Documents program={program} handleClick={handleClick} />
					<TargetPrice program={program} handleClick={handleClick} />
					<ReinsurerTypes handleClick={handleClick} quoterList={quoterList} />
					<AllocationSettings
						program={program}
						handleClick={handleClick}
						constraint={constraint}
					/>
				</section>
			</section>
		</section>
	)
}

export default ProgramReview
