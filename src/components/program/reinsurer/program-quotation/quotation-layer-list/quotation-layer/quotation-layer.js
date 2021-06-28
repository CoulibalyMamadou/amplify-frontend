import './quotation-layer.scss'
import { useEffect, useState } from 'react'
import QuotationLayerItem from './quotation-layer-item/quotation-layer-item'
import { FaPlusCircle } from 'react-icons/fa'
import * as PropTypes from 'prop-types'

const QuotationLayer = ({
	index,
	changed = null,
	limit,
	quotation = [
		{
			price: 0,
			// lowerQuantity: 0,
			quantity: 0
		}
	],
	limitMin
}) => {
	const [layer, setLayer] = useState([...quotation])
	const [orderList, setOrderList] = useState([...quotation])

	useEffect(() => {
		changed(index, layer)
	}, [layer])

	/**
	 * Update layer value from layer item
	 * @param inputIdentifier id of layer in table
	 * @param inputValue update value coming
	 */
	const updateHandler = (inputIdentifier, inputValue) => {
		const newValue = layer
		newValue[inputIdentifier] = inputValue
		setLayer(() => newValue)
		// console.log('quotation Layer :  update: ', inputIdentifier)
	}

	/**
	 * remove order value in list
	 * @param orderNumber id of order in table
	 */
	const removeOrderInListHandler = (orderNumber) => {
		setOrderList((prevState) => [
			...prevState.filter((value, index) => index !== orderNumber)
		])
	}

	/**
	 * Add order value in list§è
	 */
	const addOrderInListHandler = () => {
		const orderVal = {
			price: 0,
			// lowerQuantity: 0,
			quantity: 100
		}

		setOrderList((prevState) => [...prevState, { ...orderVal }])
	}

	const viewDisplay = (
		<>
			{orderList.map((value, index) => {
				if (!index)
					return (
						<QuotationLayerItem
							key={index}
							index={index}
							max={limit}
							min={limitMin}
							quotation={value}
							changed={updateHandler}
							deleted={() => removeOrderInListHandler(index)}
						/>
					)

				return (
					<QuotationLayerItem
						key={index}
						index={index}
						max={limit}
						quotation={value}
						min={orderList[index - 1].quantity || 0}
						changed={updateHandler}
						deleted={() => removeOrderInListHandler(index)}
					/>
				)
			})}
		</>
	)
	return (
		<section className='quotation-layer-display'>
			{/* header of placement box */}
			<section className='quotation-info'>
				<p className='quotation-title'>Layer {index + 1} </p>
				<div className='quotation-block'>
					<span className='layer-quotation-list'>{viewDisplay}</span>
					<span className='quotation-add-row'>
						<button className='action-button' onClick={addOrderInListHandler}>
							<FaPlusCircle className='icon-plus' />
							add order
						</button>
					</span>
				</div>
			</section>

			{/* body of placement body */}
			<section className='quotation-display'>
				<div>GRAPH HERE</div>
			</section>
			{/* content footer of placement body */}
		</section>
	)
}

QuotationLayer.propTypes = {
	index: PropTypes.number,
	changed: PropTypes.func,
	limit: PropTypes.number,
	quotation: PropTypes.array,
	limitMin: PropTypes.number
}

export default QuotationLayer
