import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getEvents } from '../actions/events'
import { Row, Col, ListGroup, ListGroupItem, Button, Tabs, Tab } from 'react-bootstrap'

class EventListContainer extends Component {
 componentWillMount = () => {
   this.props.getEvents()
 }

  render = () => {
    const {errorFetchingEvents, isFetchingEvents, events} = this.props
    return (
      <div className="eventsSidebar">
        <Tabs defaultActiveKey={1} style={{borderRight: "1px solid #ddd", overflowY:"scroll", overflowX: "hidden"}}>
          <Tab eventKey={1} title="All">
              <div className="sort">
                Sort by date: ascending descending
              </div>
              { errorFetchingEvents ? <span> An error occurred getting events..hold on </span>:null }
              { isFetchingEvents ? <div className="loader"/>: null}
              { events.length ? <EventList events={events} /> : "You have no events!"}
          </Tab>
          <Tab eventKey={2} title="Admin">
            <div className="sort">
              Sort by date: ascending descending
            </div>
             { errorFetchingEvents ? <span> An error occurred getting events..hold on </span>:null }
             { isFetchingEvents ? <div className="loader"/>: null}
             { events.length ? <EventList events={events} /> : "You have no events!"}
          </Tab>
          <Tab eventKey={3} title="Invites">
            <div className="sort">
              Sort by date: ascending descending
            </div>
              { errorFetchingEvents ? <span> An error occurred getting events..hold on </span>:null }
              { isFetchingEvents ? <div className="loader"/>: null}
              { events.length ? <EventList events={events} /> : "You have no events!"}
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const EventList = ({events}) => (
  <div>
  <ListGroup>
  {
    events.map(event => (
      <ListGroupItem>
        {event.name}
        <Link key={event.id}
              to={`/events/${event.id}`}>
         <span className="right">{event.isAdmin ? "Admin" : event.isAttending || "Please answer" } </span>
        </Link>
      </ListGroupItem>
    ))
  }
  </ListGroup>
  </div>
)

// const EventList = ({events}) => {
//   var currentTime = new Date(events[0].startDateTime).toLocaleDateString()
//   var start = <Panel collapsible defaultExpanded header={currentTime} />
//
// }
/*
<Panel collapsible defaultExpanded header="Panel heading">
    Some default panel content here.
    <ListGroup fill>
      <ListGroupItem>Item 1</ListGroupItem>
      <ListGroupItem>Item 2</ListGroupItem>
      <ListGroupItem>&hellip;</ListGroupItem>
    </ListGroup>
    Some more panel content here.
  </Panel>
);
*/

//id, name, message: isAdmin/isAttending
const mapStateToProps = ({events}) => {
  return {
    events: events.events,
    isFetchingEvents: events.isFetching,
    errorFetchingEvents: events.errorFetching
  }
}

export default connect(
  mapStateToProps,
  { getEvents }
)(EventListContainer)
