import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button, Well } from 'react-bootstrap'

class InviteContainer extends Component {
  handleClick = (buttonEvent) => {
    console.log("click click: ", this.props)
    // props.history.push(`/events/${buttonEvent.target.id}/answer`)
  }

  render = () => {
    const { eventsById, isFetchingEvent } = this.props
    let event = Object.keys(eventsById).length ?
      eventsById[this.props.match.params.event] : {}

    return (
      <div className="event">
        {isFetchingEvent ? <div className="loader" /> : null}
        {
          !event.name ?
          <div> Event does not exist </div> :
          <Panel bsStyle="info" header={event.name}>
            <Well> Dates:
              {new Date(event.startDateTime).toLocaleDateString()}
              {
                event.endDateTime !== event.startDateTime ?
                "-" + new Date(event.endDateTime).toLocaleDateString(): ""
              }
            </Well>
            <Well>
              Tasks: tasks coming right up...
            </Well>
            <Well>
              Location: Coming up...
            </Well>
            <Button bsStyle="primary" id={event.id} onClick={this.handleClick} block>
              Your answer: {event.answer ? event.answer : "Please answer"}
            </Button>
          </Panel>
        }
        </div>
      )
    }
  }

const mapStateToProps = ({events: { eventsById, isFetching }}) => {
  return { eventsById, isFetchingEvent: isFetching }
}

export default connect(
  mapStateToProps,
  null
)(InviteContainer)
