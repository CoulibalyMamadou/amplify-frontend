import './add-program-placed-share.scss'
import { useEffect, useState } from 'react'
import ShareList from './share-list/share-list'
import { useParams } from 'react-router'
import {
	getProgramLayersByIdFill,
	saveProgramLayersUpdate
} from '../../../../../api/program.service'
import { HiSaveAs } from 'react-icons/all'
import { requestInterceptor } from '../../../../../sessionStorage/sessionStorage'
import { TOAST } from '../../../../../constants'
import useToast from '../../../../../containers/Toast/useToast/useToast'

/**
 * Place share edit component
 * @returns {JSX.Element}
 * @constructor
 */
const AddProgramPlacedShare = () => {
	/**
	 * Targeted Program Id
	 */
	const { programId } = useParams()

	// const [status, setStatus] = useState('')

	/**
	 * Toast component for notification
	 */
	const { updateToast, ToastComponent } = useToast('', 'success')

	/**
	 * Layer list
	 */
	const [layers, setLayers] = useState([{}])

	/**
	 * Program value
	 */
	const [program, setProgram] = useState({})

	/**
	 * get program value by Id ( programId )
	 */
	const getProgramHandler = async () => {
		return getProgramLayersByIdFill(programId)
			.then((res) => res.json())
			.then((result) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(result)
				console.log('layer result : ', result)

				setProgram(result)
				setLayers(result.layers)
				return result
			})
			.catch((reason) => {
				console.log('Program unknown : ', reason)
			})
	}

	useEffect(() => {
		getProgramHandler().then((result) => {
			console.log('program link Program : ', result)
		})
	}, [])

	useEffect(() => {
		setLayers(program?.layers)

		return () => {
			setLayers([{}])
		}
	}, [program])

	/**
	 * Update share value
	 * @param layersUpdate
	 */
	const updateLayerShare = (layersUpdate) => {
		setLayers([...layersUpdate])
	}

	/**
	 * Save layer value
	 */
	const saveLayerHandler = () => {
		const updateLProgramLayer = {
			...program,
			layers
		}

		saveProgramLayersUpdate(updateLProgramLayer)
			.then((value) => value.json())
			.then((value) => {
				/**
				 * Intercept Error code from API request
				 */
				requestInterceptor(value)
				showToast(
					TOAST.PROGRAM_TARGET_PRICE_SUCCESS.message,
					TOAST.PROGRAM_TARGET_PRICE_SUCCESS.state
				)
				// setStatus(value.status)
			})
	}
	/**
	 * Show toast for any information of CRUD or error
	 * @param message message view in toast
	 * @param status toast status
	 */
	const showToast = (message = '', status = 'success') => {
		console.log('enter to toast')
		console.log('enter to toast', status)
		updateToast(message, status)
	}

	/**
	 * Set content bloc for Placed share
	 */
	return (
		<>
			<section className='share-content'>
				{/* header of placement box */}
				<section className='share-info'>
					<div className='info-card'>
						<form className='info-form'>
							{layers ? (
								<ShareList setData={updateLayerShare} layers={layers} />
							) : (
								'Loading ...'
							)}
						</form>
						<section className='share-button-action'>
							<button className='action-button' onClick={saveLayerHandler}>
								<HiSaveAs size='2em' className='action-img' />
								Save share
							</button>
						</section>
						{/* <p className='share-status'> {status} </p> */}
					</div>
				</section>

				{/* body of placement body */}
				<section className='placement-display'> </section>
				<ToastComponent />
				{/* content footer of placement body */}
			</section>
		</>
	)
}

export default AddProgramPlacedShare
