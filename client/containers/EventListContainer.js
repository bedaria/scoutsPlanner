import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { toInvite } from '../actions/invites'
import { getMyEvent } from '../actions/myEvents'

class EventListContainer extends Component {

  inviteClick = (event) => {
    this.props.toInvite(event.target.id)
  }

  myEventClick = (event) => {
    this.props.getMyEvent(event.target.id)
  }

  render = () => {
    if(this.props.invites.length && this.props.onInvites)
      return (
        <div> {
          this.props.redirectToInvite ?
          <Redirect push to={`/invites/${this.props.redirectToInviteId}`} /> : <div></div> }
          <InviteList invites={this.props.invites} eventHandler={this.inviteClick} />
        </div>
      )
    else if(this.props.myEvents.length && !this.props.onInvites)
      return (
        <div> {
          this.props.redirectToEvent ?
          <Redirect push to={`/events/${this.props.redirectToEventId}`} /> : <div></div>}
          <EventList events={this.props.myEvents} eventHandler={this.myEventClick} />
        </div>
      )
    else if(this.props.fetchingInvites || this.props.fetchingMyEvents)
      return <div className="eventButtons"> Loading... </div>
    else
      return <div className="eventButtons"> None ... </div>
  }
}

const EventList = ({events, eventHandler}) => (
  <div className="eventButtons">
    {
      events.map(event => (
        <button key={event.id} id={event.id} onClick={eventHandler}>
          {event.name}
        </button>)
      )
    }
  </div>
)

const InviteList = ({invites, eventHandler}) => (
  <div className="eventButtons">
    {
      invites.map(invite => (
        <button key={invite.id} id={invite.id} onClick={eventHandler}>
          {invite.name} | {invite.isAttending || "Please answer"}
        </button>
      ))
    }
  </div>
)

const mapStateToProps = ({invites, myEvents, tabs}) => {
  return {
    invites: invites.inviteButtons,
    myEvents: myEvents.myEvents,
    fetchingMyEvents: myEvents.isFetching,
    fetchingInvites: invites.isFetching,
    onInvites: tabs.onInvites,
    redirectToInvite: invites.redirect,
    redirectToInviteId: invites.redirectToId,
    redirectToEvent: myEvents.redirectToEvent,
    redirectToEventId: myEvents.redirectToId
  }
}

export default connect(
  mapStateToProps,
  { toInvite, getMyEvent }
)(EventListContainer)
