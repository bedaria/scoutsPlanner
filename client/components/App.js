import React from 'react'
import NewEvent from './NewEvent'
import Profile from './Profile'
import AdminEvent from './AdminEvent'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
        <Route path="/" component={Profile}/>
        <Route path="/newEvent" component={NewEvent}/>
        <Route path="/events/:event" component={AdminEvent} />
    </div>
  </BrowserRouter>
)

export default App
