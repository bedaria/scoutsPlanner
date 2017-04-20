import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger }  from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import ProfileContainer from '../containers/ProfileContainer'
import NewEventContainer from '../containers/NewEventContainer'
import InviteListContainer from '../containers/InviteListContainer'
import EventListContainer from '../containers/EventListContainer'
import InviteContainer from '../containers/InviteContainer'
import EventContainer from '../containers/EventContainer'
import LoginContainer from '../containers/LoginContainer'
import SidebarTabsContainer from '../containers/SidebarTabsContainer'
import { TopBar } from './TopBar'

// const middleware = [ thunk, createLogger() ]
const middleware = [ thunk ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <div className="sidebar">
          <Route path="/" component={SidebarTabsContainer} />
          <Route path="/profile/invites" component={InviteListContainer} />
          <Route path="/profile/myEvents" component={EventListContainer} />
        </div>
        <div className="main">
          <TopBar />
          <Route exact path="/" component={LoginContainer}/>
          <Route path="/profile" component={ProfileContainer}/>
          <Route path="/newEvent" component={NewEventContainer}/>
          <Route path="/invites/:id" component={InviteContainer}/>
          <Route path="/events/:id" component={EventContainer}/>
        </div>
      </div>
    </Router>
  </Provider>
)

export default App
