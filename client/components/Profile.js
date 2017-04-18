import React from 'react'
import { Redirect } from 'react-router-dom'

export const Profile = ({isLoggingIn, loginError}) => {
  if(isLoggingIn)
    return (<div> Getting you a random account... </div>)
  else if(loginError) {
    return <div> Please reload page </div>
  }
  else {
    return <div> Hey, {localStorage.getItem('username')} </div>
  }
}
