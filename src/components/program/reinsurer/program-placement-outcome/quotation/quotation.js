import * as PropTypes from 'prop-types'
import './quotation.scss'
import { useState, useEffect } from 'react'
import TotalPrice from './total-price/total-price'

const Quotation = ({ quotation, program, reinsurer }) => {
	/**
	 * Quotation list
	 */
	const [list, setlist] = useState([])

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
						<li className='layer'>
							<div className='layer-container'>Layer {index + 1} :</div>
							<ul>
								<li>
									{elem.quote &&
										elem.quote.map((item, index) => {
											return (
												<div key={index} className='text-container'>
													<div className='share-container'>
														Share {item.quantity}%
													</div>

													<div>Adjusted Rate {item.price.toFixed(3)}%</div>
												</div>
											)
										})}
								</li>
							</ul>
						</li>
					</ul>
				)
			})
		setlist(list)
	}

	useEffect(() => {
		quotationList(quotationArray)
	}, [quotation])

	return (
		<section className='quotation-container'>
			<h4>Quotation</h4>
			<TotalPrice quotation={quotationArray} program={program} />
			<div className='quotation-list'>{list}</div>
		</section>
	)
}

Quotation.propTypes = {
	quotation: PropTypes.array,
	program: PropTypes.object,
	reinsurer: PropTypes.object
}

export default Quotation
