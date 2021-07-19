import { BsHouseFill, BsCloudUpload } from 'react-icons/bs'
import add from '../assets/icon/add-icon.png'
import { RiArrowRightSLine } from 'react-icons/all'

export const ENABLE_LOGIN = 'ENABLE_LOGIN'
export const IS_LOGIN = 'IS_LOGIN'
export const ERROR_LOGIN = 'ERROR_LOGIN'
export const INVALID_LOGIN = 'INVALID_LOGIN'
export const VALID_LOGIN = 'VALID_LOGIN'
export const INVALID_LOGIN_MESSAGE = 'Incorrect login or password'
export const LOGIN_MESSAGE = 'Veuillez vous reconnecter'
export const VALID_LOGIN_MESSAGE = 'Bienvenue sur Bifrost web app'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_MESSAGE = 'LOGOUT'

export const API = 'https://www.mamadoucoulibaly.com'
// export const API = 'http://localhost:8000'

// USER
export const ERROR_USER = 'ERROR_USER'
export const SET_USER = 'SET_USER'
export const ADD_USER = 'ADD_USER'
export const GET_USER = 'MODIFY_USER'
export const DELETE_USER = 'DELETE_USER'
export const MODIFY_USER = 'MODIFY_USER'

// AUTH
export const ERROR_AUTH = 'ERROR_AUTH'
export const SET_AUTH = 'SET_AUTH'
export const ADD_AUTH = 'ADD_AUTH'
export const GET_AUTH = 'GET_AUTH'
export const GET_AUTH_TYPE = 'GET_AUTH_TYPE'
export const DELETE_AUTH = 'DELETE_AUTH'
export const MODIFY_AUTH = 'MODIFY_AUTH'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const USER_TYPE = {
	INSURER: 'Insurer',
	REINSURER: 'Reinsurer',
	USERPROFILE: 'User-profile'
}

export const ROUTE_PREFIX = {
	INSURER: '/insurer',
	REINSURER: '/reinsurer',
	USERPROFILE: '/user-profile'
}

export const TOAST = {
	PROGRAM_CREATE_SUCCESS: {
		message: 'Program successfully created',
		state: 'success'
	},
	PROGRAM_TARGET_PRICE_SUCCESS: {
		message: 'Target price saved successfully',
		state: 'success'
	},
	PROGRAM_QUOTATION_LIST_SUCCESS: {
		message: 'Reinsurers list successfully created',
		state: 'success'
	},
	PROGRAM_ALLOCATION_LIST_SUCCESS: {
		message: 'Settings successfully created',
		state: 'success'
	},
	PROGRAM_ALLOCATION_SET_ERROR: {
		message: 'Allocation set error',
		state: 'error'
	},
	PROGRAM_ALLOCATION_CREATE_WARNING: {
		message: 'Make sure all allocation info is correct',
		state: 'warning'
	},
	PROGRAM_CONSTRAINT_LIST_SUCCESS: {
		message: 'Settings list successfully created',
		state: 'success'
	},
	PROGRAM_CONSTRAINT_SUCCESS: {
		message: 'Quotation list successfully created',
		state: 'success'
	},
	PROGRAM_CREATE_ERROR: {
		message: 'Problem on program creation',
		state: 'error'
	},
	PROGRAM_CREATE_WARNING: {
		message: 'Make sure all program info is correct',
		state: 'warning'
	},
	PROGRAM_CREATE_INFO: {
		message: 'Make sure all program info is correct',
		state: 'info'
	},
	QUOTATION_SET_SUCCESS: {
		message: 'Quotation set with success ',
		state: 'success'
	},
	QUOTATION_SET_ERROR: {
		message: 'Quotation set error',
		state: 'error'
	},
	PROGRAM_CONSTRAINT_CREATE_GROUP_SUCCESS: {
		message: 'Group create with success',
		state: 'success'
	},
	PROGRAM_CONSTRAINT_CREATE_GROUP_SELECT_ERROR: {
		message: 'Make sure to select a group',
		state: 'error'
	},
	PROGRAM_CONSTRAINT_CREATE_GROUP_INPUT_ERROR: {
		message: 'Make sure all group info are correct',
		state: 'error'
	}
}

export const CONSTRAINT_TYPE = {
	EQUAL: 'equal',
	MAXIMUM: 'max',
	RELATIVE_MINIMUM: 'rel_min',
	RELATIVE_MAXIMUM: 'rel_max',
	CONDITIONAL_MINIMUM: 'cond_min'
}
export const LIST_LINK = {
	// Link for insurer
	HOME: '/',
	DASHBOARD: '/insurer/dashboard',
	ADD_PROGRAM: '/insurer/program/add',
	ADD_DOCUMENT: '/insurer/program/add/document',
	ADD_PLACED_SHARE: '/insurer/program/add/placedShare',
	ADD_TARGET_PRICE: '/insurer/program/add/targetPrice',
	ADD_QUOTER_LIST: '/insurer/program/add/quoter/list',
	ADD_ALLOCATION_CONSTRAINT: '/insurer/program/add/allocation',
	QUOTATION: '/insurer/program/quotation',
	// CONSTRAINT: '/insurer/program/allocation',
	ALLOCATION: '/insurer/program/allocation',
	REVIEW: '/insurer/program/review',
	FINAL_REVIEW: '/insurer/program/final_review',
	FINAL: '/insurer/program/final',
	SUBMIT_PROGRAM: '/insurer/program/submit',

	// Link for reinsurer
	REINSURER_REVIEW: '/reinsurer/program/review',
	REINSURER_ALLOCATION: '/reinsurer/program/allocation',
	REINSURER_QUOTATION: '/reinsurer/program/quotation',
	REINSURER_ALLOCATION_CONSTRAINTS: '/reinsurer/program/quotation/update',
	REINSURER_QUOTATION_2: '/reinsurer/program/quotation/follower',
	REINSURER_ASK: '/reinsurer/cedent/ask',
	RE_SUBMIT_PROGRAM: '/reinsurer/program/submit',
	RE_DASHBOARD: '/reinsurer/dashboard',
	USER_PROFILE: '/user-profile'
}
export const USER_LINK = {
	DASHBOARD: '/user-profile'
}

export const VIEW_ACTION_MESSAGE = {
	[LIST_LINK.DASHBOARD]: 'Dashboard',
	[LIST_LINK.ADD_PROGRAM]: 'General information',
	[LIST_LINK.ADD_DOCUMENT]: 'Documents',
	[LIST_LINK.ADD_PLACED_SHARE]: 'Placed share',
	[LIST_LINK.ADD_TARGET_PRICE]: 'Target price',
	[LIST_LINK.ADD_QUOTER_LIST]: 'Reinsurer types',
	[LIST_LINK.ADD_ALLOCATION_CONSTRAINT]: 'Allocation settings',
	[LIST_LINK.QUOTATION]: 'Allocation',
	[LIST_LINK.QUOTATION]: 'Reinsurer types',
	[LIST_LINK.CONSTRAINT]: 'Allocation constraints',
	[LIST_LINK.ALLOCATION]: 'Allocation',
	[LIST_LINK.REVIEW]: 'Review',
	[LIST_LINK.SUBMIT_PROGRAM]: 'Review',
	[LIST_LINK.USER_PROFILE]: 'User profile',
	[LIST_LINK.REINSURER_REVIEW]: 'Review',
	[LIST_LINK.REINSURER_ALLOCATION]: 'Allocation constraints',
	[LIST_LINK.REINSURER_QUOTATION]: 'Quotation',
	[LIST_LINK.REINSURER_ALLOCATION_CONSTRAINTS]: 'Allocation constraints',
	[LIST_LINK.REINSURER_QUOTATION_2]: 'Quotation',
	[LIST_LINK.REINSURER_ASK]: 'Ask cedent'
}

export const StatusStructureTypeEnum = {
	COMPLETE: 'COMPLETE',
	REVIEW: 'REVIEW',
	COMMUNICATION: 'COMMUNICATION',
	UN_COMPLETE: 'UNCOMPLETE',
	QUOTATION_RESTRICTED: 'QUOTATION (Quoter)',
	QUOTATION: 'QUOTATION',
	QUOTED: 'QUOTED'
	// [LIST_LINK.USER_PROFILE]: 'User profile'
}

export const ACTION_BUTTON = {
	'/insurer': {
		link: LIST_LINK.ADD_PROGRAM,
		message: (
			<>
				<img src={add} className='action-img' /> New program
			</>
		)
	},
	'/user-profile': {
		link: USER_LINK.DASHBOARD,
		message: 'Update'
	},
	'/insurer/dashboard': {
		link: LIST_LINK.ADD_PROGRAM,
		message: (
			<>
				<img src={add} className='action-img' /> New program
			</>
		)
	},
	'/insurer/program/add': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: <BsHouseFill size='1em' />
	},
	// '/insurer/program/add': {
	// 	link: '/insurer/program/add/document',
	// 	message: 'Supporting documents'
	// },
	// '/insurer/program/add/document': {
	// 	link: LIST_LINK.ADD_PLACED_SHARE,
	// 	message: (
	// 		<>
	// 			Placed share <RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	)
	// },
	'/insurer/program/add/document': {
		link: LIST_LINK.ADD_TARGET_PRICE,
		message: (
			<>
				Target Price <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)
	},
	// '/insurer/program/add/placedShare': {
	// 	link: LIST_LINK.ADD_TARGET_PRICE,
	// 	message: (
	// 		<>
	// 			Target Price <RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	)
	// },
	'/insurer/program/add/targetPrice': {
		link: LIST_LINK.ADD_QUOTER_LIST,
		message: (
			<>
				Reinsurer types{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)
	},
	'/insurer/program/add/quoter/list': {
		link: LIST_LINK.ADD_ALLOCATION_CONSTRAINT,
		message: (
			<>
				Allocation settings{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)
	},
	'/insurer/program/add/allocation': {
		link: LIST_LINK.REVIEW,
		message: 'Review'
	},
	'/insurer/program/review': {
		link: LIST_LINK.ALLOCATION,
		message: 'Allocation'
	},
	'/insurer/program/allocation': {
		link: LIST_LINK.SUBMIT_PROGRAM,
		message: (
			<>
				Review <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)

		// message: 'Dashboard'
	},
	'/insurer/program/submit': {
		// link: LIST_LINK.DASHBOARD,
		// message: <BsHouseFill size='1em' />

		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: (
			<>
				<BsCloudUpload size={'1em'} className='action-img' /> Submit
			</>
		)
	},
	// reinsurer action button list
	'/reinsurer/program/review': {
		link: '/reinsurer/cedent/ask',
		message: (
			<>
				Ask cedent <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [
			StatusStructureTypeEnum.QUOTATION_RESTRICTED,
			StatusStructureTypeEnum.QUOTATION
		]
	},
	'/reinsurer/cedent/ask': {
		link: '/reinsurer/program/allocation',
		message: (
			<>
				Allocation constraints{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [
			StatusStructureTypeEnum.QUOTATION_RESTRICTED,
			StatusStructureTypeEnum.QUOTATION
		]
	},
	'/reinsurer/program/allocation': {
		link: '/reinsurer/program/quotation',
		message: (
			<>
				Quotation <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION_RESTRICTED]
	},
	'/reinsurer/program/quotation': {
		link: '/reinsurer/program/quotation/update',
		// message: 'Dashboard'
		message: (
			<>
				Update quotes <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION]
	},
	'/reinsurer/program/quotation/update': {
		link: '/reinsurer/program/quotation/follower',
		// link: '/reinsurer/dashboard',
		message: (
			<>
				Quotation <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION]
	},
	'/reinsurer/program/quotation/follower': {
		link: '/reinsurer/program/quotation/review',
		// link: '/reinsurer/dashboard',
		message: (
			<>
				Review <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION]
	},
	'/reinsurer/program/quotation/review': {
		link: '/reinsurer/dashboard',
		message: <BsHouseFill size='1em' />,
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION]
		// message: 'Dashboard'
	}
}

export const ACTION_BUTTON_INSURER = {
	'/insurer': {
		link: LIST_LINK.ADD_PROGRAM,
		message: (
			<>
				<img src={add} className='action-img' /> New program
			</>
		)
	},
	'/insurer/dashboard': {
		link: LIST_LINK.ADD_PROGRAM,
		message: (
			<>
				<img src={add} className='action-img' /> New program
			</>
		)
	},
	'/insurer/program/add': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: <BsHouseFill size='1em' />
	},
	'/insurer/program/add/document': {
		link: LIST_LINK.ADD_PLACED_SHARE,
		message: (
			<>
				Placed share <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)
	},
	'/insurer/program/add/placedShare': {
		link: LIST_LINK.ADD_TARGET_PRICE,
		message: (
			<>
				Target Price <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)
	},
	'/insurer/program/add/targetPrice': {
		link: LIST_LINK.ADD_QUOTER_LIST,
		message: (
			<>
				Reinsurer types{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)
	},
	'/insurer/program/add/quoter/list': {
		link: LIST_LINK.ADD_ALLOCATION_CONSTRAINT,
		message: (
			<>
				Allocation settings{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)
	},
	'/insurer/program/add/allocation': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: (
			<>
				<BsCloudUpload size={'1em'} className='action-img' /> Submit
			</>
		)
	},
	'/reinsurer/program/review': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: (
			<>
				<BsCloudUpload size={'1em'} className='action-img' /> Submit
			</>
		)
		// message: 'Dashboard'
	},
	'/insurer/program/allocation': {
		link: LIST_LINK.SUBMIT_PROGRAM,
		message: 'Submit'
	},
	'/insurer/program/submit': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: <BsHouseFill size='1em' />
	}
}

export const ACTION_BUTTON_INSURER_ALLOCATION = {
	// '/insurer': {
	// 	link: LIST_LINK.REVIEW,
	// 	message: (
	// 		<>
	// 			Review <RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	)
	// },
	// '/insurer/dashboard': {
	// 	link: LIST_LINK.REVIEW,
	// 	message: (
	// 		<>
	// 			REVIEW <RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	)
	// },
	'/insurer/program/add': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: <BsHouseFill size='1em' />
	},
	'/insurer/program/review': {
		link: LIST_LINK.ALLOCATION,
		// message: 'Dashboard'
		message: (
			<>
				Allocation <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.COMPLETE]
	},
	'/insurer/program/allocation': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: (
			<>
				Submit <BsCloudUpload size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.COMPLETE]
	}
}

export const ACTION_BUTTON_INSURER_REVIEW = {
	'/insurer': {
		link: LIST_LINK.ADD_PROGRAM,
		message: <>New Program</>
	},
	'/insurer/dashboard': {
		link: LIST_LINK.ADD_PROGRAM,
		message: <>New Program</>
	},
	'/insurer/program/add': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: <BsHouseFill size='1em' />
	},
	'/insurer/program/review': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: <BsHouseFill size='1em' />,
		guard: true,
		requireStatus: [
			StatusStructureTypeEnum.REVIEW,
			StatusStructureTypeEnum.QUOTATION_RESTRICTED,
			StatusStructureTypeEnum.QUOTATION,
			StatusStructureTypeEnum.QUOTED,
			StatusStructureTypeEnum.COMPLETE,
			StatusStructureTypeEnum.COMMUNICATION
		]
	}
}

export const ACTION_BUTTON_INSURER_UNCOMPLETE = {
	'/insurer/program/review': {
		link: LIST_LINK.ADD_DOCUMENT,
		// message: 'Dashboard'
		message: (
			<>
				Add Document <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [
			StatusStructureTypeEnum.REVIEW,
			StatusStructureTypeEnum.UN_COMPLETE
		]
	},
	'/insurer/program/add/document': {
		link: LIST_LINK.ADD_TARGET_PRICE,
		message: (
			<>
				Target Price <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.UN_COMPLETE]
		// link: LIST_LINK.ADD_PLACED_SHARE,
		// message: (
		// 	<>
		// 		Placed share <RiArrowRightSLine size={'1em'} className='action-img' />
		// 	</>
		// ),
		// guard: true,
		// requireStatus: [StatusStructureTypeEnum.UN_COMPLETE]
	},
	// '/insurer/program/add/placedShare': {
	// 	link: LIST_LINK.ADD_TARGET_PRICE,
	// 	message: (
	// 		<>
	// 			Target Price <RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	),
	// 	guard: true,
	// 	requireStatus: [StatusStructureTypeEnum.UN_COMPLETE]
	// },
	'/insurer/program/add/targetPrice': {
		link: LIST_LINK.ADD_QUOTER_LIST,
		message: (
			<>
				Reinsurer types{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.UN_COMPLETE]
	},
	'/insurer/program/add/quoter/list': {
		link: LIST_LINK.ADD_ALLOCATION_CONSTRAINT,
		message: (
			<>
				Allocation settings{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.UN_COMPLETE]
	},
	'/insurer/program/add/allocation': {
		link: LIST_LINK.SUBMIT_PROGRAM,
		// message: 'Dashboard'
		message: (
			<>
				Review <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.UN_COMPLETE]
	},
	'/insurer/program/allocation': {
		link: LIST_LINK.SUBMIT_PROGRAM,
		message: (
			<>
				Review <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		)
	},
	'/insurer/program/submit': {
		link: LIST_LINK.HOME,
		message: <>Submit</>,
		guard: true,
		requireStatus: [StatusStructureTypeEnum.UN_COMPLETE]
	},
	'/insurer/program/final_review': {
		link: LIST_LINK.DASHBOARD,
		message: (
			<>
				<BsCloudUpload size={'1em'} className='action-img' /> Submit
			</>
		)
	}
}

/** ** Reinsurer ****/
export const ACTION_BUTTON_REVIEW = {
	/* '/reinsurer/program/review': {
		link: '/reinsurer/dashboard',
		message: <BsHouseFill size='1em' />,
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION]
		// message: 'Dashboard'
	}, */
	'/insurer/program/add': {
		link: LIST_LINK.DASHBOARD,
		// message: 'Dashboard'
		message: <BsHouseFill size='1em' />
	}
}

export const ACTION_BUTTON_QUOTATION_RESTRICTED = {
	// '/reinsurer/program/review': {
	// 	link: '/reinsurer/cedent/ask',
	// 	message: (
	// 		<>
	// 			Ask cedent <RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	),
	// 	guard: true,
	// 	requireStatus: [
	// 		StatusStructureTypeEnum.QUOTATION_RESTRICTED,
	// 		StatusStructureTypeEnum.QUOTATION
	// 	]
	// },
	// '/reinsurer/cedent/ask': {
	// 	link: '/reinsurer/program/allocation',
	// 	message: (
	// 		<>
	// 			Allocation constraints{' '}
	// 			<RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	),
	// 	guard: true,
	// 	requireStatus: [StatusStructureTypeEnum.QUOTATION_RESTRICTED]
	// },
	'/reinsurer/program/review': {
		link: '/reinsurer/program/allocation',
		message: (
			<>
				Allocation constraints{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION_RESTRICTED]
	},
	'/reinsurer/program/allocation': {
		link: '/reinsurer/program/quotation',
		message: (
			<>
				Quotation <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION_RESTRICTED]
	},
	'/reinsurer/program/quotation/': {
		link: '/reinsurer/program/quotation/review',
		// link: '/reinsurer/dashboard',
		message: (
			<>
				Review <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [StatusStructureTypeEnum.QUOTATION_RESTRICTED]
	},
	'/reinsurer/program/quotation/review': {
		link: '/reinsurer/dashboard',
		message: <BsHouseFill size='1em' />,
		guard: true,
		requireStatus: []
	}
}

export const ACTION_BUTTON_QUOTATION = {
	'/reinsurer/program/review': {
		link: '/reinsurer/program/allocation',
		message: (
			<>
				Allocation constraints{' '}
				<RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [
			StatusStructureTypeEnum.QUOTATION_RESTRICTED,
			StatusStructureTypeEnum.QUOTATION
		]
	},
	'/reinsurer/program/allocation': {
		link: '/reinsurer/program/quotation',
		message: (
			<>
				Quotation <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [
			StatusStructureTypeEnum.QUOTATION_RESTRICTED,
			StatusStructureTypeEnum.QUOTATION
		]
	},
	'/reinsurer/program/quotation/': {
		link: '/reinsurer/program/quotation/review',
		// link: '/reinsurer/dashboard',
		message: (
			<>
				Review <RiArrowRightSLine size={'1em'} className='action-img' />
			</>
		),
		guard: true,
		requireStatus: [
			StatusStructureTypeEnum.QUOTATION_RESTRICTED,
			StatusStructureTypeEnum.QUOTATION
		]
	},
	'/reinsurer/program/quotation/review': {
		link: '/reinsurer/dashboard',
		message: <BsHouseFill size='1em' />,
		guard: true,
		requireStatus: []
	}
	// '/reinsurer/program/review': {
	// 	// 	link: '/reinsurer/cedent/ask',
	// 	// 	message: (
	// 	// 		<>
	// 	// 			Ask cedent <RiArrowRightSLine size={'1em'} className='action-img' />
	// 	// 		</>
	// 	// 	),
	// 	// 	guard: true,
	// 	// 	requireStatus: [
	// 	// 		StatusStructureTypeEnum.QUOTATION_RESTRICTED,
	// 	// 		StatusStructureTypeEnum.QUOTATION
	// 	// 	]
	// 	// },
	// 	// '/reinsurer/cedent/ask': {
	// 	link: '/reinsurer/program/allocation',
	// 	// link: '/reinsurer/program/quotation/update',
	// 	message: (
	// 		<>
	// 			Allocation constraints{' '}
	// 			<RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	),
	// 	guard: true,
	// 	requireStatus: [
	// 		StatusStructureTypeEnum.QUOTATION_RESTRICTED,
	// 		StatusStructureTypeEnum.QUOTATION
	// 	]
	// },
	// '/reinsurer/program/quotation/update': {
	// 	link: '/reinsurer/program/quotation',
	// 	// link: '/reinsurer/program/quotation/follower',
	// 	// link: '/reinsurer/dashboard',
	// 	message: (
	// 		<>
	// 			Quotation <RiArrowRightSLine size={'1em'} className='action-img' />
	// 		</>
	// 	),
	// 	guard: true,
	// 	requireStatus: [
	// 		StatusStructureTypeEnum.QUOTATION_RESTRICTED,
	// 		StatusStructureTypeEnum.QUOTATION
	// 	]
	// },
	// // '/reinsurer/program/quotation/follower': {
	// '/reinsurer/program/quotation': {
	// 	link: '/reinsurer/dashboard',
	// 	// link: '/reinsurer/dashboard',
	// 	// 	message: (
	// 	// 		<>
	// 	// 			Submit <RiArrowRightSLine size={'1em'} className='action-img' />
	// 	// 		</>
	// 	// 	),
	// 	// 	guard: true,
	// 	// 	requireStatus: [StatusStructureTypeEnum.QUOTATION]
	// 	// },
	// 	// '/reinsurer/program/quotation/review': {
	// 	// 	link: '/',
	// 	// link: LIST_LINK.RE_DASHBOARD,
	// 	message: <>Submit</>,
	// 	guard: true,
	// 	requireStatus: [
	// 		StatusStructureTypeEnum.QUOTATION_RESTRICTED,
	// 		StatusStructureTypeEnum.QUOTATION
	// 	]
	// } /* ,
	// '/reinsurer/dashboard': {
	// 	link: '/reinsurer/dashboard',
	// 	message: <BsHouseFill size='1em' />,
	// 	guard: true,
	// 	requireStatus: []
	// } */
}

// Program structure group option
export const TYPE_OPTIONS_GROUP = {
	optGroup: [
		{
			label: 'Property And Speciality',
			options: [
				{ value: '', displayValue: '' },
				{ value: 'PROPERTY', displayValue: 'Property' },
				{ value: 'CREDIT_SURETY', displayValue: 'Credit and Surety' },
				{ value: 'ENGINEERING', displayValue: 'Engineering' },
				{ value: 'AVIATION', displayValue: 'Aviation' },
				{ value: 'MARINE', displayValue: 'Marine' },
				{ value: 'AGRICULTURE', displayValue: 'Agriculture' },
				{
					value: 'NORTH_AMERICA_FACULTATIVE',
					displayValue: 'North America facultative'
				}
			]
		},
		{
			label: 'Casualty',
			options: [
				{ value: 'LIABILITY', displayValue: 'Liability', disabled: true },
				{ value: 'MOTOR', displayValue: 'Motor', disabled: true },
				{
					value: 'WORKER_COMPENSATION',
					displayValue: "Worker's compensation",
					disabled: true
				},
				{
					value: 'PERSONAL_ACCIDENT',
					displayValue: 'Personal accident',
					disabled: true
				},
				{
					value: 'MANAGEMENT_PROFESSIONAL_LIABILITY',
					displayValue: 'Management and Professional Liability',
					disabled: true
				},
				{ value: 'CYBER', displayValue: 'Cyber', disabled: true },
				{
					value: 'NORTH_AMERICA_FACULTATIVE',
					displayValue: 'North America Ffcultative',
					disabled: true
				}
			]
		},
		{
			label: 'Life',
			options: [{ value: 'LIFE', displayValue: 'life', disabled: true }]
		}
	]
}

// const structureOptionsGroup = {
export const STRUCTURE_OPTIONS_GROUP = {
	optGroup: [
		{
			label: 'Non Proportional',
			options: [
				{ value: '', displayValue: '' },
				{ value: 'EXCESS_OF_LOSS', displayValue: 'Excess of loss' },
				{ value: 'STOP_LOSS', displayValue: 'Stop loss', disabled: true }
			]
		},
		{
			label: 'Proportional',
			options: [
				{ value: 'QUOTA_SHARE', displayValue: 'Quota Share', disabled: true },
				{ value: 'SURPLUS', displayValue: 'Surplus', disabled: true }
			]
		}
	]
}

// const structureOptionsGroup = {
export const PROGRAM_TYPE_OPTIONS = {
	options: [
		{ value: '', displayValue: '' },
		{ value: 'TREATY', displayValue: 'Treaty reinsurance' }
	]
}
// const structureOptionsGroupUser = {
export const PROGRAM_TYPE_OPTIONS_USER = {
	options: [
		{ value: '', displayValue: '' },
		{ value: 'REINSURANCE', displayValue: 'Reinsurance underwriter' }
	]
}
