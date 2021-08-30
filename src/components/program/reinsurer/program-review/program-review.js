import './program-review.scss'
import { useEffect, useState } from 'react'
import {
	getProgramByIdFill,
	getAllConstraintListFill
} from '../../../../api/program.service'
import { getOffice } from '../../../../api/office.service'
import { useLocation } from 'react-router'
import { requestInterceptor } from '../../../../sessionStorage/sessionStorage'
import GeneralInformation from './general-information/general-information'
import CendentSubjectivities from '../program-review/cedent-subjectivities/cedent-subjectivities'

const ProgramReview = () => {
	/**
	 * Url path
	 */
	const location = useLocation()
	/**
	 * Program value
	 */
	const [program, setProgram] = useState({})

	/**
	 * Loader
	 */
	const [isLoading, setIsLoading] = useState(true)

	/**
	 * Insurer constraints
	 */
	const [constraint, setConstraint] = useState([])
	/**
	 * Reinsurer info
	 */
	const [office, setOffice] = useState({})

	/**
	 * GetLocation Without programId
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
				setIsLoading(false)
				return result
			})
			.catch((reason) => {
				console.log('Program unknown : ', reason)
			})
	}

	/**
	 * Get insurer constraints
	 * @returns
	 */
	const getConstraints = async () => {
		return getAllConstraintListFill(id)
			.then((res) => res.json())
			.then((response) => {
				setConstraint(response)
				return response
			})

			.catch((reason) => {
				console.log('Quotation unknown : ', reason)
			})
	}

	/**
	 * Get Reinsurer info
	 * @returns
	 */
	const getOfficeInfo = async () => {
		return getOffice()
			.then((value) => value.json())
			.then((value) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(value)
				setOffice(value)

				console.log('office info  : ', value)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	}

	useEffect(() => {
		getProgramInfo().then((result) => {
			console.log('program link Program : ', result)
		})
		getConstraints().then((result) => {
			console.log('Constraints : ', result)
		})

		getOfficeInfo().then((result) => {
			console.log('Office info : ', result)
		})
	}, [])

	return isLoading ? (
		<div></div>
	) : (
		<section className='review-content-reinsurer'>
			<section className='review-display'>
				<section className='review-informations'>
					<GeneralInformation program={program} />
					{program.status === 'COMPLETE' ? (
						<CendentSubjectivities
							program={program}
							reinsurer={office.name}
							constraint={constraint}
						/>
					) : (
						<div></div>
					)}
				</section>
			</section>
		</section>
	)
}

export default ProgramReview
