import './program-review.scss'
import { useEffect, useState } from 'react'
import { getProgramByIdFill } from '../../../../api/program.service'
import { useLocation } from 'react-router'

import GeneralInformation from './general-information/general-information'
import Documents from './documents/documents'
// import TargetPrice from './target-price/target-price'

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
	 * GetLocation Without programId
	 * @returns {string}
	 */
	const getCurrentParamWithoutPath = () => {
		return location.pathname.slice(
			location.pathname.lastIndexOf('/') + 1,
			location.pathname.length
		)
	}

	/**
	 * Get all the info of a a program by id
	 * @returns
	 */
	const getProgramInfo = async () => {
		const id = getCurrentParamWithoutPath()
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
	 * Get quoter and follower list
	 * @returns
	 */

	useEffect(() => {
		getProgramInfo().then((result) => {
			console.log('program link Program : ', result)
		})
	}, [])

	return isLoading ? (
		<div></div>
	) : (
		<section className='review-content'>
			<section className='review-display'>
				<section className='review-informations'>
					<GeneralInformation program={program} />
					<Documents program={program} />
					{/* <TargetPrice program={program} /> */}
				</section>
			</section>
		</section>
	)
}

export default ProgramReview
