import React, { Component } from 'react'
import { connect } from 'react-redux'

class EventListContainer extends Component {
  render = () => {
    if(this.props.invites.length && this.props.onInvites)
      return <EventList events={this.props.invites} eventHandler={() => {console.log("clicked on an invite")}} />
    else if(this.props.myEvents.length && !this.props.onInvites)
      return <EventList events={this.props.myEvents} eventHandler={() => {console.log("clicked on an admin event")}} />
    else if(this.props.fetchingInvites || this.props.fetchingMyEvents)
      return <div className="eventButtons"> Loading... </div>
    else
      return <div className="eventButtons"> None ... </div>
  }
}

const EventList = ({events, eventHandler}) => (
  <div className="eventButtons">
    {
      events.map(event => <Event key={event.id} anEvent={event} eventHandler={eventHandler} />)
    }
  </div>
)

const Event = ({anEvent, eventHandler}) => (
  <button id={anEvent.id} onClick={eventHandler}> {anEvent.name} </button>
)

const mapStateToProps = ({invites, myEvents, tabs}) => {
  return {
    invites: invites.invites,
    myEvents: myEvents.myEvents,
    fetchingMyEvents: myEvents.isFetching,
    fetchingInvites: invites.isFetching,
    onInvites: tabs.onInvites
  }
}

export default connect(
  mapStateToProps,
  null
)(EventListContainer)
