import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fakeLogin } from '../actions/fakeLogin'
import { Redirect } from 'react-router-dom'

class LoginContainer extends Component {
  componentDidMount = () => {
    this.props.fakeLogin()
  }

  render = () => {
    const { isLoggingIn, loginError, isLoggedIn } = this.props
    return (
      <div className="login">
        {isLoggingIn ? "Loading....": null}
        {loginError ? "Ooops, please reload....":null}
        {isLoggedIn ? <Redirect push to="/newEvent" />: null}
        <input type="text" placeholder="Getting you a random user :D" disabled/>
        <input type="password" placeholder="No need for a password yet" disabled/>
      </div>
    )
  }
}

const mapStateToProps = ({fakeLogin, newEvent}) => {
  return {
    isLoggingIn: fakeLogin.isLoggingIn,
    loginError: fakeLogin.loginError,
    isLoggedIn: fakeLogin.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { fakeLogin }
)(LoginContainer)
