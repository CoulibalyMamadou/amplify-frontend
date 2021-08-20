import './insurer-router.scss'
import AuthConfig from '../../../../guard/AuthConfig'
import { Route, Switch } from 'react-router-dom'
import { ROUTE_PREFIX } from '../../../../constants'
import AllocationProgram from '../../../program/insurer/allocation-program/allocation-program'
import AddProgramAllocation from '../../../program/insurer/add-program/add-program-allocation/add-program-allocation'
import AddProgramQuoterList from '../../../program/insurer/add-program/add-program-quoter-list/add-program-quoter-list'
import AddProgramTargetPrice from '../../../program/insurer/add-program/add-program-target-price/add-program-target-price'
import AddProgramPlacedShare from '../../../program/insurer/add-program/add-program-placed-share/add-program-placed-share'
import AddProgram from '../../../program/insurer/add-program/add-program'
import InsurerProgramHome from '../../../program/insurer/program-home/insurer-program-home'
import AddProgramDocument from '../../../program/insurer/add-program/add-program-document/add-program-document'
import ProgramReview from '../../../program/insurer/program-review/program-review'
import NotFound from '../../../NotFound/notFound'
import InsurerHead from '../insurer-head/insurer-head'

const InsurerRouter = () => {
	/**
	 * Routing for all reinsurer content
	 * Head and content
	 * Guard & component
	 */
	return (
		<>
			<InsurerHead />
			<Switch>
				{/* <PrivateRoute path="/dashboard" component={Reinsurer} /> */}
				<AuthConfig
					exact
					path={ROUTE_PREFIX.INSURER}
					component={InsurerProgramHome}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.INSURER + '/dashboard'}
					component={InsurerProgramHome}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.INSURER + '/program/add'}
					component={AddProgram}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.INSURER + '/program/add/document/:programId'}
					component={AddProgramDocument}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.INSURER + `/program/add/placedShare/:programId`}
					component={AddProgramPlacedShare}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.INSURER + '/program/add/targetPrice/:programId'}
					component={AddProgramTargetPrice}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.INSURER + '/program/add/quoter/list/:programId'}
					component={AddProgramQuoterList}
				/>
				<AuthConfig
					exact
					path={ROUTE_PREFIX.INSURER + '/program/add/allocation/:programId'}
					component={AddProgramAllocation}
				/>
				<AuthConfig
					// exact
					path={ROUTE_PREFIX.INSURER + '/program/allocation/:programId'}
					component={AllocationProgram}
				/>
				<AuthConfig
					// exact
					path={ROUTE_PREFIX.INSURER + '/program/review'}
					component={ProgramReview}
				/>
				<AuthConfig
					// exact
					path={ROUTE_PREFIX.INSURER + '/program/submit'}
					component={ProgramReview}
				/>
				<AuthConfig
					// exact
					path={ROUTE_PREFIX.INSURER + '/program/review'}
					component={ProgramReview}
				/>
				<Route path={'notFound'} component={NotFound} />
				<Route component={NotFound} />
			</Switch>
		</>
	)
}

export default InsurerRouter
