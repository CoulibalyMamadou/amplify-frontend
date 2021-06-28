import './target-price.scss'
import { FaPen } from 'react-icons/fa'
import * as PropTypes from 'prop-types'

const TargetPrice = ({ program, handleClick }) => {
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
				<FaPen
					className='faPen'
					id='ADD_TARGET_PRICE'
					data-testid='ADD_TARGET_PRICE'
					onClick={handleClick}
				/>
			</section>
			<section className='display-target-prices'>
				{program.layers.map((layer, index) => {
					return (
						<ul key={index}>
							<li>
								Layer {index + 1} : {addDecimal(layer.targetPrice)}% Rol
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
