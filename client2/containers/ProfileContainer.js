import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFriends } from '../actions/friends'
import { Profile } from '../components/Profile'

class ProfileContainer extends Component {
  render = () => (
    <Profile fetchFriends={this.props.fetchFriends}
          isFetchingFriends={this.props.isFetching}
          errorFetchingFriends={this.props.errorFetching} />
  )
}

const mapStateToProps = ({friends}) => {
  return {
    isFetchingFriends: friends.isFetching,
    errorFetchingFriends: friends.errorFetching,
    redirectToNewEvent: friends.redirectToNewEvent
  }
}

export default connect(
  mapStateToProps,
  { fetchFriends }
)(ProfileContainer)
