import './add-layer-list.scss'
import { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import AddLayer from './add-layer/add-layer'
import * as PropTypes from 'prop-types'
import { TiDeleteOutline } from 'react-icons/all'

/**
 * Create list layer
 * @param limit limit  for layer list
 * @param setData
 * @returns {JSX.Element}
 * @constructor
 */
const AddLayerList = ({ limit = 0, setData }) => {
	const addLayerValue = {
		layerLimit: 0.0,
		attachmentPoint: 0.0,
		portion: 0.0
	}
	const layerOptions = {
		max: 0.0,
		step: 0.1,
		min: 0.0,
		attachmentPoint: 0.0
	}

	/**
	 * layers list
	 */
	const [layerList, setLayerList] = useState([addLayerValue])

	/**
	 * count total left compared to limit
	 */
	const [countTotalAllocate, setCountTotalAllocate] = useState(0)

	useEffect(() => {
		setData(layerList)
	}, [layerList])

	useEffect(() => {
		setCountTotalAllocate(countTotalLayerAllocate())
	}, [limit, layerList])

	/**
	 * Add new layer to layer list
	 * @param e event
	 */
	const addLayerHandler = (e) => {
		e.preventDefault()
		console.log('XXXXX', layerList)
		let addList = []
		if (layerList.length > 0) {
			const lastLayer = layerList[layerList.length - 1]
			addList = [
				...layerList,
				{
					layerLimit: limit,
					attachmentPoint: lastLayer.layerLimit,
					portion: 0
				}
			]
		} else {
			addList = [
				{
					layerLimit: limit,
					attachmentPoint: 0,
					portion: 0
				}
			]
		}
		setLayerList(addList)
	}

	/**
	 *  Update Layer data by index
	 * @param index index layer in table
	 * @param stateLayer
	 */
	const updateLayerHandler = (index, stateLayer) => {
		const value = layerList
		value[index] = stateLayer

		setLayerList(value)
	}

	/**
	 * Remove layer by Id
	 * @param idLayer index layer in table
	 */
	const removeLayer = (idLayer) => {
		const updateLayerList = [
			...layerList.filter((layer, index) => index !== idLayer)
		]
		setLayerList([...updateLayerList])
	}

	/**
	 * Count total set compared to limit
	 * @returns {number} total layer
	 */
	const countTotalLayerAllocate = () => {
		return layerList.reduce((previousValue, currentValue) => {
			return previousValue + currentValue.layerLimit
		}, 0)
	}

	/**
	 * Data return layer configuration
	 */
	return (
		<>
			<div className='layer-list-view'>
				{layerList.map((value, index) => {
					if (!index)
						return (
							<section key={index}>
								<span className='delete-badge'>
									<TiDeleteOutline
										onClick={() => removeLayer(index)}
										size='1.4em'
										color='red'
									/>
								</span>
								<AddLayer
									limit={limit}
									limitMin={layerOptions.min}
									attachmentPoint={layerOptions.attachmentPoint}
									index={index}
									changed={updateLayerHandler}
								/>
							</section>
						)

					return (
						<section key={index}>
							<span className='delete-badge'>
								<TiDeleteOutline
									onClick={() => removeLayer(index)}
									size='1.4em'
									color='red'
								/>
							</span>
							<AddLayer
								limit={
									limit -
									(layerList[index - 1].layerLimit +
										layerList[index - 1].attachmentPoint)
								}
								limitMin={0.0}
								attachmentPoint={
									layerList[index - 1].layerLimit +
									layerList[index - 1].attachmentPoint
								}
								index={index}
								changed={updateLayerHandler}
							/>
						</section>
					)
				})}
			</div>
			{countTotalAllocate < limit ? (
				<div className='layer-add-button'>
					<button className='action-button' onClick={addLayerHandler}>
						<FaPlusCircle className='icon-plus' />
						New layer
					</button>
				</div>
			) : null}
		</>
	)
}

/**
 * Layer list parameter type
 * @type {{setData: Requireable<(...args: any[]) => any>, limit: Requireable<number>}}
 */
AddLayerList.propTypes = {
	setData: PropTypes.func,
	limit: PropTypes.number
}

export default AddLayerList
