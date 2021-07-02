import * as PropTypes from 'prop-types'
import './general-information.scss'

const GeneralInformation = ({ program }) => {
	/**
	 * Converte all letter in Upper case to lower case exept the first
	 * Replace '_' by ' '
	 * @param {*} str
	 * @returns {string}
	 */
	const capitalizeFirstLetter = (str = '') => {
		return (
			str.charAt(0).toUpperCase() +
			str.slice(1).toLowerCase().replaceAll('_', ' ')
		)
	}

	/**
	 * Replace comma by dot
	 * @param {*} num
	 * @returns {string}
	 */
	const replaceComaByDot = (num) => {
		return num.toString().replaceAll(',', '.')
	}

	return (
		<section className='general-information'>
			<section className='display-modify'>
				<h3>General information</h3>
			</section>

			<section className='display-information'>
				<ul>
					<li>{program.title}</li>
					<li>{capitalizeFirstLetter(program.type)}</li>
					<li>{capitalizeFirstLetter(program.lineOfBusiness)}</li>
					<li>{capitalizeFirstLetter(program.riskStructure)}</li>
					<li>Estimated Premium Income : {program.premiumIncome} (M€)</li>
					<li>
						Budget of the cedent for the program : {program.premiumIncome} (M€)
					</li>
					<li>Limit : {program.limit} (M€)</li>
					{program.layers &&
						program.layers.map((layer, index) => {
							return (
								<ul key={index}>
									<li>
										Layer {index + 1} : {layer.layerLimit}M xs{' '}
										{layer.attachmentPoint}M {layer.portion}%
										{layer.reinstatement ? (
											layer.reinstatement.infinite ? (
												` - Infinite @${layer.reinstatement.clause}%`
											) : (
												` - ${replaceComaByDot(layer.reinstatement.number)}@${
													layer.reinstatement.clause
												}%`
											)
										) : (
											<div></div>
										)}
									</li>
								</ul>
							)
						})}
				</ul>
			</section>
		</section>
	)
}

GeneralInformation.propTypes = {
	program: PropTypes.object,
	handleClick: PropTypes.func
}

export default GeneralInformation
