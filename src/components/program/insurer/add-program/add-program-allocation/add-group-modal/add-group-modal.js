import * as PropTypes from 'prop-types'
import add from '../../../../../../assets/icon/add-icon.png'
import Modal from '../../../../../../containers/Modal/modal'
import Input from '../../../../../form-component/Input/Input'
import DropdownMultiple from '../../../../../form-component/DropdownMultiple/DropdownMultiple'
import useModal from '../../../../../../containers/Modal/useModal'
import { useEffect, useState } from 'react'

/**
 * Modal group edit component
 * @param saveGroup function update group
 * @param listInsurer list office for group
 * @returns {JSX.Element}
 * @constructor
 */
const AddGroupModal = ({ saveGroup, listOffice }) => {
	/**
	 * group name form
	 * @type {{valid: boolean, touched: boolean, elementConfig: {placeholder: string, type: string}, name: string, elementType: string, value: string}}
	 */
	const input = {
		name: 'groupName',
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Group name'
		},
		value: '',
		// validation: {
		//     required: true
		// },
		valid: false,
		touched: false
	}

	/**
	 * Structure of group object
	 * @type {{offices: [], name: string}}
	 */
	const groupStructure = {
		name: '',
		offices: []
	}

	const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal()

	/**
	 * List of group item of group
	 */
	const [groupSelectList, setGroupSelectList] = useState([])
	/**
	 * new item for group list
	 */
	const [newGroup, setNewGroup] = useState(groupStructure)

	useEffect(() => {
		listOffice.map((office, index) => {
			return setGroupSelectList((prevState) => [
				...prevState,
				{
					// value: index,
					value: office._id,
					label: office.name
				}
			])
		})
	}, [listOffice])

	/**
	 * Change selected list
	 * @param item group selected list
	 * @param name group name
	 */
	const onChange = (item, name) => {
		console.log('item changed :', item, name)
		const val = {
			name: newGroup.name,
			offices: item
		}
		setNewGroup(val)
	}

	/**
	 * Save group
	 */
	const addGroup = () => {
		saveGroup(newGroup)
		toggleLoginForm()
	}

	/**
	 * Change group name
	 * @param id
	 * @param value new group name
	 */
	const onChanged = (id, value) => {
		const val = {
			name: value,
			offices: newGroup.offices
		}
		setNewGroup(val)
	}

	/**
	 * Set content bloc for modal group
	 */
	return (
		<>
			<button className='add-constraint' onClick={toggleLoginForm}>
				<img src={add} alt='Add new constraint' className='action-img' />
				Create group
			</button>

			<Modal
				isShowing={isLoginFormShowed}
				hide={toggleLoginForm}
				title='Create group'
			>
				<div className='group-box'>
					<span className={'item-box input'}>
						<Input
							id={input.name}
							name={input.name}
							label={input.label}
							subLabel={input.subLabel}
							value={input.value}
							elementConfig={input.elementConfig}
							changed={onChanged}
						/>
					</span>
					<span className={'item-box'}>
						<DropdownMultiple
							name='locations'
							searchable={['Search for location', 'No matching location']}
							titleSingular='Insurer group'
							title='Select offices group'
							list={groupSelectList}
							onChange={onChange}
						/>
					</span>
				</div>
				<div className='modal-action'>
					<button className={'modal-action-button'} onClick={addGroup}>
						create group
					</button>
				</div>
			</Modal>
		</>
	)
}

/**
 * Group modal parameter type
 * @type {{listInsurer: Requireable<any[]>, saveGroup: Requireable<(...args: any[]) => any>, changed: Requireable<(...args: any[]) => any>}}
 */
AddGroupModal.propTypes = {
	changed: PropTypes.func,
	saveGroup: PropTypes.func,
	listOffice: PropTypes.array
}

export default AddGroupModal
