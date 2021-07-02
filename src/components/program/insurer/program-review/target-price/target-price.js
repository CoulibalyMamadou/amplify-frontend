import './target-price.scss'
import { FaPen } from 'react-icons/fa'
import * as PropTypes from 'prop-types'

const TargetPrice = ({ program = {}, handleClick }) => {
	/**
	 * Add decimal
	 * @param {*} number
	 * @returns {string}
	 */
	const addDecimal = (number) => {
		if (number === 0) {
			return '0'
		} else {
			return Number(number).toFixed(2)
		}
	}
	return (
		<section className='target-prices'>
			<section className='display-modify'>
				<h3>Target prices</h3>
				{program.status === 'UNCOMPLETE' ? (
					<FaPen
						className='faPen'
						id='DOCUMENT'
						data-testid='DOCUMENT'
						onClick={handleClick}
					/>
				) : (
					<div></div>
				)}
			</section>
			<section className='display-target-prices'>
				{program.layers &&
					program.layers.map((layer, index) => {
						return (
							<ul key={index}>
								<li>
									Layer {index + 1} : {addDecimal(layer.targetPrice)}% Premium
									rate
								</li>
							</ul>
						)
					})}
			</section>
		</section>
	)
}

TargetPrice.propTypes = {
	program: PropTypes.object,
	handleClick: PropTypes.func
}

export default TargetPrice
