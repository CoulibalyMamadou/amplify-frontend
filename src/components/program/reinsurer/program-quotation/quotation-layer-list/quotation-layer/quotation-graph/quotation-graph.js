import './quotation-graph.scss'
import * as PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

const QuotationGraph = ({
	quotation = [
		{
			price: 0,
			quantity: 0
		}
	]
}) => {
	const [layer, setLayer] = useState([])
	const [label, setLabel] = useState([0])
	const [data, setData] = useState([0])

	useEffect(() => {
		setLayer(quotation)
		console.log('quotation coming : ', quotation)
		// setLayer(() => [...quotation])
		// return () => {
		// 	setLayer([])
		// }
	}, [quotation])

	useEffect(() => {
		console.log('Layer coming : ', layer)
		updateGraphData()
	}, [layer])

	const updateGraphData = () => {
		setData(() => [layer[0]?.price || 0, ...layer.map((item) => item?.price)])
		setLabel(() => [0, ...layer.map((item) => item?.quantity)], 0)
	}

	const viewDisplay = (
		<>
			<Line
				data={{
					labels: [...label],
					datasets: [
						{
							label: 'Quantity',
							data: [...data],
							// data: [1, 8, 5, 6],
							backgroundColor: '#367BF5',
							// backgroundColor: '#7d49c6|#daa3ff',
							borderWidth: 1,
							borderColor: '#3333ff',
							fill: false,
							stepped: 'after'
							// borderWidth: 1,
						},
						{
							label: 'test',
							data: [17, 17, 17, 17, 17],
							// data: [1, 8, 5, 6],
							borderColor: '#fffff',
							fill: true,
							stepped: 'after',
							borderWidth: 1,
							backgroundColor: '#28cc9680'
						},
						{
							label: 'test1',
							data: [23, 23, 23, 23, 23],
							// data: [1, 8, 5, 6],
							borderColor: 'black',
							fill: true,
							stepped: 'after',
							borderWidth: 1,
							backgroundColor: '#f12b2c42'
						}
					]
				}}
				options={{
					scales: {
						yAxes: [
							{
								scaleLabel: {
									display: true,
									labelString: 'Y text'
								}
							}
						],
						xAxes: [
							{
								scaleLabel: {
									display: true,
									labelString: 'X text',
									autoSkip: true,
									maxTicksLimit: 4,
									fontSize: 12,
									fontFamily: 'Montserrat',
									fontColor: '#0f1222'
								}
							}
						]
					}
				}}
			/>
		</>
	)

	return (
		<>
			<span className='layer-quotation-row'>{viewDisplay}</span>
		</>
	)
}

QuotationGraph.propTypes = {
	quotation: PropTypes.array
}

export default QuotationGraph
