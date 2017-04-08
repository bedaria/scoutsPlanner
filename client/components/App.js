import React from 'react'
import Login from './Login'
import NewEvent from './NewEvent'
import Profile from './Profile'

const App = () => (
    <BrowserRouter>
      <div>
          <Route path="/" component={Login}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/newEvent" component={NewEvent}/>
      </div>
    </BrowserRouter>
)

export default App
