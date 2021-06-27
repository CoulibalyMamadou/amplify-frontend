import './add-program-target-price.scss'
import { useEffect, useState } from 'react'
import TargetPriceList from './target-price-list/target-price-list'
import {
	getProgramLayersByIdFill,
	saveProgramLayersUpdate
} from '../../../../../api/program.service'
import { useParams } from 'react-router'
import { HiSaveAs } from 'react-icons/all'
import { requestInterceptor } from '../../../../../sessionStorage/sessionStorage'

/**
 * Target price edit component
 * @returns {JSX.Element}
 * @constructor
 */
const AddProgramTargetPrice = () => {
	/**
	 * Targeted Program Id
	 */
	const { programId } = useParams()

	const [status, setStatus] = useState('')

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
				setProgram(result)
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
	 * Update target value
	 * @param layersUpdate
	 */
	const updateLayerTargetPrice = (layersUpdate) => {
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
				setStatus('Target prices saved')
				// setStatus(value.status)
			})
	}

	/**
	 * Set content bloc for target price
	 */
	return (
		<section className='target-content'>
			{/* header of placement box */}
			<section className='target-info'>
				<div className='target-info-card'>
					<form className='info-form'>
						{layers ? (
							<TargetPriceList
								layers={layers}
								setData={updateLayerTargetPrice}
							/>
						) : (
							'Loading ...'
						)}
					</form>
					<section className='share-button-action'>
						<button className='action-button' onClick={saveLayerHandler}>
							<HiSaveAs size='2em' className='action-img' />
							Save target price
						</button>
					</section>
					<p className='share-status'> {status} </p>
				</div>
			</section>

			{/* body of placement body */}
			<section className='placement-display'> </section>

			{/* content footer of placement body */}
		</section>
	)
}

export default AddProgramTargetPrice
