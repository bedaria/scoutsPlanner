import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NewEventForm from './NewEventForm'
import { createEvent, resetRedirect } from '../actions/newEvent'
import { fetchFriends } from '../actions/friends'
import { Grid, Row, Col } from 'react-bootstrap'

class NewEventContainer extends Component {
  componentWillMount = () => {
    this.props.fetchFriends()
  }

  render = () => {
    const { friends, isFetchingFriends, errorFetchingFriends } = this.props
    const { createEvent, errorCreatingEvent, isSubmittingEvent } = this.props

    return (
      <div>
        <Row>
          <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
            { isFetchingFriends || isSubmittingEvent ? <div className="loader" /> : null }
            { errorFetchingFriends ? <div> Error fetching friends, please reload... </div> : null }
            { errorCreatingEvent ? <div> Error creating event, please resubmit </div> : null }
          </Col>
        </Row>
        <Row>
          <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
            <h1 style={{'textAlign':'center'}}> New Event </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
            <NewEventForm friends={friends}
                          onSubmit={(eventInfo) => createEvent(eventInfo, friends)}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({newEvent, friends}) => {
  return {
    isSubmittingEvent: newEvent.isSubmitting,
    errorCreatingEvent: newEvent.errorCreating,
    friends: friends.friends,
    isFetchingFriends: friends.isFetching,
    errorFetchingFriends: friends.errorFetching
  }
}

export default connect(
  mapStateToProps,
  { createEvent,
    fetchFriends }
)(NewEventContainer)
