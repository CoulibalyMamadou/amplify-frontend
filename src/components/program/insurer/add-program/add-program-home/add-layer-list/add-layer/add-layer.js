import './add-layer.scss'
import { useEffect, useState } from 'react'
import Input from '../../../../../../form-component/Input/Input'
import Select from '../../../../../../form-component/Select/Select'
import * as PropTypes from 'prop-types'
import AddReinstatement from './add-reinstatement/add-reinstatement'

/**
 * Layer edit component
 * @param index layer index in list
 * @param changed update function on change
 * @param limit limit of layer
 * @param limitMin fewest possible value for layer
 * @param attachmentPoint point to fix layer
 * @returns {JSX.Element}
 * @constructor
 */
const AddLayer = ({
	index,
	changed = null,
	limit,
	limitMin,
	attachmentPoint
}) => {
	/**
	 * Default set of layer value
	 * @type {{attachmentPoint, reinstatement: {}, portion: number, layerLimit}}
	 */
	const layerValue = {
		layerLimit: limitMin,
		attachmentPoint,
		portion: 0,
		reinstatement: {}
	}

	/**
	 * Layer value
	 */
	const [layer, setLayer] = useState(layerValue)

	/**
	 * Form description for Layer Edit
	 * @type {{attachmentPoint: {valid: boolean, touched: boolean, elementConfig: {min: *, max, step: number, placeholder, type: string}, name: string, label: string, elementType: string, value}, portion: {valid: boolean, touched: boolean, elementConfig: {min: number, max: number, step: number, placeholder: number, type: string}, name: string, label: string, elementType: string, value: number}, layerLimit: {valid: boolean, touched: boolean, elementConfig: {min: *, max, step: number, placeholder, type: string}, name: string, label: string, elementType: string, value}}}
	 */
	const layerForm = {
		layerLimit: {
			name: 'layerLimit',
			label: 'Layer Limit (M€)',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: limitMin,
				min: limitMin + 0.0,
				step: 0.1,
				max: limit
				// min: 0.0,
			},
			value: limitMin,
			valid: false,
			touched: false
		},
		attachmentPoint: {
			name: 'attachmentPoint',
			label: 'Attachment Point (M€)',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: attachmentPoint,
				min: attachmentPoint + 0.0,
				step: 0.1,
				max: layer.layerLimit
				// disabled: true
			},
			value: attachmentPoint,
			valid: false,
			touched: false
		},
		portion: {
			name: 'portion',
			label: 'Portion (%)',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: 100,
				min: 0.0,
				step: 0.1,
				max: 100
			},
			value: 100,
			valid: false,
			touched: false
		}
	}

	useEffect(() => {
		changed(index, layer)
		// console.log('Layer update: ', layer)
	}, [layer])

	/**
	 * Update layer value
	 * @param inputIdentifier index of layer in list
	 * @param inputValue update value for layer
	 */
	const updateHandler = (inputIdentifier, inputValue) => {
		setLayer((prevState) => ({
			...prevState,
			[inputIdentifier]: inputValue
		}))
	}

	/**
	 * Update reinstatement
	 * @param reinstatement update value of reinstatement
	 */
	const updateReinstatementView = (reinstatement) => {
		updateHandler('reinstatement', reinstatement)
	}

	/**
	 * Format & generate value for layer form
	 * @type {*[]}
	 */
	const formElementsArray = []
	for (const key in layerForm) {
		formElementsArray.push({
			id: key,
			config: layerForm[key]
		})
	}

	/**
	 * Layer edit bloc
	 */
	return (
		<div className='layer-view'>
			<div className='layer-bloc'>
				{formElementsArray.map((formElement) => {
					switch (formElement.config.elementType) {
						case 'input':
							return (
								<Input
									id={formElement.config.name}
									key={formElement.id}
									name={formElement.config.name}
									label={formElement.config.label}
									value={formElement.config.value}
									elementConfig={formElement.config.elementConfig}
									changed={updateHandler}
								/>
							)
						// break
						case 'select':
							return (
								<Select
									id={formElement.id}
									key={formElement.id}
									name={formElement.config.name}
									label={formElement.config.label}
									// value={formElement.config.value}
									elementConfig={formElement.config.elementConfig}
									changed={updateHandler}
								/>
							)

						default:
							return (
								<Input
									id={formElement.id}
									key={formElement.id}
									name={formElement.config.name}
									label={formElement.config.label}
									// value={formElement.config.value}
									elementConfig={formElement.config.elementConfig}
									changed={updateHandler}
								/>
							)
					}
				})}
			</div>
			{/* Reinstatement component for layer */}
			<AddReinstatement changed={updateReinstatementView} />
		</div>
	)
}
/**
 * Add layer parameter type
 * @type {{attachmentPoint: Requireable<number>, limit: Requireable<number>, index: Requireable<number>, limitMin: Requireable<number>, changed: Requireable<(...args: any[]) => any>}}
 */
AddLayer.propTypes = {
	index: PropTypes.number,
	changed: PropTypes.func,
	limit: PropTypes.number,
	limitMin: PropTypes.number,
	attachmentPoint: PropTypes.number
}

export default AddLayer
