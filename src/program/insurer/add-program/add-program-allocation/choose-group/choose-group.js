import * as PropTypes from 'prop-types'
import Select from '../../../../../form-component/Select/Select'
import { useEffect, useState } from 'react'

/**
 * Choose group Edit component
 * @param selectList group selection list
 * @returns {JSX.Element}
 * @constructor
 */
const ChooseGroup = ({ selectList }) => {
	/**
	 * select group form structure
	 * @type {{valid: boolean, touched: boolean, elementConfig: {options: [{displayValue: string, value: string}]}, name: string, label: string, value: string}}
	 */
	const select = {
		name: 'group',
		label: 'Select group',
		elementConfig: {
			options: [
				{
					value: '',
					displayValue: 'No group create'
				}
			]
		},
		value: '',
		// validation: {
		//     required: true
		// },
		valid: false,
		touched: false
	}

	/**
	 * selected item in select list
	 */
	const [selectGroup, setSelectGroup] = useState(select)
	/**
	 * Group selected
	 */
	const [selectedGroup, setSelectedGroup] = useState('')

	useEffect(() => {
		select.elementConfig.options = [
			{
				// label: '',
				value: '',
				displayValue: 'Select insurer group',
				disabled: true
			},
			...selectList
		]
		setSelectGroup(select)
	}, [selectList])

	/**
	 * Group update
	 * @param id id group in list
	 * @param value new group
	 */
	const onChangedGroup = (id, value) => {
		console.log('selectedGroup : ', selectedGroup)
		setSelectedGroup(value)
	}

	/**
	 * Set content bloc for Choose group
	 */
	return (
		<>
			<span className={'group-select'}>
				<Select
					id={selectGroup.name}
					name={selectGroup.name}
					label={selectGroup.label}
					elementConfig={selectGroup.elementConfig}
					changed={onChangedGroup}
				/>
			</span>
		</>
	)
}

/**
 * Choose group parameter type
 * @type {{selectList: Requireable<any[]>, saveGroup: Requireable<(...args: any[]) => any>, listGroup: Requireable<any[]>, changed: Requireable<(...args: any[]) => any>}}
 */
ChooseGroup.propTypes = {
	changed: PropTypes.func,
	saveGroup: PropTypes.func,
	listGroup: PropTypes.array,
	selectList: PropTypes.array
}

export default ChooseGroup
