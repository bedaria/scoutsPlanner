import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getEvents } from '../actions/events'
import { Tabs, Tab } from 'react-bootstrap'
import { EventList } from '../components/EventList'

class EventListContainer extends Component {
 componentWillMount = () => {
   this.props.getEvents()
 }

  render = () => {
    const { errorFetchingEvents, isFetchingEvents } = this.props
    const { events, adminEvents, invites } = this.props

    if(isFetchingEvents)
      return showErrorMessageOrLoader("loader")
    else if(errorFetchingEvents)
      return showErrorMessageOrLoader("error", "You have no events!")
    else
      return (
        <Tabs className="eventsSidebar" id="events" defaultActiveKey={1}>
          <div className="sort">
            Sort by date: ascending descending
          </div>
          <Tab eventKey={1} title="All">
              { events.length ? <EventList events={events}/> : "You have no events!"}
          </Tab>
          <Tab eventKey={2} title="Admin">
             { invites.length ? <EventList events={adminEvents} /> : "You're not an admin of any events!"}
          </Tab>
          <Tab eventKey={3} title="Invites">
              { adminEvents.length ? <EventList events={invites} /> : "You have no invites!"}
          </Tab>
        </Tabs>
    )
  }
}

//type: "error" or "loader", message: string
const showErrorMessageOrLoader = (type, message) => (
  <Tabs className="eventsSidebar" id="events" defaultActiveKey={1}>
    <Tab eventKey={1} title="All" >
      {
        type === "error" ?
        <span> {message} </span> :
        <div className="loader" />
      }
    </Tab>
    <Tab eventKey={2} title="Admin"/>
    <Tab eventKey={3} title="Invites"/>
  </Tabs>
)

const mapStateToProps = ({events}) => {
  return {
    events: events.events,
    isFetchingEvents: events.isFetching,
    errorFetchingEvents: events.errorFetching,
    invites: events.invites,
    adminEvents: events.adminEvents
  }
}

export default connect(
  mapStateToProps,
  { getEvents }
)(EventListContainer)
