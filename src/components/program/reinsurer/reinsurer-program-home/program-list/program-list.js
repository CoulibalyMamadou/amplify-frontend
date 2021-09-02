import './program-list.scss'
import ProgramItem from './program-item/program-item'
import { MdHome } from 'react-icons/all'
import { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'

const ProgramList = ({ listProgram = [{}] }) => {
	const [programList, setProgramList] = useState([{}])

	useEffect(() => {
		setProgramList(listProgram)
		console.log('program come to list : ', listProgram)
	}, [listProgram])

	return (
		<>
			{/* placement list */}
			{programList.map((program, index) => (
				<ProgramItem
					icon={<MdHome size='2em' />}
					status='complete'
					key={index}
					program={program}
				/>
			))}
		</>
	)
}

ProgramList.propTypes = {
	listProgram: PropTypes.array
}

export default ProgramList
