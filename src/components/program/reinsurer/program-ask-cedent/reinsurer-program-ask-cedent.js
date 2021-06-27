import './reinsurer-program-ask-cedent.scss'
import AskItem from './ask-item/ask-item'
import Input from '../../../form-component/Input/Input'

const ReinsurerProgramAskCedent = () => {
	const elementConfig = {
		type: 'text',
		placeholder: 'Send a message'
	}

	const sendMessageHandler = (message) => {
		console.log('message : ', message)
	}

	return (
		<section className='ask-content'>
			{/* body of placement body */}
			<section className='ask-display'>
				<AskItem />
				<AskItem fromInsurer={true} />
				<AskItem />
				<AskItem fromInsurer={true} />
				<AskItem />
				<AskItem />
				<AskItem fromInsurer={true} />
				<AskItem />
				<AskItem fromInsurer={true} />
			</section>
			<section className='messageArea'>
				<Input
					label='Any question for cedent'
					subLabel='Cedent will reply to you soon as possible'
					elementConfig={elementConfig}
					changed={sendMessageHandler}
				/>
			</section>
		</section>
	)
}

export default ReinsurerProgramAskCedent
