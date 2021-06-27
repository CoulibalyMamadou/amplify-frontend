import './quotation-layer-list.scss'
import { useEffect, useState } from 'react'
import QuotationLayer from './quotation-layer/quotation-layer'
import * as PropTypes from 'prop-types'

const QuotationLayerList = ({ limit, layers, quotation, onChanged }) => {
	const [layersList, setLayersList] = useState([...layers])
	const [layerList, setLayerList] = useState([...quotation])

	useEffect(() => {
		setLayersList(layers)
	}, [layers])

	useEffect(() => {
		setLayerList(quotation)
	}, [quotation])

	const updateLayerHandler = (index, stateLayer) => {
		const newValue = layerList
		newValue[index] = {
			layer: layersList[index]._id,
			quote: stateLayer
		}
		onChanged(newValue)
	}

	return (
		<>
			{layersList.map((value, index, array) => {
				// console.log(
				// 	'layerList quotation: layerList[index].quote',
				// 	layerList[index].quote
				// )
				console.log('layerlist item : ', value)
				console.log('layerlist item : ', layerList)

				return (
					<QuotationLayer
						key={index}
						index={index}
						limit={value.portion}
						limitMin={0}
						// quotation={layerList[index].quote}
						quotation={
							layerList.find((layer) => layer.layer === value._id)?.quote || [
								{}
							]
						}
						changed={updateLayerHandler}
					/>
				)
			})}
		</>
	)
}

QuotationLayerList.propTypes = {
	limit: PropTypes.number,
	layers: PropTypes.array,
	quotation: PropTypes.array,
	onChanged: PropTypes.func
}

export default QuotationLayerList
