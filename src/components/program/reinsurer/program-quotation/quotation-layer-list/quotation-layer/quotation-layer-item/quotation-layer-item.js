import './quotation-layer-item.scss'
import { useEffect, useState } from 'react'
import Input from '../../../../../../form-component/Input/Input'
import { TiDeleteOutline } from 'react-icons/all'
import * as PropTypes from 'prop-types'

const QuotationLayerItem = ({
	index,
	changed,
	deleted,
	quotation = {
		price: 0,
		quantity: 0
	},
	min = 0,
	max = 100
}) => {
	const layerForm = {
		quantity: {
			name: 'quantity',
			label: 'Quantity (%)',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: min,
				step: 0.1,
				min,
				max
			},
			value: quotation.quantity,
			valid: false,
			touched: false
		},
		price: {
			name: 'price',
			label: 'Price (Premium rate)',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: 100,
				step: 0.1,
				min: 0,
				max
			},
			value: quotation.price,
			valid: false,
			touched: false
		}
	}

	const [layer, setLayer] = useState()

	useEffect(() => {
		changed(index, layer)
	}, [layer])

	const updateHandler = (inputIdentifier, inputValue) => {
		setLayer((prevState) => ({
			...prevState,
			[inputIdentifier]: inputValue
		}))
		// console.log('index Layer update: ', inputIdentifier)
	}

	const deleteHandler = () => {
		deleted(index)
		// console.log('index Layer update: ', inputIdentifier)
	}

	const formElementsArray = []
	for (const key in layerForm) {
		// console.log('programForm key : ', key)
		formElementsArray.push({
			id: key,
			config: layerForm[key]
		})
	}

	const viewDisplay = (
		<>
			{formElementsArray.map((formElement, index) => {
				return (
					<span key={index} className='row-field'>
						<Input
							id={formElement.config.name}
							key={formElement.id}
							name={formElement.config.name}
							label={formElement.config.label}
							value={formElement.config.value}
							elementConfig={formElement.config.elementConfig}
							changed={updateHandler}
						/>
					</span>
				)
			})}
		</>
	)

	return (
		<>
			<span className='layer-quotation-row'>
				{viewDisplay}
				<TiDeleteOutline
					size='1.4em'
					color='red'
					cursor='pointer'
					onClick={deleteHandler}
				/>
			</span>
		</>
	)
}

QuotationLayerItem.propTypes = {
	index: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	quotation: PropTypes.object,
	changed: PropTypes.func,
	deleted: PropTypes.func
}

export default QuotationLayerItem
