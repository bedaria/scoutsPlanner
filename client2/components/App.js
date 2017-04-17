import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger }  from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import HomeContainer from '../containers/HomeContainer'

const middleware = [ thunk, createLogger() ]
// const middleware = [ thunk ]

const store = createStore(
  reducer,
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
