import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'

render(
	<BrowserRouter>
		<Provider store={store}>
			<Root />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
)

