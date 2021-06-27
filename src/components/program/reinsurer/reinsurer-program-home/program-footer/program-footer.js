import './program-footer.scss'
import { MdArrowDownward, MdChevronLeft, MdChevronRight } from 'react-icons/all'

const ProgramFooter = () => {
	return (
		<>
			{/* content footer of placement body */}
			<div className='placement-footer'>
				<span className='footer-box'>
					<span className='footer-description'>
						<span>Rows per page: </span>
						<span>
							6 <MdArrowDownward size='1em' />
						</span>
					</span>
					<span className='footer-action-navigate'>
						<p>1 - 6 of 26 </p>
						<span>
							<MdChevronLeft size='2em' />{' '}
						</span>
						<span>
							<MdChevronRight size='2em' />{' '}
						</span>
					</span>
				</span>
			</div>
		</>
	)
}

export default ProgramFooter
