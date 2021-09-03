import './quotation-graph.scss'
import * as PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

const QuotationGraph = ({
	quotation = [
		{
			// price: 0,
			// quantity: 0
		}
	],
	layers,
	outcome = {
		share: 0,
		rate: 0
	}
}) => {
	const [layer, setLayer] = useState([])
	const [label, setLabel] = useState([0])
	const [data, setData] = useState([0])
	const [outcomeData, setOutcomeData] = useState(outcome)
	const [scenarioIndex, setScenarioIndex] = useState(-1)
	console.log('layers quotation : ', layers)
	console.log('outcome outcome : ', outcome)

	useEffect(() => {
		setLayer(quotation)
		setOutcomeData(outcome)
		console.log('quotation coming : ', quotation)
	}, [quotation, outcome])

	useEffect(() => {
		console.log('Layer coming : ', layer)
		updateGraphLabel()
	}, [layer])

	useEffect(() => {
		finalIndex()
		updateGraphData()
	}, [label])

	useEffect(() => {
		const testValaue = data.map((value, index) =>
			scenarioIndex === index ? [1.5, value] : [1.7, value]
		)
		console.log('testValue : ', testValaue)
	}, [scenarioIndex])

	const updateGraphData = () => {
		setData(() =>
			[
				layer[0]?.price * 0.2 || 0,
				...layer.map((item) => item?.price),
				outcomeData.rate
			]
				.map((value, index) =>
					scenarioIndex === index ? [value, value] : value
				)
				.flat()
		)
	}

	const updateGraphLabel = () => {
		setLabel(() => [
			...new Set(
				[0, ...layer.map((item) => item?.quantity), outcomeData.share].sort(
					(a, b) => a - b
				)
			)
		])
	}

	const finalIndex = () => {
		const index = label.indexOf(4.5)
		setScenarioIndex(index)
		console.log('label of graph : ', label)
		console.log('data of graph : ', data)
		console.log('value of index come in graph : ', index)
	}

	const outcomeDisplay = {
		label: 'Price & Obtained Share',
		data: [
			...data.map((value, index) =>
				label.indexOf(outcomeData.share) >= index ? outcomeData.rate : null
			)
		],
		fill: true,
		pointBackgroundColor: '#99f6d7',
		pointHoverBackgroundColor: '#99f6d7',
		pointBorderColor: '#99f6d7',
		pointHoverBorderColor: '#99f6d7',
		stepped: 'after',
		borderWidth: 1,
		backgroundColor: '#99f6d7',
		borderColor: '#13F1A9'
	}

	const layerDisplay =
		layers.length > 1
			? [
					{
						label: 'Below minimum price',
						data: [...data.map(() => layers.price?.min || 0)],
						// data: [1, 8, 5, 6],
						borderColor: '#a6e4d5',
						fill: true,
						pointBackgroundColor: '#ffffff00',
						pointHoverBackgroundColor: '#ffffff00',
						pointBorderColor: '#ffffff00',
						pointHoverBorderColor: '#ffffff00',
						stepped: 'after',
						borderWidth: 1,
						// backgroundColor: '#13F1A9'
						backgroundColor: '#04FAAA'
						// backgroundColor: '#78dbba'
					},
					{
						label: 'Below median price',
						data: [...data.map(() => layers.price?.median || 0)],
						// data: [1, 8, 5, 6],
						// borderColor: 'white',
						fill: true,
						stepped: 'after',
						borderWidth: 1,

						pointBackgroundColor: '#ffffff00',
						pointHoverBackgroundColor: '#ffffff00',
						borderColor: '#e9a9a9',
						pointBorderColor: '#ffffff00',
						pointHoverBorderColor: '#ffffff00',
						// backgroundColor: '#f92b3c12'
						backgroundColor: '#a6e4d5'
						// backgroundColor: '#04FAAA'
					},
					{
						label: 'Above median price',
						data: [...data.map(() => layers.price?.max || 0)],
						// data: [1, 8, 5, 6],
						borderColor: '#f30607',
						fill: true,
						stepped: 'after',
						pointBackgroundColor: '#ffffff00',
						pointHoverBackgroundColor: '#ffffff00',
						pointBorderColor: '#ffffff00',
						pointHoverBorderColor: '#ffffff00',
						borderWidth: 1,
						// backgroundColor: '#e27b7b'
						backgroundColor: '#e9a9a9'
					},
					{
						label: 'Above maximum price',
						data: [
							...data.map(
								() => layers.price?.max + layers.price?.min * 0.7 || 0
							)
						],
						// data: [1, 8, 5, 6],
						borderColor: 'white',
						fill: true,
						stepped: 'after',
						pointBackgroundColor: '#ffffff00',
						pointHoverBackgroundColor: '#ffffff00',
						pointBorderColor: '#ffffff00',
						pointHoverBorderColor: '#ffffff00',
						borderWidth: 1,
						fillOpacity: 0.3,
						backgroundColor: '#f30607'
						// backgroundColor: '#e27b7b'
					}
			  ]
			: []

	const viewDisplay = (
		<>
			<Line
				data={{
					labels: [...label],
					backgroundColor: '#f12b2c80',
					borderColor: '#f12b2c80',
					datasets: [
						{
							// label: 'Supply curve',
							label: 'Quotation second stage',
							// data: [...data],
							data: [
								...data.map((value, index) =>
									scenarioIndex === index ? [1.5, value] : [1.7, value]
								)
							],
							// data: [1, 8, 5, 6],
							backgroundColor: '#367BF5',
							// backgroundColor: '#7d49c6|#daa3ff',
							// pointBackgroundColor: '#ffffff00',
							pointHoverBackgroundColor: '#ffffff00',
							// pointBorderColor: '#ffffff00',
							pointHoverBorderColor: '#ffffff00',
							borderWidth: 1,
							borderColor: '#3333ff',
							fill: false,
							stepped: 'after'
							// borderWidth: 1,
						},
						...layerDisplay,
						outcomeDisplay
						// {
						// 	label: 'Below minimum price',
						// 	data: [...data.map(() => layers.price?.min || 0)],
						// 	// data: [1, 8, 5, 6],
						// 	borderColor: '#a6e4d5',
						// 	fill: true,
						// 	pointBackgroundColor: '#ffffff00',
						// 	pointHoverBackgroundColor: '#ffffff00',
						// 	pointBorderColor: '#ffffff00',
						// 	pointHoverBorderColor: '#ffffff00',
						// 	stepped: 'after',
						// 	borderWidth: 1,
						// 	// backgroundColor: '#13F1A9'
						// 	backgroundColor: '#04FAAA'
						// 	// backgroundColor: '#78dbba'
						// },
						// {
						// 	label: 'Below median price',
						// 	data: [...data.map(() => layers.price?.median || 0)],
						// 	// data: [1, 8, 5, 6],
						// 	// borderColor: 'white',
						// 	fill: true,
						// 	stepped: 'after',
						// 	borderWidth: 1,
						// 	pointBackgroundColor: '#ffffff00',
						// 	pointHoverBackgroundColor: '#ffffff00',
						// 	borderColor: '#e9a9a9',
						// 	pointBorderColor: '#ffffff00',
						// 	pointHoverBorderColor: '#ffffff00',
						// 	// backgroundColor: '#f92b3c12'
						// 	backgroundColor: '#a6e4d5'
						// 	// backgroundColor: '#04FAAA'
						// },
						// {
						// 	label: 'Above median price',
						// 	data: [...data.map(() => layers.price?.max || 0)],
						// 	// data: [1, 8, 5, 6],
						// 	borderColor: '#f30607',
						// 	fill: true,
						// 	stepped: 'after',
						// 	pointBackgroundColor: '#ffffff00',
						// 	pointHoverBackgroundColor: '#ffffff00',
						// 	pointBorderColor: '#ffffff00',
						// 	pointHoverBorderColor: '#ffffff00',
						// 	borderWidth: 1,
						// 	// backgroundColor: '#e27b7b'
						// 	backgroundColor: '#e9a9a9'
						// },
						// {
						// 	label: 'Above maximum price',
						// 	data: [
						// 		...data.map(
						// 			() => layers.price?.max + layers.price?.min * 0.7 || 0
						// 		)
						// 	],
						// 	// data: [1, 8, 5, 6],
						// 	borderColor: 'white',
						// 	fill: true,
						// 	stepped: 'after',
						// 	pointBackgroundColor: '#ffffff00',
						// 	pointHoverBackgroundColor: '#ffffff00',
						// 	pointBorderColor: '#ffffff00',
						// 	pointHoverBorderColor: '#ffffff00',
						// 	borderWidth: 1,
						// 	fillOpacity: 0.3,
						// 	backgroundColor: '#f30607'
						// 	// backgroundColor: '#e27b7b'
						// }
					]
				}}
				options={{
					plugins: {
						legend: {
							display: true,
							// position: 'bottom',
							// align: 'center',
							labels: {
								size: 5,
								family: 'Montserrat, sans-serif'
								// color: '#2B2B2B'
							}
						}
					},
					scales: {
						yAxes: [
							{
								beginAtZero: true,
								scaleLabel: {
									display: true,
									labelString: 'Y text',
									autoSkip: true,
									maxTicksLimit: 4,
									fontSize: 12,
									fontFamily: 'Montserrat',
									fontColor: '#0f1222'
								}
							}
						],
						xAxes: [
							{
								scaleLabel: {
									beginAtZero: true,
									display: true,
									labelString: 'X text',
									autoSkip: true,
									maxTicksLimit: 4,
									fontSize: 12,
									fontFamily: 'Montserrat',
									fontColor: '#0f1222',
									ticks: {
										stepSize: 0.5
									}
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
	quotation: PropTypes.array,
	layers: PropTypes.object,
	outcome: PropTypes.object
}

export default QuotationGraph
