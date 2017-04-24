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
    const {errorFetchingEvents, isFetchingEvents, events} = this.props
    return (
      <div className="eventsSidebar">
        <Tabs id="events" defaultActiveKey={1} style={{borderRight: "1px solid #ddd", overflowY:"scroll", overflowX: "hidden"}}>
          <Tab eventKey={1} title="All">
              <div className="sort">
                Sort by date: ascending descending
              </div>
              { errorFetchingEvents ? <span> An error occurred getting events..hold on </span>:null }
              { isFetchingEvents ? <div className="loader"/>: null}
              { events.length ? <EventList events={events}/> : "You have no events!"}
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
