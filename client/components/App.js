import React from 'react'
import NewEvent from './NewEvent'
import Profile from './Profile'
import AdminEvent from './AdminEvent'
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger }  from 'redux-logger'
import thunk from 'redux-thunk'
import { friends } from '../reducers/friends'

const middleware = [ thunk, createLogger() ]

const store = createStore(
  friends,
  applyMiddleware(...middleware)
)

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
          <Route path="/" component={Login}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/newEvent" component={NewEvent}/>
          <Route path="/events/:event" component={AdminEvent} />
          <Route path="/logout" component={Logout} />
      </div>
    </BrowserRouter>
  </Provider>
)

export default App
