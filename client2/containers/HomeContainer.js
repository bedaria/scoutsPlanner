import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fakeLogin } from '../actions/fakeLogin'
import { Home } from '../components/Home'

class HomeContainer extends Component {
  componentWillMount = () => {
    this.props.fakeLogin()
  }

  render = () => {
    return (
      <Home isLoggingIn={this.props.isLoggingIn}
          loginError={this.props.loginError}/>
    )
  }
}

const mapStateToProps = ({fakeLogin, newEvent}) => {
  return {
    isLoggingIn: fakeLogin.isLoggingIn,
    loginError: fakeLogin.loginError
  }
}

export default connect(
  mapStateToProps,
  { fakeLogin }
)(HomeContainer)
