import './add-program-quoter-list.scss'
import { IoIosArrowBack, IoIosArrowForward, IoSave } from 'react-icons/all'
import QuoterItem from './quoter-item/quoter-item'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
	getProgramQuoterListById,
	quoterListUpdate
} from '../../../../../api/program.service'
import { requestInterceptor } from '../../../../../sessionStorage/sessionStorage'
import { getAllOfficeQuoter } from '../../../../../api/office.service'
import useToast from '../../../../../containers/Toast/useToast/useToast'
import { TOAST } from '../../../../../constants'

/**
 * Quoter list edit component
 * @returns {JSX.Element}
 * @constructor
 */
const AddProgramQuoterList = () => {
	/**
	 * structure of list object
	 * @type {{follower: [], exclude: [], quoter: []}}
	 */
	const selectedStructure = {
		quoter: [],
		follower: [],
		exclude: []
	}
	/**
	 * 	param Id
	 */
	const { programId } = useParams()

	/**
	 * Toast component for notification
	 */
	const { updateToast, ToastComponent } = useToast('', 'success')

	/**
	 * list substitute to exclude list
	 */
	const [officeList, setOfficeList] = useState([])
	/**
	 * list substitute to quoter list
	 */
	const [quoteList, setQuoteList] = useState([])
	/**
	 * list substitute to follower list
	 */
	const [followerList, setFollowerList] = useState([])
	/**
	 * list substitute to selected insurer by list
	 */
	const [selectedList, setSelectedList] = useState(selectedStructure)

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
	 * init all list view
	 */
	useEffect(() => {
		initQuotationList()
	}, [])

	/**
	 * Toggle selection for group move
	 * @param index id in array of target
	 * @param target array field to update
	 * @param selected bool for checking status
	 */
	const toggleSelected = (index, target, selected) => {
		const updateList = selectedList
		switch (target) {
			case 'quoter':
				selected
					? updateList.quoter.push(quoteList[index])
					: (updateList.quoter = updateList.quoter.filter(
							(value, id) => value._id !== quoteList[index]._id
					  ))
				break
			case 'follower':
				selected
					? updateList.follower.push(followerList[index])
					: (updateList.follower = updateList.follower.filter(
							(value, id) => value._id !== followerList[index]._id
					  ))
				break
			case 'exclude':
				selected
					? updateList.exclude.push(officeList[index])
					: (updateList.exclude = updateList.exclude.filter(
							(value, id) => value._id !== officeList[index]._id
					  ))
				break
			default:
				break
		}
		setSelectedList(updateList)
		console.log('selected list ', selectedList)
	}

	/**
	 * update view for group move
	 * @param target array field to update
	 * @param fromExclude check if it coming from exclude list
	 */
	const updateSelectedList = (target, fromExclude) => {
		let toInit = ''
		switch (target) {
			case 'quoter':
				selectedList.follower.map((insurer) => {
					setQuoteList((prevState) => [...prevState, insurer])
					toInit = 'follower'
					return setFollowerList((prevState) => [
						...prevState.filter((item) => item._id !== insurer._id)
					])
				})
				break
			case 'follower':
				fromExclude
					? selectedList.exclude.map((insurer) => {
							setFollowerList((prevState) => [...prevState, insurer])
							toInit = 'exclude'
							return setOfficeList((prevState) => [
								...prevState.filter((item) => item._id !== insurer._id)
							])
					  })
					: selectedList.quoter.map((insurer) => {
							setFollowerList((prevState) => [...prevState, insurer])
							toInit = 'quoter'
							return setQuoteList((prevState) => [
								...prevState.filter((item) => item._id !== insurer._id)
							])
					  })
				break
			case 'exclude':
				selectedList.follower.map((insurer) => {
					setOfficeList((prevState) => [...prevState, insurer])
					toInit = 'follower'
					return setFollowerList((prevState) => [
						...prevState.filter((item) => item._id !== insurer._id)
					])
				})
				break
			default:
				break
		}

		if (toInit.length > 2)
			setSelectedList((prevState) => ({
				...prevState,
				[toInit]: []
			}))
		// setSelectedList((prevState) => prevState)
		// console.log('selected list ', selectedList)
	}

	/**
	 * update exclude list from all insurer
	 * @param quoter list of quoter
	 * @param follower list of follower
	 */
	const initExcludeList = (quoter = [], follower = []) => {
		setOfficeList((prevState) => [
			...prevState.filter(
				(item) =>
					!(
						quoter.map((quoter) => quoter._id).includes(item._id) ||
						follower.map((follower) => follower._id).includes(item._id)
					)
			)
		])
	}

	/**
	 * Get all Quoter list & manage the other list through
	 * @param allOffice all insurer list
	 * @returns {Promise<T | void>}
	 */
	const getQuoterList = (allOffice = []) => {
		return getProgramQuoterListById(programId)
			.then((res) => res.json())
			.then(({ quoterList: { quoter = [], follower = [] } }) => {
				console.log('quoter List --- oth: ', quoter)
				if (follower?.length > 0) {
					console.log('quoter List in entrance: ', follower)
					follower.map((follower) =>
						setFollowerList((prevState) => [
							...prevState,
							...allOffice.filter((item) => item._id === follower._id)
						])
					)
				}
				if (quoter?.length > 0) {
					console.log('quoter List in entrance: ', quoter)
					quoter.map((quoter) =>
						setQuoteList((prevState) => [
							...prevState,
							...allOffice.filter((item) => item._id === quoter._id)
						])
					)
					// console.log('quoterList.quoter : ', [...officeList.filter((item) => item._id === id)])
					console.log('quoterList.quoter : ', quoteList)
					console.log('quoterList.quoter officeList : ', officeList)
				}
				initExcludeList(quoter, follower)
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	/**
	 * Get all insurer list
	 * @returns {Promise<T | void>}
	 */
	const getOfficeList = () => {
		return getAllOfficeQuoter(programId)
			.then((res) => res.json())
			.then((allOffice) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(allOffice)

				setOfficeList(allOffice)
				// setFollowerList(allOffice)
				getQuoterList(allOffice).then((response) => {
					// initExcludeList(quoteList, followerList)
				})
				console.log('officeList : ', officeList)
				return allOffice
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	/**
	 * init quotation list
	 */
	const initQuotationList = () => {
		getOfficeList().then((value) => {
			// getQuoterList().then((response) => {
			// 	// initExcludeList()
			// })
		})
	}

	/**
	 * insurer from follower list to insurer
	 * @param insurerId
	 * @param fromTarget
	 * @constructor
	 */
	const AddToInsurerList = (insurerId, fromTarget) => {
		let insurer = []
		switch (fromTarget) {
			case 'quoter':
				insurer = quoteList[insurerId]
				setOfficeList((prevState) => [...prevState, insurer])
				removeFromList(insurerId, fromTarget)
				break
			case 'follower':
				insurer = followerList[insurerId]
				setOfficeList((prevState) => [...prevState, insurer])
				removeFromList(insurerId, fromTarget)
				break
			default:
				break
		}
	}

	/**
	 * insurer from follower list to insurer
	 * @param insurerId
	 * @param target
	 * @constructor
	 */
	const removeFromList = (insurerId, target) => {
		switch (target) {
			case 'quoter':
				setQuoteList((prevState) => [
					...prevState.filter((value, index) => index !== insurerId)
				])
				break
			case 'follower':
				setFollowerList((prevState) => [
					...prevState.filter((value, index) => index !== insurerId)
				])
				break
			default:
				break
		}
	}

	/**
	 * save modification on quoter/follower list
	 */
	const saveQuoterList = () => {
		const quoterList = {
			quoter: quoteList.map((quoter) => quoter._id),
			follower: followerList.map((follower) => follower._id)
		}
		const body = { programId, quoterList }
		quoterListUpdate(body)
			.then((res) => res.json())
			.then((response) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(response)
				showToast(
					TOAST.PROGRAM_QUOTATION_LIST_SUCCESS.message,
					TOAST.PROGRAM_QUOTATION_LIST_SUCCESS.state
				)
				console.log('save result : ', response)
			})
		console.log('Quoter list : ', quoterList)
		console.log('programId : ', programId)
	}

	/**
	 * Set content bloc for Quoter list
	 */
	return (
		<>
			<section className='quoter-list-content'>
				{/* header of placement box */}
				<section className='list-panel'>
					<h1 className='list-title'>Quoter</h1>
					<section className='list-box'>
						{quoteList.map((office, id) => {
							return (
								<QuoterItem
									key={id}
									index={id}
									toggleSelected={toggleSelected}
									target={'quoter'}
									selected={selectedList.quoter.includes(office._id)}
									unSelected={AddToInsurerList}
									quoter={office}
								/>
							)
						})}
					</section>
				</section>

				{/* body of placement body */}
				<section className='list-panel'>
					<h1 className='list-title'>Follower</h1>
					<section className='list-box'>
						{followerList.map((office, id) => {
							return (
								<QuoterItem
									key={id}
									index={id}
									toggleSelected={toggleSelected}
									target={'follower'}
									selected={selectedList.follower.includes(office._id)}
									unSelected={AddToInsurerList}
									quoter={office}
								/>
							)
						})}
					</section>
				</section>

				{/* body of placement body */}
				<section className='list-panel'>
					<h1 className='list-title'>Exclude</h1>
					<section className='list-box'>
						{officeList &&
							officeList.map((office, id) => {
								return (
									<QuoterItem
										key={id}
										index={id}
										target={'exclude'}
										toggleSelected={toggleSelected}
										selected={selectedList.exclude.includes(office._id)}
										resettable={false}
										quoter={office}
									/>
								)
							})}
					</section>
				</section>

				<section className='switch-action-content'>
					<button
						className='switch-action-button'
						onClick={() => updateSelectedList('quoter')}
					>
						<IoIosArrowBack size='2em' />
					</button>
					<button
						className='switch-action-button'
						onClick={() => updateSelectedList('follower')}
					>
						<IoIosArrowForward size='2em' />
					</button>
				</section>

				<section className='move-action-content'>
					<button
						className='switch-action-button'
						onClick={() => updateSelectedList('follower', true)}
					>
						<IoIosArrowBack size='2em' />
					</button>
					<button
						className='switch-action-button'
						onClick={() => updateSelectedList('exclude', false)}
					>
						<IoIosArrowForward size='2em' />
					</button>
				</section>

				{/*  showToast() */}
				<ToastComponent />
				{/* content footer of placement body */}
			</section>
			<section className='action-row'>
				<section className='save-action-content'>
					<button className='save-action-button' onClick={saveQuoterList}>
						<IoSave size='2em' /> Save List
					</button>
				</section>
			</section>
		</>
	)
}

export default AddProgramQuoterList
