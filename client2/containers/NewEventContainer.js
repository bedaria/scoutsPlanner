import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewEvent from '../components/NewEvent'
import { createEvent } from '../actions/newEvent'

class NewEventContainer extends Component {
  render = () => (
    <NewEvent isSubmitting={this.props.isSubmitting}
              redirect={this.props.redirect}
              errorCreating={this.props.errorCreating}
              friends={this.props.friends}
              createEvent={(eventInfo) => this.props.createEvent(eventInfo)}/>
  )
}

const mapStateToProps = ({newEvent, friends}) => {
  return {
    isSubmitting: newEvent.isSubmitting,
    redirectToProfile: newEvent.redirectToProfile,
    errorCreating: newEvent.errorCreating,
    friends: friends.friends
  }
}

export default connect(
  mapStateToProps,
  { createEvent }
)(NewEventContainer)
