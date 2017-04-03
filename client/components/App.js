import React from 'react'
import Login from './Login'
import NewEvent from './NewEvent'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => (
   <BrowserRouter>
     <div>
        <div>
          <Route exact path="/" component={Login}/>
          <Route path="/events/newEvent" component={NewEvent}/>
        </div>
      </div>
    </BrowserRouter>
  )

export default App
