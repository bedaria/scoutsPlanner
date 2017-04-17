import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger }  from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import ProfileContainer from '../containers/ProfileContainer'
import NewEventContainer from '../containers/NewEventContainer'
import { TopBar } from './TopBar'
import { Tabs } from './Tabs'

const middleware = [ thunk, createLogger() ]
// const middleware = [ thunk ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <div className="sidebar">
          <Tabs />
          <div className="eventButtons">item</div>
        </div>
        <div className="main">
          <TopBar />
          <Route exact path="/" component={ProfileContainer}/>
          <Route path="/newEvent" component={NewEventContainer}/>
        </div>
      </div>
    </Router>
  </Provider>
)

export default App
