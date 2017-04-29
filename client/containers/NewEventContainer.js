import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewEventForm from './NewEventForm'
import { createEvent } from '../actions/newEvent'
import { fetchFriends } from '../actions/friends'
import { Row, Col } from 'react-bootstrap'

class NewEventContainer extends Component {
  componentWillMount = () => {
    this.props.fetchFriends()
  }

  render = () => {
    const { friends, isFetchingFriends, errorFetchingFriends } = this.props
    const { createEvent, errorCreatingEvent, isSubmittingEvent } = this.props

    if(isFetchingFriends)
      return <Loader />
    if(errorFetchingFriends)
      return <ErrorMessage message="Error fetching friends, please reload..." />
    else if(errorCreatingEvent)
      return <ErrorMessage message="Error creating event, please resubmit..." />
    else
      return (
        <div>
          <Row>
            <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
              <h1 style={{'textAlign':'center'}}> New Event </h1>
              {isSubmittingEvent && <Loader />}
            </Col>
          </Row>
          <Row>
            <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
              <NewEventForm
                friends={friends}
                onSubmit={(eventInfo) => {
                  const newEvent = {}
                  const hasAll = eventInfo.invited.reduce((hasAll, current) => {
                    return hasAll || current.name === 'All'
                  }, false)
                  const invited = hasAll ? friends : eventInfo.invited
                  newEvent.invited = invited.map(friend => friend.id)
                  newEvent.address = eventInfo.addr === 'addr' ? eventInfo.address : 'TBD'
                  newEvent.name = eventInfo.name
                  newEvent.startDateTime = eventInfo.startDateTime
                  newEvent.endDateTime = eventInfo.endDateTime
                  newEvent.tasks = eventInfo.tasks.map(task => {
                      task.volunteersNeeded = task.volunteersNeeded ? task.volunteersNeeded : 1
                      return task
                    })

                  createEvent(newEvent)
                }}/>
            </Col>
          </Row>
        </div>
      )
  }
}

//type: "error" or "loader", message: string
const ErrorMessage = (message) => (
  <Row>
    <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
      <div> {message} </div>
    </Col>
  </Row>
)

const Loader = () => (
  <Row>
    <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
      <div className="loader" />
    </Col>
  </Row>
)

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
