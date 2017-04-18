import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fakeLogin } from '../actions/fakeLogin'
import { getInvites } from '../actions/invites'
import { Profile } from '../components/Profile'

class ProfileContainer extends Component {
  componentWillMount = () => {
    this.props.fakeLogin()
  }

  render = () => {
    if(this.props.loggedIn)
      this.props.getInvites()

    return (
      <Profile isLoggingIn={this.props.isLoggingIn}
          loginError={this.props.loginError}/>
    )
  }
}

const mapStateToProps = ({fakeLogin, newEvent}) => {
  return {
    isLoggingIn: fakeLogin.isLoggingIn,
    loginError: fakeLogin.loginError,
    loggedIn: fakeLogin.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { fakeLogin, getInvites }
)(ProfileContainer)
