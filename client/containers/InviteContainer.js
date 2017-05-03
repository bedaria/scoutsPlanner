import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, PanelGroup, Button, Well } from 'react-bootstrap'

class InviteContainer extends Component {
  handleClick = () => {
    this.props.history.push(`/events/${this.props.match.params.event}/reply`)
  }

  render = () => {
    const { eventsById } = this.props
    let event = eventsById[this.props.match.params.event]

    if(!Object.keys(eventsById).length)
      return <div className="loader"/>
    else if(!event)
      return <div> Event not found. </div>
    else {
      return (
        <div className = "event" >
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
            <Button bsStyle="primary" onClick={this.handleClick} block>
              {event.answer ? "Your answer: " + event.answer : "You have yet to volunteer!"}
            </Button>
          </Panel>
        </div>
      )
    }
  }
}

s

const mapStateToProps = ({events: { eventsById }}) => {
  return { eventsById }
}

export default connect(
  mapStateToProps,
  null
)(InviteContainer)
