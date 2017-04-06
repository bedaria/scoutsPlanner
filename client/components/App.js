import React from 'react'
import Login from './Login'
import NewEvent from './NewEvent'
import Profile from './Profile'
import EventInvite from './EventInvite'
import EventList from './EventList'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => (
    <BrowserRouter>
      <div>
          <Route path="/" component={Login}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/newEvent" component={NewEvent}/>
          <Route path="/myEvent" component={EventList}/>
          <Route path="/anEvent" component={EventInvite}/>
      </div>
    </BrowserRouter>
)

export default App
