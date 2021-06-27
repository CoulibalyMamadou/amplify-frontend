import './add-program-home.scss'
import { useEffect, useState } from 'react'
import add from '../../../../../assets/icon/add-icon.png'
import AddLayerList from './add-layer-list/add-layer-list'
import { createProgram } from '../../../../../api/program.service'
import AddProgramInfo from './add-placement-info/add-program-info'
import {
	LIST_LINK,
	PROGRAM_TYPE_OPTIONS,
	STRUCTURE_OPTIONS_GROUP,
	TOAST,
	TYPE_OPTIONS_GROUP
} from '../../../../../constants'
// import { useSelector } from 'react-redux'
import useToast from '../../../../../containers/Toast/useToast/useToast'
import { useHistory } from 'react-router'
import { requestInterceptor } from '../../../../../sessionStorage/sessionStorage'

/**
 * Home page for new program creation
 * @returns {JSX.Element}
 * @constructor
 */
const AddProgramHome = () => {
	/**
	 * Toast component for notification
	 */
	const { updateToast, ToastComponent } = useToast('', 'success')

	/**
	 * Navigation history
	 * @type {History<LocationState>}
	 */
	const history = useHistory()

	/**
	 * Describe structure for generate form component
	 * @type {{lineOfBusiness: {valid: boolean, touched: boolean, elementConfig: {optGroup: [{options, label: string}, {options, label: string}, {options: [{displayValue: string, value: string}], label: string}]}, name: string, label: string, elementType: string, value: string}, riskStructure: {valid: boolean, touched: boolean, elementConfig: {optGroup: [{options: [{displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, disabled: boolean, value: string}], label: string}, {options: [{displayValue: string, disabled: boolean, value: string}, {displayValue: string, disabled: boolean, value: string}], label: string}]}, name: string, label: string, elementType: string, value: string}, limit: {valid: boolean, touched: boolean, elementConfig: {min: number, step: number, placeholder: number, type: string}, name: string, label: string, elementType: string, value: number}, title: {valid: boolean, touched: boolean, elementConfig: {placeholder: string, type: string}, name: string, label: string, elementType: string, value: string}, type: {valid: boolean, touched: boolean, elementConfig: {options: [{displayValue: string, value: string}, {displayValue: string, value: string}]}, name: string, label: string, elementType: string, value: string}}}
	 */
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
			elementType: 'select',
			elementConfig: PROGRAM_TYPE_OPTIONS,
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
			elementType: 'select',
			elementConfig: TYPE_OPTIONS_GROUP,
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		riskStructure: {
			name: 'riskStructure',
			label: 'Risk structure',
			elementType: 'select',
			elementConfig: STRUCTURE_OPTIONS_GROUP,
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
				placeholder: 0.0,
				step: 0.1,
				min: 0.0
			},
			value: 0.0,
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
			// console.log('program key : ', key)
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
		updatedProgram = {
			...updatedProgram,
			limit: {
				value: 0,
				valid: false,
				touched: false
			},
			layers: []
		}
		return updatedProgram
	}

	/**
	 * Program structure description
	 */
	const [program, setProgram] = useState(initProgramStructure())

	/**
	 * Program limit
	 */
	const [limit, setLimit] = useState(0)

	/**
	 * TODO : Rewrite insurer selection from redux
	 */
	// const insurer = useSelector((state) => state.entities.user)
	const insurer = 'test'

	useEffect(() => {
		setLimit(parseInt(program.limit.value))
	}, [program.limit.value])

	/**
	 * Update layer list
	 * @param layerListData
	 */
	const layerFromListHandler = (layerListData) => {
		setProgram((prevState) => ({
			...prevState,
			layers: layerListData
		}))
	}

	/**
	 * Create new program
	 * Using API Post program
	 * @param newProgram program create
	 */
	const createNewProgramHandler = (newProgram) => {
		createProgram(newProgram)
			.then((value) => value.json())
			.then((programDTO) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(programDTO)
				showToast(
					TOAST.PROGRAM_CREATE_SUCCESS.message,
					TOAST.PROGRAM_CREATE_SUCCESS.state
				)
				setTimeout(() => {
					history.push(LIST_LINK.ADD_DOCUMENT + '/' + programDTO._id)
				}, 3000)
			})
			.catch((reason) => {
				showToast(
					TOAST.PROGRAM_CREATE_ERROR.message,
					TOAST.PROGRAM_CREATE_ERROR.state
				)
			})
	}

	/**
	 * Show toast for any information of CRUD or error
	 * @param message message view in toast
	 * @param status toast status
	 */
	const showToast = (message = '', status = 'success') => {
		console.log('enter to toast')
		updateToast(message, status)
	}

	/**
	 * change data value for form for all st ate field change
	 * @param inputIdentifier id of target field
	 * @param inputValue
	 */
	const programFieldChangedHandler = (inputIdentifier, inputValue) => {
		const updatedProgramForm = {
			...program
		}

		const updatedProgramField = {
			...updatedProgramForm[inputIdentifier]
		}

		updatedProgramField.value = inputValue
		updatedProgramField.valid = true
		updatedProgramField.touched = true
		updatedProgramForm[inputIdentifier] = updatedProgramField

		setProgram(updatedProgramForm)
		console.log('program : ', program)
	}

	/**
	 * Create program with all verification before
	 */
	const programCreateHandler = () => {
		let saveProgram = {}
		const { layers, ...programInfo } = program

		for (const programInfoKey in programInfo) {
			if (programInfo[programInfoKey].valid) {
				saveProgram = {
					...saveProgram,
					[programInfoKey]: programInfo[programInfoKey].value
				}
			}
		}
		saveProgram = {
			...saveProgram,
			layers
		}
		const keysInit = Object.keys(program)
		const keysSave = Object.keys(saveProgram)
		const programIsValid = keysInit.every((v, i) => v === keysSave[i])

		const programDTO = {
			...saveProgram,
			insurer: insurer._id
		}
		// programIsValid ? createProgram(programDTO) : saveDataHandler()
		programIsValid
			? createNewProgramHandler(programDTO)
			: showToast('All data must be set for the program', 'warning')
		// saveDataHandler()

		console.log('programIsValid : ', programIsValid)
	}

	/**
	 * save data in file for feature for @Tristan
	 */
	// const saveDataHandler = () => {
	// 	programSave(program)
	// 		.then((res) => res.json())
	// 		.then((value) => {
	// 			console.log('return  : ', value)
	// 		})
	// 		.catch((reason) => {
	// 			console.log('error  : ', reason)
	// 		})
	// }

	/**
	 * Set content bloc for home program
	 */
	return (
		<section className='add-placement-content'>
			<section className='placement-info'>
				<div className='info-card'>
					<AddProgramInfo
						programInfoStructureData={formElementsArray}
						programFieldChangedHandler={programFieldChangedHandler}
					/>
					<AddLayerList limit={limit} setData={layerFromListHandler} />

					<div className='program-save-button'>
						<button className='action-button' onClick={programCreateHandler}>
							<img
								src={add}
								alt='Supporting documents'
								className='action-img'
							/>
							Create Program
						</button>
						{/* <button className='action-button' onClick={showToast}>
							<img
								src={add}
								alt='Supporting documents'
								className='action-img'
							/>
							showToast
						</button> */}
					</div>
				</div>
			</section>

			{/*  showToast() */}
			<ToastComponent />
		</section>
	)
}

export default AddProgramHome
