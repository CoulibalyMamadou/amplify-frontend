import './placement-outcome.scss'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

import {
	getProgramQuoteConstraintListFill,
	getProgramByIdFill,
	getAllProgramQuotationAndPreviousQuotationListFill
} from '../../../../api/program.service'
import { requestInterceptor } from '../../../../sessionStorage/sessionStorage'
import { getReinsurer } from '../../../../api/reinsurer.service'
import Quotation from './quotation/quotation'
import PreviousQuotation from './previous-quotation/previous-quotation'
import ReinsurerSubjectivities from './reinsurer-subjectivities/reinsurer-subjectivities'

const PlacementOutcome = () => {
	/**
	 * Quotatiion value
	 */
	const [quotation, setQuotation] = useState({})
	/**
	 * Program value
	 */
	const [program, setProgram] = useState({})

	/**
	 * Quote constraints
	 */
	const [constraintAllocation, setConstraintAllocation] = useState([])
	/**
	 * Equal share constraint
	 */
	const [equalShare, setEqualShare] = useState(false)
	/**
	 * Get id of the program
	 */
	const { programId } = useParams()
	/**
	 * Loader
	 */
	const [isLoading, setIsLoading] = useState(true)
	/**
	 * reinsurer info
	 */
	const [reinsurer, setReinsurer] = useState([])

	/**
	 * Get quote constraints
	 * @returns {Object}
	 */
	const getQuoteConstraintList = () => {
		return getProgramQuoteConstraintListFill({
			programId
		})
			.then((res) => res.json())
			.then((allQuoteConstraints) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(allQuoteConstraints)
				setEqualShare(() => allQuoteConstraints.equalShare)
				const { constraints } = allQuoteConstraints
				setConstraintAllocation(() => [...constraints])
				return constraints
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	/**
	 * Get all the info of a a program by id, quotations of a program and reinsurer
	 * @returns {Object}
	 */
	const getProgramInfo = async () => {
		return getProgramByIdFill(programId)
			.then((res) => res.json())
			.then((result) => {
				setProgram(result)

				return result
			})
			.then(
				getReinsurer()
					.then((value) => value.json())
					.then((value) => {
						/**
						 * Intercept Error code from API request
						 */
						requestInterceptor(value)
						setReinsurer(value)
						getAllProgramQuotationAndPreviousQuotationListFill({ programId })
							.then((res) => res.json())
							.then((result) => {
								setQuotation(result)
								setIsLoading(false)
								return result
							})

							.catch((reason) => {
								console.log('Quotation unknown : ', reason)
							})
						return value
					})

					.catch((reason) => {
						console.log('Fatal Error : ', reason)
					})
			)
			.catch((reason) => {
				console.log('Program unknown : ', reason)
			})
	}

	useEffect(() => {
		getProgramInfo().then((result) => {
			console.log('program link : ', result)
		})

		getQuoteConstraintList().then((result) => {
			console.log('Constraints Quotations : ', result)
		})
	}, [])
	console.log('quotation', quotation)
	return isLoading ? (
		<div></div>
	) : (
		<section className='placementOutcome-content'>
			<section className='placement-display'>
				<section className='placement-container'>
					<section className='first-stage-container'>
						<h3>Quotation First Stage</h3>
						<ReinsurerSubjectivities
							reinsurer={reinsurer.office.name}
							constraintQuotation={constraintAllocation}
							quotation={quotation.quotation}
							equalShare={equalShare}
							program={program}
						/>
						<PreviousQuotation
							quotation={quotation.quotation}
							program={program}
							reinsurer={reinsurer.office?._id}
						/>
					</section>
					<section className='second-stage-container'>
						<h3>Quotation Second Stage</h3>
						<ReinsurerSubjectivities
							reinsurer={reinsurer.office.name}
							constraintQuotation={constraintAllocation}
							quotation={quotation.quotation}
							equalShare={equalShare}
							program={program}
						/>
						<Quotation
							quotation={quotation.quotation}
							program={program}
							reinsurer={reinsurer.office?._id}
						/>
					</section>
					<section className='placement-outcome-container'>
						<h3>Placement Outcome</h3>
					</section>
				</section>
			</section>
		</section>
	)
}

export default PlacementOutcome