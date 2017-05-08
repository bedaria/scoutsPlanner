import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReplyForm from './ReplyForm'
import { Row, Col } from 'react-bootstrap'
import { replyToEvent } from '../actions/reply'

class ReplyContainer extends Component {

  render = () => {
    const { eventsById, replyToEvent } = this.props
    let event = eventsById[this.props.match.params.event]

    if(!Object.keys(eventsById).length)
      return <div className="laoder"/>
    else if(!event)
      return <div> Event not found. </div>
    return (
      <div className="event">
        <Row>
          <Col md={8} mdOffset={2}>
            <h1> Reply to '{event.name}'</h1>
            <ReplyForm event={event}
              onSubmit={(info) => {
                const reply = {}
                reply.isAttending = info.isAttending

                if(info.isAttending === 'Yes')
                  reply.volunteerTasks = info.volunteerTasks.filter(task => task.volunteering)
                    .map(task => {
                      const { volunteerStartDateTime, volunteerEndDateTime, id } = task
                      return {
                        volunteerStartDateTime,
                        volunteerEndDateTime,
                        id
                      }
                    })

                replyToEvent(reply, event.id)
              }}/>
          </Col>
        </Row>
       </div>
     )
  }
}

const mapStateToProps = ({ events: { eventsById }}) => {
  return { eventsById }
}

export default connect(
  mapStateToProps,
  { replyToEvent }
)(ReplyContainer)
