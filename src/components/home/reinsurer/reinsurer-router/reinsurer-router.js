import './reinsurer-router.scss'
import { Switch } from 'react-router-dom'
import AuthConfig from '../../../../guard/AuthConfig'
import { ROUTE_PREFIX } from '../../../../constants'
import AddProgramPlacedShare from '../../../program/insurer/add-program/add-program-placed-share/add-program-placed-share'
import AddProgramTargetPrice from '../../../program/insurer/add-program/add-program-target-price/add-program-target-price'
import AllocationProgram from '../../../program/insurer/allocation-program/allocation-program'
import ReinsurerProgramAskCedent from '../../../program/reinsurer/program-ask-cedent/reinsurer-program-ask-cedent'
import ProgramReview from '../../../program/reinsurer/program-review/program-review'
import ProgramAllocation from '../../../program/reinsurer/program-allocation/program-allocation'
import ProgramQuotation from '../../../program/reinsurer/program-quotation/program-quotation'
import ReinsurerProgramHome from '../../../program/reinsurer/reinsurer-program-home/reinsurer-program-home'
import ReinsurerHead from '../reinsurer-head/reinsurer-head'
import Placement0utcome from '../../../program/reinsurer/program-placement-outcome/placement-outcome'
// import ProgramQuotationFinal from '../../../program/reinsurer/program-quotation-final/program-quotation-final'

const ReinsurerRouter = () => {
	/**
	 * Routing for all reinsurer content
	 * Head and content
	 * Guard & component
	 */
	return (
		<>
			<ReinsurerHead />
			<Switch>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER}
					component={ReinsurerProgramHome}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/dashboard'}
					component={ReinsurerProgramHome}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/review/:programId'}
					component={ProgramReview}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/quotation/review/:programId'}
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
					component={ProgramAllocation}
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
				/>
				{/* <AuthConfig path="/program/add/document" component={AddProgramQuoterList}/> */}
				<AuthConfig
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
					path={ROUTE_PREFIX.REINSURER + '/program/allocation'}
					component={AllocationProgram}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.REINSURER + '/program/placement/:programId'}
					component={Placement0utcome}
				/>
			</Switch>
		</>
	)
}

export default ReinsurerRouter
