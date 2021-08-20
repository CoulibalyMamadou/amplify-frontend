import * as PropTypes from 'prop-types'
import { FaPlusCircle, FaInfo } from 'react-icons/fa'
import Modal from '../../../../../../containers/Modal/modal'
import Input from '../../../../../form-component/Input/Input'
import DropdownMultiple from '../../../../../form-component/DropdownMultiple/DropdownMultiple'
import useModal from '../../../../../../containers/Modal/useModal'
import { useEffect, useState, useRef } from 'react'
import useToast from '../../../../../../containers/Toast/useToast/useToast'
import { TOAST } from '../../../../../../constants'

/**
 * Modal group edit component
 * @param saveGroup function update group
 * @param listInsurer list office for group
 * @returns {JSX.Element}
 * @constructor
 */
const AddGroupModal = ({ saveGroup, listOffice }) => {
	/**
	 * Toast component for notification
	 */
	const { updateToast, ToastComponent } = useToast('', 'success')
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
	 * Show toast for any information of CRUD or error
	 * @param message message view in toast
	 * @param status toast status
	 */
	const showToast = (message = '', status = 'success') => {
		console.log('enter to toast')
		updateToast(message, status)
	}

	/**
	 * Save group
	 */
	const addGroup = () => {
		if (newGroup.name.length !== 0) {
			if (newGroup.offices.length !== 0) {
				saveGroup(newGroup)
				toggleLoginForm()
			} else {
				showToast(
					TOAST.PROGRAM_CONSTRAINT_CREATE_GROUP_SELECT_ERROR.message,
					TOAST.PROGRAM_CONSTRAINT_CREATE_GROUP_SELECT_ERROR.state
				)
			}
		} else {
			showToast(
				TOAST.PROGRAM_CONSTRAINT_CREATE_GROUP_INPUT_ERROR.message,
				TOAST.PROGRAM_CONSTRAINT_CREATE_GROUP_INPUT_ERROR.state
			)
		}
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
	const dropdownRef = useRef(null)
	const [isActive, setIsActive] = useState(false)
	const onClick = () => setIsActive(!isActive)
	useEffect(() => {
		const pageClickEvent = (e) => {
			// If the active element exists and is clicked outside of
			if (
				dropdownRef.current !== null &&
				!dropdownRef.current.contains(e.target)
			) {
				setIsActive(!isActive)
			}
		}
		// If the item is active (ie open) then listen for clicks
		if (isActive) {
			window.addEventListener('click', pageClickEvent)
		}
		return () => {
			window.removeEventListener('click', pageClickEvent)
		}
	}, [isActive])
	/**
	 * Set content bloc for modal group
	 */
	return (
		<>
			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between'
				}}
			>
				<button className='action-button' onClick={toggleLoginForm}>
					<FaPlusCircle className='icon-plus' />
					Create group
				</button>
				<button className='action-button' onClick={onClick}>
					<FaInfo />
				</button>
				<nav
					style={{
						top: '38%',
						height: 'auto',
						width: '55%',
						left: 'auto',
						right: '11%'
					}}
					id=' '
					ref={dropdownRef}
					className={`menu ${isActive ? 'active' : 'inactive'}`}
				>
					<br />
					<p style={{ textAlign: 'left', margin: '0 10px' }}>
						<span>
							On this page, you can finetune the final allocation and enforce
							your commercial relationship with reinsurers, as well as the
							predominance of certain reinsurers on a line of business. <br />
							<br />
							<strong>Create group</strong>
							<br />
							Start by creating a group of reinsurers and naming this group.
							Once a group is created you can apply a new constraint. Every
							constraint you will apply to a group will apply to each member of
							the group individually. <br />
							<br />
							<strong>Maximum share</strong>
							<br />
							The shares of reinsurers in the group will not exceed individually
							the percentage entered. This constraint can be applied globally to
							the whole program, or on different layers. <br />
							<br />
							<strong>Conditional minimum share</strong>
							<br />
							The shares of reinsurers in the group will exceed individually the
							percentage entered. This constraint can be applied globally to the
							whole program, or on different layers.
							<br /> It is conditional to each quotation being below final
							market price. If a reinsurer has a conditional minimum share but
							is above final market price, then an additional allocation
							scenario could be created with the reinsurer on the program but
							with a higher market price. You would then have the opportunity to
							select your preferred allocation scenario.
						</span>
					</p>
					<br />
				</nav>
			</div>
			<Modal
				isShowing={isLoginFormShowed}
				hide={toggleLoginForm}
				title='Create group'
			>
				<div className='group-box'>
					<span className={'item-box'}>
						<DropdownMultiple
							name='locations'
							searchable={['Search for location', 'No matching location']}
							titleSingular='reinsurer selected'
							title='Select group'
							list={groupSelectList}
							onChange={onChange}
						/>
					</span>
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
				</div>
				<div className='modal-action'>
					<button className='modal-action-button' onClick={addGroup}>
						Create group
					</button>
				</div>
				<ToastComponent />
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
