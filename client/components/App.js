import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger }  from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import ProfileContainer from '../containers/ProfileContainer'
import NewEventContainer from '../containers/NewEventContainer'
import EventContainer from '../containers/EventContainer'
import LoginContainer from '../containers/LoginContainer'
import EventListContainer from '../containers/EventListContainer'
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
        <div className="container2">
          <Route exact path="/" component={LoginContainer}/>
          <Route path="/profile" component={ProfileContainer}/>
          <Route path="/newEvent" component={NewEventContainer}/>
          <div className="eventsContainer">
              <Route path="/events" component={EventListContainer}/>
              <Route path="/events/:event" component={EventContainer}/>
          </div>
        </div>
      </div>
    </Router>
  </Provider>
)

export default App
