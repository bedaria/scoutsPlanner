import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReplyForm from './ReplyForm'
import { Row, Col } from 'react-bootstrap'

class ReplyContainer extends Component {

  render = () => {
    const { eventsById } = this.props
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
                      onSubmit={(info) => {console.log("info: ", info)}}/>
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
  null
)(ReplyContainer)
