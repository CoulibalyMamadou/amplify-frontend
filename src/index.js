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
			{/* <App /> */}
		</Provider>
	</BrowserRouter>,
	// <React.StrictMode>
	//   <App />
	// </React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
