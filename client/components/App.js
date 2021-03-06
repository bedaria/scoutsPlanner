import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger }  from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import ProfileContainer from '../containers/ProfileContainer'
import NewEventContainer from '../containers/NewEventContainer'
import LoginContainer from '../containers/LoginContainer'
import InviteContainer from '../containers/InviteContainer'
import EventListContainer from '../containers/EventListContainer'
import AdminEventContainer from '../containers/AdminEventContainer'
import ReplyContainer from '../containers/ReplyContainer'
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap'
import  { LinkContainer } from 'react-router-bootstrap'

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
        <Navbar style={{height: '50px'}} inverse >
          <Navbar.Header>
            <Navbar.Brand>
              Welcome
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/newEvent">
                <NavItem>
                  New Event
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/profile">
                <NavItem>
                  Profile
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/events">
                <NavItem>
                  Events
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Route exact path="/" component={LoginContainer}/>
          <Route path="/profile" component={ProfileContainer}/>
          <Route path="/newEvent" component={NewEventContainer}/>
          <div className="eventsContainer">
            <Route path="/events" component={EventListContainer}/>
            <Route path="/events/:event/invite" component={InviteContainer}/>
            <Route path="/events/:event/reply" component={ReplyContainer}/>
            <Route path="/events/:event/admin" component={AdminEventContainer}/>
          </div>
        </div>
      </div>
    </Router>
  </Provider>
)

export default App
