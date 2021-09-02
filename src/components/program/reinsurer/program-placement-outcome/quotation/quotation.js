import * as PropTypes from 'prop-types'
import './quotation.scss'
import { useEffect, useState } from 'react'
import TotalPrice from './total-price/total-price'
import QuotationGraph from '../../program-quotation/quotation-layer-list/quotation-layer/quotation-graph/quotation-graph'

const Quotation = ({ quotation, program, reinsurer, share = [] }) => {
	/**
	 * Quotation list
	 */
	const [list, setlist] = useState([])
	// const [shareOutcome, setShareOutcome] = useState([])
	console.log('Share quotation', share)
	/**
	 * reinsurer id
	 */
	const reinsurerId = reinsurer && reinsurer

	/**
	 * return the right quotation regardinf the id
	 */
	const reinsurerQuotation = [
		quotation && quotation.find((match) => match.office === reinsurerId)
	]
	/**
	 * Array who containes previous quotation
	 */
	const quotationArray =
		reinsurerQuotation &&
		reinsurerQuotation.map((elem) => {
			return elem.quotation?.quotations
		})

	/**
	 * Display quotations
	 * @param {*} quotation
	 */
	const quotationList = (quotation) => {
		const list =
			quotation &&
			quotation[0] &&
			quotation[0].map((elem, index) => {
				return (
					<ul key={index} className='layer-name'>
						<div className='layer'>
							<div className='layer-container'>Layer {index + 1} :</div>

							{elem.quote &&
								elem.quote.map((item, index2) => {
									return (
										<section key={index2} className={'quotation-display-box'}>
											<div className='text-container'>
												<div className='share-container'>
													Share {item.quantity}%
												</div>

												<div>Adjusted Rate {item.price.toFixed(3)}%</div>
											</div>

											<section className='quotation-display'>
												{/* <div>GRAPH HERE</div> */}
												{share[index] && (
													<QuotationGraph
														quotation={elem.quote}
														layers={[]}
														outcome={share[index]}
													/>
												)}
											</section>
										</section>
									)
								})}
						</div>
					</ul>
				)
			})
		setlist(list)
	}

	useEffect(() => {
		quotationList(quotationArray)
	}, [quotation, share])

	return (
		<>
			<section className='quotation-container'>
				<h4>Quotation</h4>
				<TotalPrice quotation={quotationArray} program={program} />
				<div className='quotation-list'>{list}</div>
			</section>
		</>
	)
}

Quotation.propTypes = {
	quotation: PropTypes.array,
	program: PropTypes.object,
	reinsurer: PropTypes.object,
	share: PropTypes.array
}

export default Quotation
