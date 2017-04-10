import React from 'react'
import Login from './Login'
import NewEvent from './NewEvent'
import Profile from './Profile'
import AdminEvent from './AdminEvent'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
        <Route path="/" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/newEvent" component={NewEvent}/>
        <Route path="/events/:event" component={AdminEvent} />
    </div>
  </BrowserRouter>
)

export default App
