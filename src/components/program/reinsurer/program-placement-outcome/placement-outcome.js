import './placement-outcome.scss'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

import {
	getProgramQuoteConstraintListFill,
	getProgramByIdFill,
	getAllProgramQuotationAndPreviousQuotationListFill,
	getFinalScenario
} from '../../../../api/program.service'
import { requestInterceptor } from '../../../../sessionStorage/sessionStorage'
import { getReinsurer } from '../../../../api/reinsurer.service'
import Quotation from './quotation/quotation'
// import PreviousQuotation from './previous-quotation/previous-quotation'
import ReinsurerSubjectivities from './reinsurer-subjectivities/reinsurer-subjectivities'
import FinalScenario from './final-scenario/final-scenario'
import PorgramTotalPremiums from './program-total-premiums/program-total-premiums'
import PreviousQuotation from './previous-quotation/previous-quotation'

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

	const [finalResult, setFinalResult] = useState({})

	const [shareArray, setShareArray] = useState([])

	const setShare = (share) => {
		setShareArray(share)
	}
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

	const getFinalResult = () => {
		return getFinalScenario(programId)
			.then((res) => res.json())
			.then((result) => {
				setFinalResult(result)
				return result
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
		getFinalResult().then((result) => {
			console.log('Final Scenario : ', result)
		})
	}, [])
	console.log('quotation', quotation)
	return isLoading ? (
		<div></div>
	) : (
		<section className='placementOutcome-content'>
			<section className='placement-display'>
				<section className='placement-container'>
					<section className='placement-outcome-container'>
						<h3>Placement Outcome</h3>
						<PorgramTotalPremiums program={program} finalResult={finalResult} />
						<FinalScenario
							finalResult={finalResult}
							reinsurer={reinsurer.office?._id}
							setShare={setShare}
						/>
					</section>
					<section className='second-stage-container'>
						<h3>Final Quotation</h3>
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
							share={shareArray}
						/>
					</section>
					{/* <section className='first-stage-container'>
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
					</section> */}
				</section>
			</section>
		</section>
	)
}

export default PlacementOutcome
