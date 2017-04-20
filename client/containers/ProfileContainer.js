import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProfileContainer extends Component {
  render = () => {
    return (
      <div> Hey, {localStorage.getItem('username')} </div>
    )
  }
}

export default ProfileContainer
// const mapStateToProps = ({fak}) => {
//   return {
//     isLoggingIn: fakeLogin.isLoggingIn,
//     loginError: fakeLogin.loginError,
//     loggedIn: fakeLogin.loggedIn
//   }
// }
//
// export default connect(
//   mapStateToProps,
//   null
// )(ProfileContainer)
