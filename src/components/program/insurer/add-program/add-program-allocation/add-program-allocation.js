import './add-program-allocation.scss'
import AllocationSettings from './allocation-settings/allocation-settings'
import add from '../../../../../assets/icon/add-icon.png'
import { useEffect, useState } from 'react'
import Select from '../../../../form-component/Select/Select'
import { useParams } from 'react-router'
import {
	createConstraintProgram,
	getAllProgramConstraintListFill,
	getProgramQuoterListFillById
} from '../../../../../api/program.service'
import AddGroupModal from './add-group-modal/add-group-modal'
import { requestInterceptor } from '../../../../../sessionStorage/sessionStorage'
import useToast from '../../../../../containers/Toast/useToast/useToast'
import { TOAST } from '../../../../../constants'

/**
 * Allocation Component for program alloc
 * @returns {JSX.Element}
 * @constructor
 */
const AddProgramAllocation = () => {
	/**
	 * Constraint allocation list
	 */
	const [constraintsAllocation, setConstraintsAllocation] = useState([])

	/**
	 * Targeted Program Id
	 */
	const { programId } = useParams()

	/**
	 * Form for group select
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
	 * list of group create
	 */
	const [listOffice, setListOffice] = useState([])
	/**
	 * list of group create
	 */
	const [listGroup, setListGroup] = useState([])
	/**
	 * new item for group list
	 */
	const [selectList, setSelectList] = useState([])
	/**
	 * refactor selected list pour select display
	 */
	const [selectedGroup, setSelectedGroup] = useState('')
	/**
	 * selected item in select list
	 */
	const [selectGroup, setSelectGroup] = useState(select)

	const [disableAddConstraint, setDisableAddConstraint] = useState(true)

	/**
	 * Toast component for notification
	 */
	const { updateToast, ToastComponent } = useToast('', 'success')

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
	 * Get all office list
	 * @returns {Promise<T | void>}
	 */
	const getOfficeList = () => {
		return getProgramQuoterListFillById(programId)
			.then((res) => res.json())
			.then((allOffice) => {
				setListOffice([
					...allOffice.quoterList.follower,
					...allOffice.quoterList.quoter
				])

				console.log('allOffice : ', allOffice)
				return allOffice
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	useEffect(() => {
		getAllProgramConstraintListFill(programId)
			.then((value) => value.json())
			.then((response) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(response)
				console.log('constraintsAllocation init value  : ', response)
				// setConstraintsAllocation((prevState) => [...response.constraints])
				setConstraintsAllocation((prevState) => [
					...response.constraints.map((constraintItem, index) => {
						return {
							// type: 'interval',
							type: constraintItem.type,
							groupOffice: constraintItem.groupOffice,
							constraint: constraintItem.constraint
						}
					})
				])
				console.log('constraintsAllocation is set  : ', constraintsAllocation)

				const officeList = getOfficeList()
				console.log('test officeList : ', officeList)

				// console.log('item changed :', item, name)
				let groupList = []
				groupList = [
					...response.constraints.map((constraint, index) => {
						const { groupOffice } = constraint
						return {
							name: groupOffice.name,
							offices: [
								...groupOffice.offices.map((office, index) => {
									return { value: office, label: office }
								})
							]
						}
					})
				]
				setListGroup((prevState) => [...groupList])
			})
		return () => {
			setListGroup([])
			setConstraintsAllocation([])
		}
	}, [])

	useEffect(() => {
		selectedGroup === ''
			? setDisableAddConstraint(true)
			: setDisableAddConstraint(false)
	}, [selectedGroup])

	useEffect(() => {
		const test = listGroup.reduce(
			(previousValue, currentValue, currentIndex) => [
				...previousValue,
				{
					value: currentIndex,
					displayValue: currentValue.name
				}
			],
			[]
		)
		setSelectList(test)
	}, [listGroup])

	useEffect(() => {
		select.elementConfig.options = [
			{
				// label: '',
				value: '',
				displayValue: 'Select office group',
				disabled: true
			},
			...selectList
		]
		setSelectGroup(select)
	}, [selectList])

	const addConstraint = () => {
		console.log(
			'constraint listGroup[selectedGroup] : ',
			listGroup[selectedGroup]
		)
		if (!disableAddConstraint) {
			const newConstraint = {
				type: 'interval',
				groupOffice: {
					name: listGroup[selectedGroup].name,
					offices: [
						...listGroup[selectedGroup].offices.map((office) => {
							return office.value
						})
					]
				},
				constraint: {
					type: '',
					value: 0,
					target: '' // tableau de layer cible
				}
			}
			setConstraintsAllocation((prevState) => [...prevState, newConstraint])
		}
	}

	/**
	 * Submit constraint Value
	 */
	const submitConstraint = () => {
		console.log('selected : ', selectedGroup)
		const constraintData = {
			programId,
			constraintsAllocation
		}
		createConstraintProgram(constraintData)
			.then((val) => val.json())
			.then((response) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(response)

				showToast(
					TOAST.PROGRAM_CONSTRAINT_LIST_SUCCESS.message,
					TOAST.PROGRAM_CONSTRAINT_LIST_SUCCESS.state
				)
				console.log('response of return : ', response)
			})
			.catch((reason) => {
				console.log('response of reason : ', reason)
			})
	}

	/**
	 * Add group to list group after creation in modal
	 * @param addGroup
	 */
	const saveGroup = (addGroup) => {
		setListGroup((prevState) => [...prevState, addGroup])
	}

	/**
	 * Synchronize select group update
	 * @param id index group
	 * @param value value new group
	 */
	const onChangedGroup = (id, value) => {
		setSelectedGroup(value)
	}

	/**
	 * Update constraint value after change in constraint field
	 * @param id constraint slot in table
	 * @param value for constraint update
	 */
	const updateConstraint = (id, value) => {
		const updateConstraint = constraintsAllocation
		updateConstraint[id].constraint = value
		setConstraintsAllocation((prevState) => [...updateConstraint])
	}

	/**
	 * remove constraint from list constraint value after change in constraint field
	 * @param idConstraint index constraint to remove
	 */
	const removeConstraint = (idConstraint) => {
		const updateConstraintList = [
			...constraintsAllocation.filter((layer, index) => index !== idConstraint)
		]
		setConstraintsAllocation([...updateConstraintList])
	}

	/**
	 * Set content bloc for Program alloc
	 */
	return (
		<>
			<section className='allocation-content'>
				{/* <h1 className='allocation-title'>Allocation constraints</h1> */}

				<section className='allocation-insurer-selection'>
					<AddGroupModal listOffice={listOffice} saveGroup={saveGroup} />

					{
						<span className={'group-select'}>
							<Select
								id={selectGroup.name}
								name={selectGroup.name}
								label={selectGroup.label}
								elementConfig={selectGroup.elementConfig}
								changed={onChangedGroup}
							/>
						</span>
					}

					<button
						disabled={disableAddConstraint}
						className='add-constraint'
						onClick={addConstraint}
					>
						<img src={add} alt='Add new constraint' className='action-img' />
						New constraint
					</button>
				</section>
				{/* header of placement box */}
				<AllocationSettings
					listConstraint={constraintsAllocation}
					changed={updateConstraint}
					removed={removeConstraint}
				/>

				<section className='allocation-submit-constraint'>
					<button
						// disabled={disableAddConstraint}
						className='add-constraint'
						onClick={submitConstraint}
					>
						<img src={add} alt='Add new constraint' className='action-img' />
						Submit constraint
					</button>
				</section>
				{/* content footer of placement body */}

				{/* <ChooseGroup selectList={selectList} /> */}
				{/* test */}

				{/* <span className={'group-select'}>
						<DropdownMultiple
							name='locations'
							searchable={['Search for location', 'No matching location']}
							titleSingular='Insurer group'
							title='Select insurers group'
							// list={listGroup}
							list={selectList}
							onChange={onChange}
						/>
					</span> */}

				{/* <Dropdown
						title='Select your skills:'
						value={selectedLanguages}
						onChange={(v) => setSelectedLanguages(v)}
						options={languages}
					/> */}

				{/* <MultiSelect /> */}
				{/* test */}

				{/*  showToast() */}
				<ToastComponent />
			</section>
		</>
	)
}

export default AddProgramAllocation
