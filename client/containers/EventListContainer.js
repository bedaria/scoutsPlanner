import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getEvents } from '../actions/events'
import { Row, Col, ListGroup, ListGroupItem, Button, Tabs, Tab } from 'react-bootstrap'

class EventListContainer extends Component {
 componentWillMount = () => {
   this.props.getEvents()
 }

  render = () => {
    const {errorFetchingEvents, isFetchingEvents, events} = this.props
    return (
      <div>
        <Row>
          <Col xs={4} md={4} >
            <Tabs defaultActiveKey={1} style={{borderRight: "1px solid #ddd"}}>
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
          </Col>
        </Row>
      </div>
    )
  }
}

const EventList = ({events}) => (
  <div>
  {
    events.map(event =>
      <Button key={event.id} id={event.id} bsStyle={event.isAdmin ? "danger" : "primary"}>
       {event.name} <span>{event.isAdmin ? "Admin" : event.isAttending || "Please answer" } </span>
      </Button>)
  }
  </div>
)


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
