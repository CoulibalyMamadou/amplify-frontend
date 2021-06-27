import './target-price-list.scss'
import { useEffect, useState } from 'react'
import TargetPriceItem from './target-price-item/target-price-item'
import * as PropTypes from 'prop-types'

const TargetPriceList = ({ setData, layers }) => {
	const [layerList, setLayerList] = useState([...layers])

	useEffect(() => {
		setData(layerList)
	}, [layerList])

	useEffect(() => {
		setLayerList(layers)
	}, [])

	const updateLayerHandler = (index, targetPrice) => {
		const updateLayer = layerList
		updateLayer[index] = {
			...updateLayer[index],
			targetPrice
		}
		setLayerList([...updateLayer])
	}

	return (
		<>
			{layerList.map((layer, index) => {
				return (
					<TargetPriceItem
						key={index}
						index={index}
						defaultValue={layer.targetPrice}
						changed={updateLayerHandler}
					/>
				)
			})}
		</>
	)
}

TargetPriceList.propTypes = {
	limit: PropTypes.number,
	setData: PropTypes.func,
	layers: PropTypes.array
}

export default TargetPriceList
