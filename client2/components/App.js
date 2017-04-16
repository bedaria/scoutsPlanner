import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger }  from 'redux-logger'
import thunk from 'redux-thunk'
import { fakeLogin } from '../reducers/fakeLogin'
import HomeContainer from '../containers/HomeContainer.js'

const middleware = [ thunk, createLogger() ]
const store = createStore(
  fakeLogin,
  applyMiddleware(...middleware)
)

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={HomeContainer}/>
      </div>
    </Router>
  </Provider>
)

export default App
