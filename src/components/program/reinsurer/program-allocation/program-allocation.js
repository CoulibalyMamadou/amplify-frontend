import './program-allocation.scss'
import AllocationSettings from './allocation-settings/allocation-settings'
import { FaPlusCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import AllocationHeader from './allocation-header/allocation-header'
import {
	createProgramQuoteConstraint,
	getAllConstraintListFill,
	getProgramLayersByIdFill,
	getProgramQuoteConstraintListFill
} from '../../../../api/program.service'
import { useParams } from 'react-router'
import { IoSave } from 'react-icons/all'
import { requestInterceptor } from '../../../../sessionStorage/sessionStorage'
import { getReinsurer } from '../../../../api/reinsurer.service'
import { getOffice } from '../../../../api/office.service'
import { TOAST } from '../../../../constants'
import useToast from '../../../../containers/Toast/useToast/useToast'

const ProgramAllocation = () => {
	const { programId } = useParams()
	const { updateToast, ToastComponent } = useToast('', 'success')
	const [programConstraint, setProgramConstraint] = useState([])
	const [constraintAllocation, setConstraintAllocation] = useState([])
	const [loadingAllocation, setLoadingAllocation] = useState(false)
	const [layerList, setLayerList] = useState([])
	const [equalShare, setEqualShare] = useState(false)

	/**
	 * TODO: Rewrite insurerId selector
	 * @type {*}
	 */
	const [reinsurer, setReinsurer] = useState({})

	/**
	 * TODO: Rewrite insurerId selector
	 * @type {*}
	 */
	const [office, setOffice] = useState({})

	/**
	 * get all program list to populate dashboard
	 */
	const getReinsurerInfo = async () => {
		return getReinsurer()
			.then((value) => value.json())
			.then((value) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(value)
				setReinsurer(value)
				console.log('reinsurer info  : ', value)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	}

	/**
	 * get all program list to populate dashboard
	 */
	const getOfficeInfo = async () => {
		return getOffice()
			.then((value) => value.json())
			.then((value) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(value)
				setOffice(value)
				console.log('office info  : ', value)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	}

	/**
	 * Get all reinsurer list
	 * @returns {Promise<T | void>}
	 */
	const getLayersList = () => {
		return getProgramLayersByIdFill(programId)
			.then((res) => res.json())
			.then((allLayer) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(allLayer)
				setLayerList(allLayer.layers)
				console.log('allLayer : ', allLayer)
				return allLayer
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	/**
	 * Get all reinsurer list
	 * @returns {Promise<T | void>}
	 */
	const getQuoteConstraintList = () => {
		return getProgramQuoteConstraintListFill({
			programId
		})
			.then((res) => res.json())
			.then((allQuoteConstraints) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(allQuoteConstraints)
				allQuoteConstraints.equalShare &&
					setEqualShare(() => allQuoteConstraints.equalShare)
				console.log('all quote constraint come : ', allQuoteConstraints)
				const { constraints } = allQuoteConstraints
				// allQuoteConstraints.quoteConstraint[0].quoteConstraint
				setConstraintAllocation(() => [...constraints])
				return constraints
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	useEffect(() => {
		getAllConstraintListFill(programId)
			.then((value) => value.json())
			.then((response) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(response)
				response.constraints &&
					setProgramConstraint(() => [...response.constraints])
			})
			.then(() => {
				getLayersList().then((value) => {
					console.log('allInsurer : ', value)
				})

				getReinsurerInfo().then((value) => {
					console.log('allInsurer : ', value)
				})

				getOfficeInfo().then((value) => {
					console.log('allOffice : ', value)
				})

				getQuoteConstraintList().then((quoteConstraint) => {
					console.log('coming quoteConstraint TAL : ', quoteConstraint)
					// setConstraintAllocation(() => [...quoteConstraint])
					quoteConstraint
						? setConstraintAllocation(() => quoteConstraint)
						: setConstraintAllocation(() => [])
					setLoadingAllocation(true)
				})
			})

		return () => {
			setProgramConstraint([])
			setConstraintAllocation([])
			setLayerList([])
		}
	}, [])

	/**
	 * Update equalShare field
	 * @param equalShareValue
	 */
	const updateEqualShare = (equalShareValue) => {
		setEqualShare((prevState) => equalShareValue)
	}

	/**
	 * Update constraint value after change in constraint field
	 * @param id constraint slot in table
	 * @param value update value
	 */
	const updateConstraint = (id, value) => {
		const updateConstraint = constraintAllocation
		updateConstraint[id] = value
		setConstraintAllocation((prevState) => [...updateConstraint])
	}

	/**
	 * save data in file for feature for @Tristan
	 */
	const showToast = (message = '', variant = 'success') => {
		console.log('enter to toast')
		updateToast(message, variant)
	}

	const submitConstraint = () => {
		const programQuote = {
			office: reinsurer.office,
			program: programId,
			equalShare,
			constraints: [...constraintAllocation]
		}
		createProgramQuoteConstraint({ programId, programQuote })
			.then((val) => val.json())
			.then((response) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(response)
				showToast(
					TOAST.PROGRAM_ALLOCATION_LIST_SUCCESS.message,
					TOAST.PROGRAM_ALLOCATION_LIST_SUCCESS.state
				)
				console.log('response of return : ', response)
			})
			.catch((reason) => {
				console.log('response of reason : ', reason)
				showToast(
					TOAST.PROGRAM_ALLOCATION_SET_ERROR.message,
					TOAST.PROGRAM_ALLOCATION_SET_ERROR.state
				)
			})
	}

	/**
	 * remove constraint from list constraint value after change in constraint field
	 * @param idConstraint
	 */
	const removeConstraint = (idConstraint) => {
		const updateConstraintList = [
			...constraintAllocation.filter((layer, index) => index !== idConstraint)
		]
		setConstraintAllocation(() => [...updateConstraintList])
	}

	const addConstraint = () => {
		const newConstraint = {
			type: '',
			value: 0,
			target: {} // tableau de layer cible
		}
		setConstraintAllocation((prevState) => [...prevState, newConstraint])
	}
	console.log('XXXXX', reinsurer)

	return (
		<>
			<section className='allocation-content'>
				<AllocationHeader
					listConstraint={programConstraint}
					insurer={reinsurer}
					office={office}
					layers={layerList}
				/>

				<section className='allocation-reinsurer-selection'>
					<button className='action-button' onClick={addConstraint}>
						<FaPlusCircle className='icon-plus' />
						New constraint
					</button>
					<button className='action-button-save' onClick={submitConstraint}>
						<IoSave size='2em' className='icon-save' />
						Save constraints
					</button>
				</section>
				{/* header of placement box */}

				{loadingAllocation ? (
					<AllocationSettings
						listConstraint={constraintAllocation}
						layers={layerList}
						isEqualShare={equalShare}
						changed={updateConstraint}
						removed={removeConstraint}
						equalShared={updateEqualShare}
						reinsurer={office.name}
					/>
				) : (
					<h3>Loading previous allocation</h3>
				)}
				{/* content footer of placement body */}
			</section>
			<ToastComponent />
		</>
	)
}

export default ProgramAllocation
