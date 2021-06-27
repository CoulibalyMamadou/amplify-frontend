import './App.scss'
import Login from '../../containers/Login'
import { Route, Switch } from 'react-router-dom'
import Home from '../home/home'

const App = (contentAction) => {
	return (
		<div className='App'>
			<main className='App-header'>
				<div className='home-content'>
					<Switch>
						<Route exact path='/' component={Login} />
						<Route path='/login' component={Login} />
						<Route component={Home} />
					</Switch>
					<div className='App-footer'> </div>
				</div>
			</main>
		</div>
	)
}

export default App
