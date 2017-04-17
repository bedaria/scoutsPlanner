import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewEventContainer from './NewEventContainer'
import ProfileContainer from './ProfileContainer'

class MainContainer extends Component {
  render() {
    if(this.props.redirectToNewEvent)
      return <NewEventContainer />
    else if(this.props.redirectToProfile)
      return <ProfileContainer />
    else
      return <ProfileContainer />
    }
}

const mapStateToProps = ({newEvent, friends}) => {
  return {
    redirectToNewEvent: friends.redirectToNewEvent,
    redirectToProfile: newEvent.redirectToProfile
  }
}

export default connect(
  mapStateToProps,
  null
)(MainContainer)
