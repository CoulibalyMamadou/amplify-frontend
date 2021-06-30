import './program-item.scss'
import { BsHouseFill, BsThreeDotsVertical } from 'react-icons/bs'
import { format, formatDistance } from 'date-fns'
import * as PropTypes from 'prop-types'
import { ROUTE_PREFIX } from '../../../../../../constants'
import { useHistory } from 'react-router'

const ProgramItem = ({
	status = 'complete',
	icon = <BsHouseFill size='2em' />,
	program = {}
}) => {
	const history = useHistory()

	/**
	 * TODO: Update to redirect to the target program item page
	 */
	const programClickHandler = () => {
		// history.push(ROUTE_PREFIX.INSURER + '/program/add/document/' + program._id)
		history.push(ROUTE_PREFIX.INSURER + '/program/review/' + program._id)
	}

	console.log('program : ', program)

	return (
		<>
			<div
				id='placementRow'
				className='placement-body'
				onClick={programClickHandler}
			>
				<span className='wrapContent'>
					{/* <span> <BsHouseFill size="2em"/> </span> */}
					{/* <span> {icon} </span> */}
					<span> --- </span>
					<span className='span-box'>
						<span> {program.title}</span>
						<span>
							Posted{' '}
							{program.dateCreation
								? formatDistance(new Date(program.dateCreation), new Date(), {
										addSuffix: true
								  })
								: '...Loading'}{' '}
						</span>
					</span>
				</span>
				<span className='status-box'>
					<button className={String(program.status).toLowerCase()}>
						{program.status}
					</button>
				</span>
				<span className='span-box'>
					<span> {program.office?.name}</span>
					<span>
						on{' '}
						{program.dateCreation
							? format(new Date(program.dateCreation), 'dd.MM.yyyy')
							: '...Loading'}{' '}
					</span>
				</span>
				<span className='span-box'>
					<span>
						{program.quotationPeriod
							? format(
									new Date(program.quotationPeriod.quotationStart),
									'MMM. dd, yyyy'
							  )
							: '...Loading'}
					</span>
					<span>
						{program.quotationPeriod
							? format(
									new Date(program.quotationPeriod?.quotationStart),
									'h:mm bb'
							  )
							: '...Loading'}
					</span>
				</span>
				<span className='span-box'>
					<span>
						{program.quotationPeriod
							? format(
									new Date(program.quotationPeriod?.quotationEnd),
									'MMM. dd, yyyy'
							  )
							: '...Loading'}
					</span>
					<span>
						{program.quotationPeriod
							? format(
									new Date(program.quotationPeriod.quotationEnd),
									'h:mm bb'
							  )
							: '...Loading'}
					</span>
				</span>
				<span className='span-action'>
					<BsThreeDotsVertical size='2em' />
				</span>
			</div>
		</>
	)
}

ProgramItem.propTypes = {
	status: PropTypes.string,
	icon: PropTypes.object,
	program: PropTypes.object
}

export default ProgramItem
