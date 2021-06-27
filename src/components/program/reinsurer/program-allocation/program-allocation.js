import './program-allocation.scss'
import AllocationSettings from './allocation-settings/allocation-settings'
import add from '../../../../assets/icon/add-icon.png'
import { useEffect, useState } from 'react'
import AllocationHeader from './allocation-header/allocation-header'
import {
	createProgramQuoteConstraint,
	getAllProgramConstraintListFill,
	getProgramLayersByIdFill,
	getProgramQuoteConstraintListFill
} from '../../../../api/program.service'
import { useParams } from 'react-router'
import { IoSave } from 'react-icons/all'
import { requestInterceptor } from '../../../../sessionStorage/sessionStorage'
import { getReinsurer } from '../../../../api/reinsurer.service'
import { getOffice } from '../../../../api/office.service'

const ProgramAllocation = () => {
	const { programId } = useParams()
	const [programConstraint, setProgramConstraint] = useState([])
	const [constraintAllocation, setConstraintAllocation] = useState([])
	const [loadingAllocation, setLoadingAllocation] = useState(false)
	const [layerList, setLayerList] = useState([])

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
				const { constraints } =
					allQuoteConstraints.quoteConstraint[0].quoteConstraint
				setConstraintAllocation(() => [...constraints])
				return constraints
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
	 * Update constraint value after change in constraint field
	 * @param id constraint slot in table
	 * @param value update value
	 */
	const updateConstraint = (id, value) => {
		const updateConstraint = constraintAllocation
		updateConstraint[id] = value
		setConstraintAllocation((prevState) => [...updateConstraint])
	}

	const submitConstraint = () => {
		const programQuote = {
			office: reinsurer.office,
			program: programId,
			constraints: [...constraintAllocation]
		}
		createProgramQuoteConstraint({ programId, programQuote })
			.then((val) => val.json())
			.then((response) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(response)
				console.log('response of return : ', response)
			})
			.catch((reason) => {
				console.log('response of reason : ', reason)
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
		setConstraintAllocation([...updateConstraintList])
	}

	const addConstraint = () => {
		const newConstraint = {
			type: '',
			value: 0,
			target: {} // tableau de layer cible
		}
		setConstraintAllocation((prevState) => [...prevState, newConstraint])
	}

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
					<button className='add-constraint' onClick={addConstraint}>
						<img src={add} alt='Add new constraint' className='action-img' />
						New constraint
					</button>
					<button className='action-button-save' onClick={submitConstraint}>
						<IoSave size='2em' />
						Save constraint
					</button>
				</section>
				{/* header of placement box */}

				{loadingAllocation ? (
					<AllocationSettings
						listConstraint={constraintAllocation}
						layers={layerList}
						changed={updateConstraint}
						removed={removeConstraint}
						reinsurer={reinsurer}
					/>
				) : (
					<h3>Loading previous allocation</h3>
				)}
				{/* content footer of placement body */}
			</section>
		</>
	)
}

export default ProgramAllocation
