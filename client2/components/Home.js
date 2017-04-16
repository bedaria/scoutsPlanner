import React from 'react'
import MainContainer from '../containers/MainContainer'
import { Tabs } from './Tabs'

export const Home = ({isLoggingIn, loginError}) => {
  if(isLoggingIn)
    return (<div> Getting you a random account... </div>)
  else if(loginError) {
    return (<div> Please reload page </div>)
  }
  else
  {
    return (
      <div className="container">
        <div className="sidebar">
        <Tabs />
        <div className="eventButtons">item</div>

        </div><div className="main">
          <div className="topbar">
            Hey, {localStorage.getItem('username')}
          </div>
          <MainContainer />
          </div>
        </div>
    )
  }
}
