import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getMyEvents } from '../actions/myEvents'

class EventListContainer extends Component {
  componentWillMount = () => {
    this.props.getMyEvents()
  }

  myEventClick = (event) => {
    this.props.getMyEvent(event.target.id)
  }

  render = () => {
    const { myEvents, fetchingMyEvents, errorFetchingMyEvents } = this.props
    return (
      <div>
        { fetchingMyEvents ? "Loading your events....": '' }
        { errorFetchingMyEvents ? "Ooops, please reload... " : '' }
        { myEvents.length ?
           <EventList myEvents={myEvents} myEventClick={this.myEventclick} /> :
           "You haven't created any events..."
        }
      </div>
    )
  }
}

const EventList = ({myEvents, myEventClick}) => (
  <div className="eventButtons">
    {
      myEvents.map(event => (
        <button key={event.id} id={event.id} onClick={myEventClick}>
          {event.name}
        </button>)
      )
    }
  </div>
)

const mapStateToProps = ({invites, myEvents, tabs}) => {
  return {
    myEvents: myEvents.myEvents,
    fetchingMyEvents: myEvents.isFetching,
    errorFetchingMyEvents: myEvents.errorFetching
  }
}

export default connect(
  mapStateToProps,
  { getMyEvents }
)(EventListContainer)
