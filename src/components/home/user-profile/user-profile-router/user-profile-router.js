import '../user-profile-head/user-profile-head.scss'
import { Switch } from 'react-router-dom'
import AuthConfig from '../../../../guard/AuthConfig'
import { ROUTE_PREFIX } from '../../../../constants'
// import AddProgramPlacedShare from '../../../program/insurer/add-program/add-program-placed-share/add-program-placed-share'
// import AddProgramTargetPrice from '../../../program/insurer/add-program/add-program-target-price/add-program-target-price'
// import AddProgramQuoterList from '../../../program/insurer/add-program/add-program-quoter-list/add-program-quoter-list'
// import AddProgramAllocation from '../../../program/insurer/add-program/add-program-allocation/add-program-allocation'
// import AllocationProgram from '../../../program/insurer/allocation-program/allocation-program'
// import ReinsurerProgramAskCedent from '../../../program/reinsurer/program-ask-cedent/reinsurer-program-ask-cedent'
// import ProgramReview from '../../../program/reinsurer/program-review/program-review'
// import ProgramAllocation from '../../../program/reinsurer/program-allocation/program-allocation'
// import ProgramQuotation from '../../../program/reinsurer/program-quotation/program-quotation'
import UserProfileProgramHome from '../../../program/user-profile/user-profile-program-home/user-profile-program-home'
import UserProfileHead from '../user-profile-head/user-profile-head'
// import ProgramQuotationFinal from '../../../program/reinsurer/program-quotation-final/program-quotation-final'

const UserProfileRouter = () => {
	/**
	 * Routing for all reinsurer content
	 * Head and content
	 * Guard & component
	 */
	return (
		<>
			<UserProfileHead />
			<Switch>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.USERPROFILE}
					component={UserProfileProgramHome}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.USERPROFILE + '/dashboard'}
					component={UserProfileProgramHome}
				/>
			</Switch>
			{/*
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/review/:programId'}
					component={ProgramReview}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/cedent/ask/:programId'}
					component={ReinsurerProgramAskCedent}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/allocation/:programId'}
					component={ProgramAllocation}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/quotation/:programId'}
					component={ProgramQuotation}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/quotation/update/:programId'}
					component={ProgramQuotationFinal}
				/>
				<AuthConfig
					exact
					path={
						ROUTE_PREFIX.REINSURER + '/program/quotation/follower/:programId'
					}
					component={ProgramQuotation}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/quotation/review/:programId'}
					component={ProgramQuotation}
				/> */}

			{/* <AuthConfig path="/program/add/document" component={AddProgramQuoterList}/> */}
			{/* <AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/add/placedShare/:programId'}
					component={AddProgramPlacedShare}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/add/targetPrice/:programId'}
					component={AddProgramTargetPrice}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/add/quoter/list'}
					component={AddProgramQuoterList}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/add/allocation'}
					component={AddProgramAllocation}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/allocation'}
					component={AllocationProgram}
				/>
			</Switch> */}
		</>
	)
}

export default UserProfileRouter
