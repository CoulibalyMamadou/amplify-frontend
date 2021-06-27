import Provider from 'react-redux/lib/components/Provider'
import PropTypes from 'prop-types'
import App from '../App'
// import App from '../App'

const Root = ({ store }) => (
    <Provider store={store}>
        <App />
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default App
