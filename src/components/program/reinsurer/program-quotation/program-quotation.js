import './program-quotation.scss'
import img1 from '../../../../../src/assets/img/tooltip1.PNG'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import QuotationLayerList from './quotation-layer-list/quotation-layer-list'
import {
	createProgramQuotation,
	getAllProgramQuotationListFill,
	getProgramLayersByIdFill,
	getProgramByIdFill
} from '../../../../api/program.service'
import { FaInfo } from 'react-icons/fa'
import useToast from '../../../../containers/Toast/useToast/useToast'
import { TOAST } from '../../../../constants'
import { requestInterceptor } from '../../../../sessionStorage/sessionStorage'
import { getReinsurer } from '../../../../api/reinsurer.service'
import { IoSave } from 'react-icons/io5'
import TotalPrice from './quotation-layer-list/total-price/total-price'

const ProgramQuotation = () => {
	const { updateToast, ToastComponent } = useToast('', 'success')

	const { programId } = useParams()
	const [limit, setLimit] = useState(0)
	const [layerList, setLayerList] = useState([])
	const [quotation, setQuotation] = useState([])

	/**
	 * TODO: Rewrite insurerId selector
	 * @type {*}
	 */
	const [reinsurer, setReinsurer] = useState({})

	/**
	 * Program value
	 */
	const [program, setProgram] = useState({})

	/**
	 * GetLocation Without programId
	 * @returns {string}
	 */
	const getCurrentParamWithoutPath = () => {
		return location.pathname.slice(
			location.pathname.lastIndexOf('/') + 1,
			location.pathname.length
		)
	}
	/**
	 * Get all the info of a a program by id
	 * @returns
	 */
	const getProgramInfo = async () => {
		const id = getCurrentParamWithoutPath()
		return getProgramByIdFill(id)
			.then((res) => res.json())
			.then((result) => {
				setProgram(result)
				return result
			})
			.catch((reason) => {
				console.log('Program unknown : ', reason)
			})
	}

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
				console.log('reinsurer info  : ', reinsurer)
				return value
			})
			.catch((reason) => {
				console.log('Fatal Error : ', reason)
			})
	}

	/**
	 * Get all insurer list
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
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(allLayer)
				console.log('all layer come list -- : ', allLayer)
				setLayerList(allLayer.layers)
				return allLayer
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	/**
	 * Get all insurer list
	 * @returns {Promise<T | void>}
	 */
	const getQuotationList = () => {
		return getAllProgramQuotationListFill({
			programId
		})
			.then((res) => res.json())
			.then((allQuotation) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(allQuotation)
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(allQuotation)
				const { quotations } = allQuotation
				// const { quotations } = allQuotation.quotation[0].quotation
				console.log('allQuotation newly -- : ', allQuotation)
				console.log('allQuotation newly -- : ', allQuotation.quotations)
				setQuotation(() => quotations)
				return quotations
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	useEffect(() => {
		getQuotationList().then((response) => {
			getLayersList().then((value) => {
				console.log('allInsurer : ', value)
			})

			getReinsurerInfo().then((value) => {
				console.log('allInsurer : ', value)
			})

			setLimit(0)
		})

		return () => {
			setQuotation([])
			setLayerList([])
		}
	}, [])

	useEffect(() => {
		console.log('quotation EndValue : ', quotation)
	}, [quotation])

	/**
	 * Get quoter and follower list
	 * @returns
	 */

	useEffect(() => {
		getProgramInfo().then((result) => {
			console.log('program link Program : ', result)
			console.log('Program coming: ', result)
		})
	}, [])
	/**
	 * Update layer list
	 * @param quotationData
	 */
	const layerFromListHandler = (quotationData) => {
		setQuotation(() => quotationData)
	}

	const submitQuotation = () => {
		const programQuote = {
			program: programId,
			quotations: quotation
		}
		console.log('XXXXX', programQuote)

		createProgramQuotation({ programId, programQuote })
			.then((val) => val.json())
			.then((response) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(response)
				showToast(
					TOAST.QUOTATION_SET_SUCCESS.message,
					TOAST.QUOTATION_SET_SUCCESS.state
				)
				// setTimeout(() => {
				// 	history.push(LIST_LINK.ADD_DOCUMENT + '/' + programDTO._id)
				// }, 3000)
				console.log('response of return : ', response)
			})
			.catch((reason) => {
				showToast(
					TOAST.QUOTATION_SET_ERROR.message,
					TOAST.QUOTATION_SET_ERROR.state
				)
				console.log('response of reason : ', reason)
			})
	}
	/**
	 * save data in file for feature for @Tristan
	 */
	const showToast = (message = '', variant = 'success') => {
		console.log('enter to toast')
		updateToast(message, variant)
	}

	const tooltipReinsurer = useRef(null)
	const [isActive, setIsActive] = useState(false)
	const onClick = () => setIsActive(!isActive)
	useEffect(() => {
		const pageClickEvent = (e) => {
			// If the active element exists and is clicked outside of
			if (
				tooltipReinsurer.current !== null &&
				!tooltipReinsurer.current.contains(e.target)
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

	return (
		<>
			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between'
				}}
			>
				<section className='add-quotation-content'>
					<div className={'quotation-header-box'}>
						<TotalPrice program={program} quotation={quotation} />
						<button
							className='action-button'
							// style={{ marginLeft: '93%', marginTop: '5px' }}
							onClick={onClick}
						>
							<FaInfo />
						</button>
					</div>
					{/* header of placement box */}
					<QuotationLayerList
						limit={limit}
						layers={layerList}
						quotation={quotation}
						onChanged={layerFromListHandler}
					/>
				</section>

				<nav
					style={{
						top: '38%',
						height: 'auto',
						width: '55%',
						left: 'auto',
						right: '11%'
					}}
					id=' '
					ref={tooltipReinsurer}
					className={`menu ${isActive ? 'active' : 'inactive'}`}
				>
					<br />
					<p style={{ textAlign: 'left', margin: '0 10px' }}>
						<span>
							On this page, you can enter your quotation in the form of one
							supply curve per layer of the program. For each layer, quantities
							should go in ascending order. <br />
							<br />
							In the example below, the reinsurer indicated that they are ready
							to provide at most 1% of layer 2 for a premium rate between 0.415%
							and 0.555%. Additionally, for a premium rate between 0.555% and
							0.59%, they are ready to provide between 1% and 5% of the layer.
							Finally, for a premium rate above 0.59%, they are ready to provide
							up to 15% of the layer.
							<br />
							<br />
							<figure>
								<img src={img1} alt='test' style={{ width: '100%' }}></img>
							</figure>
							<br />
							The above example means that if the final market price is for
							example 0.56%, then the reinsurer won’t provide more than 5% of
							the layer. It also means that if the final share of the reinsurer
							for layer 2 is 12%, then the final premium rate cannot be below
							0.59%.
							<br /> <br /> Once your quotation is saved, the total price of
							your quotation is computed and you can compare it with the budget
							of the cedent for the program.
							<br />
						</span>
					</p>
					<br />
				</nav>
			</div>

			<section className='action-row'>
				<section className='save-action-content'>
					<button className='save-action-button' onClick={submitQuotation}>
						{/* <button className='action-button' onClick={submitQuotation}> */}
						<IoSave size='2em' className='icon-plus' />
						Save quotation
					</button>
				</section>
			</section>
			<ToastComponent />
		</>
	)
}

export default ProgramQuotation
