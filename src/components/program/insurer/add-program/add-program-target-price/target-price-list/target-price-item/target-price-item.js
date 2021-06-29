import './target-price-item.scss'
import { useEffect, useState } from 'react'
import Input from '../../../../../../form-component/Input/Input'
import * as PropTypes from 'prop-types'

const TargetPriceItem = ({ index, changed = null, defaultValue }) => {
	const targetPriceForm = {
		price: {
			name: 'layer' + (index + 1),
			label: 'Layer ' + (index + 1),
			subLabel: 'Premium rate',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: '100',
				min: 0,
				max: 100
			},
			value: defaultValue || 0,
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		}
	}

	const [price, setPrice] = useState({})

	useEffect(() => {
		changed(index, price)
	}, [price])

	const updateHandler = (inputIdentifier, inputValue) => {
		setPrice(inputValue)
	}

	const formElementsArray = []

	for (const key in targetPriceForm) {
		formElementsArray.push({
			id: key,
			config: targetPriceForm[key]
		})
	}

	return (
		<>
			{formElementsArray.map((formElement) => {
				return (
					<Input
						id={formElement.id}
						key={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						subLabel={formElement.config.subLabel}
						defaultValue={formElement.config.value}
						value={formElement.config.value}
						elementConfig={formElement.config.elementConfig}
						changed={updateHandler}
					/>
				)
			})}
		</>
	)
}

TargetPriceItem.propTypes = {
	index: PropTypes.number,
	changed: PropTypes.func,
	defaultValue: PropTypes.number
}

export default TargetPriceItem
