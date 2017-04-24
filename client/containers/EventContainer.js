import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Admin } from '../components/Admin'
import { Invite } from '../components/Invite'

class EventContainer extends Component {
  render = () => {
    const { eventsById, isFetchingEvent } = this.props
    let event = Object.keys(eventsById).length ?
      eventsById[this.props.match.params.event] : {}

    console.log("Object.keys(eventsById).length  ", Object.keys(eventsById).length )
    return (
      <div className="event">
        {isFetchingEvent ? <div class="loader" /> : null}
        {!event.name ? <div> Event does not exist </div> : null}
        {event.isAdmin ? <Admin event={event} /> : <Invite event={event} /> }
      </div>
    )
  }
}

const mapStateToProps = ({events: {eventsById, isFetching }}) => {
  return {
    eventsById,
    isFetchingEvent: isFetching }
}

export default connect(
  mapStateToProps,
  null
)(EventContainer)
