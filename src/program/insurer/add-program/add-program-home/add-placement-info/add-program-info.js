import './add-program-info.scss'
import Input from '../../../../../form-component/Input/Input'
import Select from '../../../../../form-component/Select/Select'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

/**
 * Information list for new program create
 * @param programInfoStructureData
 * @param programFieldChangedHandler
 * @returns {JSX.Element}
 * @constructor
 */
const AddProgramInfo = ({
	programInfoStructureData,
	programFieldChangedHandler
}) => {
	/**
	 * program structure describe for render
	 */
	const [programStructureData, setProgramStructureData] = useState(
		programInfoStructureData
	)

	useEffect(() => {
		setProgramStructureData(programInfoStructureData)
	}, [programStructureData])

	/**
	 * change data value for form for all st ate field change
	 * @param inputIdentifier id of target field
	 * @param inputValue
	 */
	const InfoFieldChangedHandler = (inputIdentifier, inputValue) => {
		programFieldChangedHandler(inputIdentifier, inputValue)
	}

	/**
	 * View of procedural generation of form
	 * @type {unknown[]}
	 */
	const displayView = programInfoStructureData.map((formElement) => {
		switch (formElement.config.elementType) {
			case 'input':
				return (
					<Input
						key={formElement.id}
						id={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						value={formElement.config.value}
						elementConfig={formElement.config.elementConfig}
						changed={InfoFieldChangedHandler}
					/>
				)
			case 'select':
				return (
					<Select
						key={formElement.id}
						id={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						elementConfig={formElement.config.elementConfig}
						changed={InfoFieldChangedHandler}
					/>
				)
			default:
				return (
					<Input
						key={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						elementConfig={formElement.config.elementConfig}
						changed={InfoFieldChangedHandler}
					/>
				)
		}
	})

	return <div className='program-info'>{displayView}</div>
}
/**
 * Program parameter type
 * @type {{programInfoStructureData: Requireable<any[]>, programFieldChangedHandler: Requireable<(...args: any[]) => any>}}
 */
AddProgramInfo.propTypes = {
	programInfoStructureData: PropTypes.array,
	programFieldChangedHandler: PropTypes.func
}

export default AddProgramInfo
