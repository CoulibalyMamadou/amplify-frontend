import './share-list.scss'
import { useEffect, useState } from 'react'
import ShareItem from './share-item/share-item'
import * as PropTypes from 'prop-types'

/**
 * Share list edit component
 * @param setData update data
 * @param layers layers list
 * @returns {JSX.Element}
 * @constructor
 */
const ShareList = ({ setData, layers }) => {
	/**
	 * Layer list
	 */
	const [layerList, setLayerList] = useState([...layers])

	useEffect(() => {
		setData(layerList)
	}, [layerList])

	/**
	 * Update share value
	 * @param index index share
	 * @param share update value
	 */
	const updateLayerHandler = (index, share) => {
		const updateLayer = layerList
		updateLayer[index] = {
			...updateLayer[index],
			share
		}
		setLayerList([...updateLayer])
	}

	/**
	 * Set content bloc for share list
	 */
	return (
		<>
			{layerList
				? layerList.map((value, index) => {
						return (
							<ShareItem
								key={index}
								index={index}
								max={value.portion}
								defaultValue={value.share}
								changed={updateLayerHandler}
							/>
						)
				  })
				: 'Loading'}
		</>
	)
}

ShareList.propTypes = {
	setData: PropTypes.func,
	layers: PropTypes.array
}

export default ShareList
