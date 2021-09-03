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
					<div key={index} className='layer-name'>
						<div className='layer'>
							<section className={'layer-info'}>
								<div className='layer-container'>Layer {index + 1} :</div>
								{elem.quote &&
									elem.quote.map((item, index2) => {
										return (
											<span key={index2} className='text-container-share'>
												<span> Share {item.quantity}% </span>
												<span>Adjusted Rate {item.price.toFixed(3)}%</span>
											</span>
										)
									})}
							</section>
							<section className='quotation-display'>
								{/* <div>GRAPH HERE</div> */}
								{share[index] && elem && (
									<QuotationGraph
										quotation={elem.quote}
										layers={[]}
										outcome={share[index]}
									/>
								)}
							</section>
						</div>
					</div>
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
