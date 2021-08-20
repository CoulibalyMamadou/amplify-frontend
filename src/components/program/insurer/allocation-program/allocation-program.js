import './allocation-program.scss'
import AllocationLayer from './allocation-layer/allocation-layer'
import { useEffect, useState } from 'react'
import { FaCheckCircle, FiCheckCircle, RiFilePaper2Line } from 'react-icons/all'
import { useParams } from 'react-router'
import {
	getAllScenarioListFill,
	getFinalScenario,
	programUpdateScenarioFinal
} from '../../../../api/program.service'

const AllocationProgram = () => {
	const allocationData = [
		{
			idLayer: '60df2be69299f2001f92880a',
			price: 2.125,
			leadOffice: 'Sirius',
			allocation: [
				{ idOffice: '60d9e7e8a19b37001f53897e', name: 'Sirius', share: 0 },
				{ idOffice: '60d9e7e8a19b37001f53897e', name: 'Munich Re', share: 0 },
				{
					idOffice: '60d9e7b9a19b37001f538972',
					name: 'Nacional Re',
					share: 10
				},
				{ idOffice: '60d9e809a19b37001f53898a', name: 'Toa Re', share: 5 },
				{ idOffice: '60d9e723a19b37001f538952', name: 'R+V', share: 10 },
				{ idOffice: '60d9e7ffa19b37001f538986', name: 'Trans Re', share: 0 },
				{ idOffice: '60d9e6dda19b37001f538946', name: 'Mapfre', share: 5 },
				{
					idOffice: '60d9e7f1a19b37001f538982',
					name: 'Hannover Re',
					share: 15
				},
				{ idOffice: '60d9e75ea19b37001f53895e', name: 'Chaucer PLC', share: 0 },
				{ idOffice: '60d9e7dca19b37001f53897a', name: 'Swiss Re', share: 13 },
				{
					idOffice: '60d9e668a19b37001f53893a',
					name: 'Renaissance Re',
					share: 15
				},
				{ idOffice: '60d9e77aa19b37001f538966', name: 'Triglav Re', share: 2 },
				{ idOffice: '60d9e6f2a19b37001f53894a', name: 'Odyssey Re', share: 0 },
				{ idOffice: '60d9e74da19b37001f53895a', name: 'CCR Re', share: 5 },
				{ idOffice: '60d9e6a2a19b37001f53893e', name: 'Vig Re', share: 0 },
				{ idOffice: '60d9e76aa19b37001f538962', name: 'MS Amlin', share: 5 },
				{ idOffice: '60d9e7c9a19b37001f538976', name: 'Taiping Re', share: 0 },
				{ idOffice: '60d9e702a19b37001f53894e', name: 'Partner Re', share: 10 },
				{ idOffice: '60d9e7a6a19b37001f53896e', name: 'Korean Re', share: 0 }
			]
		},
		{
			idLayer: '60df2be69299f2001f92880c',
			price: 0.62,
			leadOffice: 'Sirius',
			allocation: [
				{ idOffice: '60d9e7e8a19b37001f53897e', name: 'Sirus', share: 0 },
				{ idOffice: '60d9e7e8a19b37001f53897e', name: 'Munich Re', share: 1 },
				{
					idOffice: '60d9e7b9a19b37001f538972',
					name: 'Nacional Re',
					share: 10
				},
				{ idOffice: '60d9e809a19b37001f53898a', name: 'Toa Re', share: 5 },
				{ idOffice: '60d9e723a19b37001f538952', name: 'R+V', share: 10 },
				{ idOffice: '60d9e7ffa19b37001f538986', name: 'Trans Re', share: 0 },
				{ idOffice: '60d9e6dda19b37001f538946', name: 'Mapfre', share: 5 },
				{
					idOffice: '60d9e7f1a19b37001f538982',
					name: 'Hannover Re',
					share: 15
				},
				{ idOffice: '60d9e75ea19b37001f53895e', name: 'Chaucer PLC', share: 0 },
				{ idOffice: '60d9e7dca19b37001f53897a', name: 'Swiss Re', share: 13 },
				{
					idOffice: '60d9e668a19b37001f53893a',
					name: 'Renaissance Re',
					share: 1
				},
				{ idOffice: '60d9e77aa19b37001f538966', name: 'Triglav Re', share: 2 },
				{ idOffice: '60d9e6f2a19b37001f53894a', name: 'Odyssey Re', share: 8 },
				{ idOffice: '60d9e74da19b37001f53895a', name: 'CCR Re', share: 5 },
				{ idOffice: '60d9e6a2a19b37001f53893e', name: 'Vig Re', share: 0 },
				{ idOffice: '60d9e76aa19b37001f538962', name: 'MS Amlin', share: 5 },
				{ idOffice: '60d9e7c9a19b37001f538976', name: 'Taiping Re', share: 2 },
				{ idOffice: '60d9e702a19b37001f53894e', name: 'Partner Re', share: 10 },
				{ idOffice: '60d9e7a6a19b37001f53896e', name: 'Korean Re', share: 3 }
			]
		},
		{
			idLayer: '60df2be69299f2001f92880e',
			price: 0.48,
			leadOffice: 'Sirius',
			allocation: [
				{ idOffice: '60d9e7e8a19b37001f53897e', name: 'Sirus', share: 0 },
				{ idOffice: '60d9e7e8a19b37001f53897e', name: 'Munich Re', share: 17 },
				{ idOffice: '60d9e7b9a19b37001f538972', name: 'Nacional Re', share: 0 },
				{ idOffice: '60d9e809a19b37001f53898a', name: 'Toa Re', share: 5 },
				{ idOffice: '60d9e723a19b37001f538952', name: 'R+V', share: 7 },
				{ idOffice: '60d9e7ffa19b37001f538986', name: 'Trans Re', share: 0 },
				{ idOffice: '60d9e6dda19b37001f538946', name: 'Mapfre', share: 5 },
				{
					idOffice: '60d9e7f1a19b37001f538982',
					name: 'Hannover Re',
					share: 15
				},
				{ idOffice: '60d9e75ea19b37001f53895e', name: 'Chaucer PLC', share: 0 },
				{ idOffice: '60d9e7dca19b37001f53897a', name: 'Swiss Re', share: 13 },
				{
					idOffice: '60d9e668a19b37001f53893a',
					name: 'Renaissance Re',
					share: 0
				},
				{ idOffice: '60d9e77aa19b37001f538966', name: 'Triglav Re', share: 2 },
				{ idOffice: '60d9e6f2a19b37001f53894a', name: 'Odyssey Re', share: 8 },
				{ idOffice: '60d9e74da19b37001f53895a', name: 'CCR Re', share: 5 },
				{ idOffice: '60d9e6a2a19b37001f53893e', name: 'Vig Re', share: 0 },
				{ idOffice: '60d9e76aa19b37001f538962', name: 'MS Amlin', share: 5 },
				{ idOffice: '60d9e7c9a19b37001f538976', name: 'Taiping Re', share: 0 },
				{ idOffice: '60d9e702a19b37001f53894e', name: 'Partner Re', share: 10 },
				{ idOffice: '60d9e7a6a19b37001f53896e', name: 'Korean Re', share: 3 }
			]
		}
	]

	const { programId } = useParams()
	console.log('Scenario come programId : ', programId)
	console.log('Scenario come allocationData : ', allocationData)

	const [allocationList, setAllocationList] = useState([])
	const [newValue, setNewValue] = useState([])
	const [scenarios, setScenarios] = useState([])
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [finalScenario, setFinalScenario] = useState('')
	// console.log('setConstraintList : ', setAllocationList)

	const getScenario = async () => {
		return getAllScenarioListFill(programId)
			.then((res) => res.json())
			.then((scenariosLoad) => {
				console.log('Scenario come: ', scenariosLoad)
				console.log('Scenario come 0: ', scenariosLoad.scenarios[0].allocations)
				setScenarios(() => scenariosLoad.scenarios)
				setAllocationList(() => scenariosLoad.scenarios[0].allocations)
				return scenariosLoad
			})
			.catch((reason) => {
				console.log('Scenario unknown : ', reason)
			})
	}

	const scenarioChoose = async () => {
		// eslint-disable-next-line no-unused-vars
		return getFinalScenario(programId)
			.then((res) => res.json())
			.then((scenario) => {
				console.log('Scenario choose: ', scenario)
				setFinalScenario(scenario.finalScenario)
				return scenario
			})
			.catch((reason) => {
				console.log('Scenario unknown : ', reason)
			})
	}

	useEffect(() => {
		getScenario().then((value) => {
			console.log('Scenario come retour appel : ', value)
		})
		scenarioChoose().then((value) => {
			console.log('Final Scenario : ', value)
		})
	}, [])

	useEffect(() => {
		console.log('update allocation new value update : ', newValue)
		setAllocationList(newValue)
	}, [newValue])

	useEffect(() => {
		console.log('update allocation new value update : ', newValue)
		setAllocationList(() => scenarios[selectedIndex]?.allocations)
	}, [selectedIndex])

	const switchScenario = (scenarioIndex) => {
		setSelectedIndex(scenarioIndex)
	}

	const chooseScenario = () => {
		const param = {
			programId,
			scenarioId: scenarios[selectedIndex]?._id
		}
		programUpdateScenarioFinal(param)
			.then((res) => res.json())
			.then((program) => {
				setFinalScenario(program.finalScenario)
				console.log('program return : ', program)
			})
		// setAllocationList(() => scenarios[selectedIndex].allocations)
	}

	const updateAllocation = (allocationIndex, allocationUpdate) => {
		let updateValue = []
		updateValue = [...allocationList]
		console.log('update allocation new allocationList : ', allocationList)
		console.log(
			'update allocation new updateValue[allocationIndex] : ',
			updateValue[allocationIndex]
		)
		updateValue[allocationIndex] = allocationUpdate
		console.log('update allocation new value : ', updateValue)
		// setAllocationList((prevState) => [
		// 	...updateValue
		// 	// ...prevState,
		// 	// ([allocationIndex] = allocationUpdate)
		// ])
		setNewValue(() => updateValue)
		console.log('update allocation new allocationUpdate : ', allocationUpdate)
		console.log('update allocation new value : ', updateValue)
	}

	return (
		<>
			<div className={'scenario-header'}>
				{scenarios.map((value, index) => {
					return (
						<>
							{/* <button className='action-button' onClick={switchScenario(index)}> */}
							<button
								key={index}
								className='action-button'
								onClick={() => switchScenario(index)}
							>
								<RiFilePaper2Line size={'1em'} className={'action-img'} />
								<span>Scenario {index + 1} </span>
							</button>
						</>
					)
				})}
			</div>
			{scenarios.length && (
				<div className={'action-bar'}>
					{/* <button className='action-button' onClick={switchScenario(index)}> */}
					<div>
						{/* <TotalPrice program={program} quotation={quotation}/> */}
						<p>Please validate if the scenario suits you </p>
					</div>
					{finalScenario === scenarios[selectedIndex]?._id ? (
						<button
							className='action-button scenario-choose'
							onClick={chooseScenario}
						>
							<FaCheckCircle size={'1em'} className={'action-img'} />
							<span>Your choice </span>
						</button>
					) : (
						<button className='action-button' onClick={chooseScenario}>
							<FiCheckCircle size={'1em'} className={'action-img'} />
							<span>Validate scenario </span>
						</button>
					)}
				</div>
			)}
			<section className='allocation-program-content'>
				{/* header of placement box */}
				{allocationList &&
					allocationList.map((allocation, index) => {
						return (
							<AllocationLayer
								key={index}
								allocationData={allocation.allocation}
								allocations={allocation}
								layerId={index}
								updateAllocation={updateAllocation}
								// layerId={allocation.id}
								layerPrice={allocation.price}
							/>
						)
					})}
			</section>
		</>
	)
}

export default AllocationProgram
