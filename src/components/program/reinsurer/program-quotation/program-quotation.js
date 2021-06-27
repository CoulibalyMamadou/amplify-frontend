import './program-quotation.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import QuotationLayerList from './quotation-layer-list/quotation-layer-list'
import {
	createProgramQuotation,
	getAllProgramQuotationListFill,
	getProgramLayersByIdFill
} from '../../../../api/program.service'
import add from '../../../../assets/icon/add-icon.png'
import useToast from '../../../../containers/Toast/useToast/useToast'
import { TOAST } from '../../../../constants'
import { requestInterceptor } from '../../../../sessionStorage/sessionStorage'
import { getReinsurer } from '../../../../api/reinsurer.service'

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
				const { quotations } = allQuotation.quotation[0].quotation
				console.log('allQuotation newly -- : ', allQuotation)
				console.log(
					'allQuotation newly -- : ',
					allQuotation.quotation[0].quotation
				)
				console.log(
					'allQuotation newly -- : ',
					allQuotation.quotation[0].quotation.quotations
				)
				// console.log('quotation newly -- : ', quotation)
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

	return (
		<>
			<section className='add-quotation-content'>
				{/* header of placement box */}
				<QuotationLayerList
					limit={limit}
					layers={layerList}
					quotation={quotation}
					onChanged={layerFromListHandler}
				/>
			</section>
			<button className='action-button' onClick={submitQuotation}>
				<img src={add} alt='Supporting documents' className='action-img' />
				Submit quotation
			</button>

			<ToastComponent />
		</>
	)
}

export default ProgramQuotation
