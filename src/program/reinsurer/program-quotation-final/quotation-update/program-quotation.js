import './program-quotation.scss'
import { useEffect, useState } from 'react'
import QuotationLayerList from '../quotation-layer-list/quotation-layer-list'
import { programSave } from '../../../../../api/program.service'

const ProgramQuotation = () => {
	const programStructure = {
		title: {
			name: 'title',
			label: 'Title',
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Title'
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		type: {
			name: 'type',
			label: 'Reinsurance type',
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Treaty reinsurance'
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		lineOfBusiness: {
			name: 'line-business',
			label: 'Line of business',
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Marine'
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		structure: {
			name: 'structure',
			label: 'Structure',
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'Excess of Loss', displayValue: 'Excess of Loss' },
					{ value: 'cheapest', displayValue: 'Cheapest' }
				]
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		limit: {
			name: 'limit',
			label: 'Limit (M€)',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: '€50M',
				min: 0
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		}
	}

	// use state for this declaration
	const formElementsArray = []

	/**
	 * Init structure for form render
	 * @returns {{}}
	 */
	const initProgramStructure = () => {
		let updatedProgram = {}
		for (const key in programStructure) {
			console.log('programForm key : ', key)
			formElementsArray.push({
				id: key,
				config: programStructure[key]
			})
			updatedProgram = {
				...updatedProgram,
				[key]: {
					value: '',
					valid: false,
					touched: false
				}
			}
		}
		return updatedProgram
	}
	const [programForm, setFormData] = useState(initProgramStructure())
	const [limit, setLimit] = useState(0)

	useEffect(() => {
		setFormData((prevState) => ({
			...prevState,
			limit: {
				value: 0,
				valid: false,
				touched: false
			},
			layers: []
		}))
	}, [])

	useEffect(() => {
		setLimit(programForm.limit.value)
	}, [programForm.limit])

	/**
	 * Update layer list
	 * @param layerListData
	 */
	const layerFromListHandler = (layerListData) => {
		setFormData((prevState) => ({
			...prevState,
			layers: layerListData
		}))
	}

	/**
	 * save data in file for feature for @Tristan
	 */
	const saveDataHandler = () => {
		programSave(programForm)
			.then((res) => res.json())
			.then((value) => {
				console.log('retour  : ', value)
			})
			.catch((reason) => {
				console.log('retour  : ', reason)
			})
	}

	/**
	 * change data value for form for all st ate field change
	 * @param inputIdentifier id of target field
	 * @param inputValue
	 */
	const programFieldChangedHandler = (inputIdentifier, inputValue) => {
		const updatedProgramForm = {
			...programForm
		}

		const updatedProgramField = {
			...updatedProgramForm[inputIdentifier]
		}

		updatedProgramField.value = inputValue
		updatedProgramField.valid = true
		updatedProgramField.touched = true
		updatedProgramForm[inputIdentifier] = updatedProgramField

		setFormData(updatedProgramForm)
		console.log('programForm : ', programForm)
		// this.setState({programForm: updatedOrderForm, formIsValid: formIsValid});
	}

	console.log('programFieldChangedHandler : ', programFieldChangedHandler)
	console.log('saveDataHandler : ', saveDataHandler)

	return (
		<section className='add-quotation-content'>
			{/* header of placement box */}
			<QuotationLayerList limit={limit} onChanged={layerFromListHandler} />
		</section>
	)
}

export default ProgramQuotation
