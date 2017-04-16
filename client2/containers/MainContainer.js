import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFriends } from '../actions/friends'
import { Main } from '../components/Main'

class MainContainer extends Component {
  render = () => (
    <Main fetchFriends={this.props.fetchFriends}
          isFetchingFriends={this.props.isFetchingFriends}
          errorFetchingFriends={this.props.errorFetchingFriends}
          redirectToNewEvent={this.props.redirectToNewEvent}/>
  )
}

const mapStateToProps = ({friends}) => {
  return {
    isFetchingFriends: friends.isFetchingFriends,
    errorFetchingFriends: friends.errorFetchingFriends,
    redirectToNewEvent: friends.redirectToNewEvent
  }
}

export default connect(
  mapStateToProps,
  { fetchFriends }
)(MainContainer)
