import React, { Component } from 'react'
import Answer from './Answer'

export default class AnswerWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  openAnswer = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const attendingTime = this.props.volunteeringFrom + "-" + this.props.volunteeringTill
    const attendingInfo = "You are a " + this.props.isAttending + ": " + attendingTime
    const notAnswered = "Please Answer"

    if(this.state.isOpen)
      return <Answer
              isOpen={this.state.isOpen}
              eventId={this.props.eventId}
              startTime={this.props.startTime}
              endTime={this.props.endTime}
              updateAttendance={this.props.updateAttendance}
              closeAnswer={this.openAnswer}/>
    else
      return <button onClick={this.openAnswer}> {this.props.isAttending ? attendingInfo: notAnswered} </button>
  }
}
