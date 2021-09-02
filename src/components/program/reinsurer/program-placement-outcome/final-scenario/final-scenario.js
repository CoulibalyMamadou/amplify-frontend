import * as PropTypes from 'prop-types'
import './final-scenario.scss'
import { useEffect, useState } from 'react'

const FinalScenario = ({ finalResult, reinsurer, setShare }) => {
	/**
	 * Quotation list
	 */
	const [list, setlist] = useState([])
	/**
	 * reinsurer id
	 */
	const reinsurerId = reinsurer && reinsurer
	/**
	 * Array of final quotation
	 */
	const placementArray = finalResult.finalScenario?.allocations

	/**
	 * Array of object who containes share + adjusted reate
	 */
	const arrayOfShare = []

	/**
	 * return correct share regarding the id of the office
	 * @param {*} target
	 * @returns
	 */

	const reinsurerShare = (target) => {
		const recup =
			target && target.find((match) => match.idOffice === reinsurerId)
		console.log('share recup', recup.share)
		// arrayOfShare.map((item) => (item.share = recup.share))
		// arrayOfShare.push({ share: recup.share })
		// setShare(arrayOfShare)
		return recup.share
	}

	const adjustedRate = (placementArray) => {
		placementArray &&
			placementArray.map((elem, index) => {
				return arrayOfShare.push({
					rate: elem.price,
					layer: 'layer ' + (index + 1),
					share: reinsurerShare(elem.allocation)
				})
			})
		setShare(arrayOfShare)
	}

	console.log('share adjusted', adjustedRate)
	console.log('share array', arrayOfShare)
	/**
	 * Display quotations
	 * @param {*} finalQuote
	 */
	const placementOutcome = (finalQuote) => {
		const list =
			finalQuote &&
			finalQuote.map((elem, index) => {
				return (
					<ul key={index} className='layer-name'>
						<li className='layer'>
							<div className='layer-container'> Layer {index + 1} :</div>
							<ul>
								<li>
									<div key={index} className='text-container'>
										<div className='share-container'>
											Share {reinsurerShare(elem.allocation)}%
										</div>
										<div>Adjusted Rate {elem.price.toFixed(3)}%</div>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				)
			})
		setlist(list)
	}

	useEffect(() => {
		placementOutcome(placementArray)
		adjustedRate(placementArray)
	}, [placementArray])

	return (
		<section className='placement-final-quotation-container'>
			<div className='quotation-final-list'>{list}</div>
		</section>
	)
}

FinalScenario.propTypes = {
	finalResult: PropTypes.object,
	reinsurer: PropTypes.object,
	setShare: PropTypes.func
}

export default FinalScenario
