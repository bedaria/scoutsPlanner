import React, { Component } from 'react'
import { Event } from './Event'

export default class EventButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonInfo: '',
      isAttending: this.props.volunteerInfo.isAttending,
      volunteeringFrom: this.props.volunteerInfo.volunteeringFrom,
      volunteeringTill: this.props.volunteerInfo.volunteeringTill
    }
  }

  updateAttendance = (buttonInfo) => {
    this.setState({
      isAttending: buttonInfo.isAttending,
      volunteeringFrom: buttonInfo.volunteeringFrom,
      volunteeringTill: buttonInfo.volunteeringTill,
      volunteeringFor: buttonInfo.volunteeringFor,
    })
  }

  render() {
    const eventInfo = this.props.eventInfo
    const volunteerInfo = this.props.volunteerInfo
    const notAnswered = eventInfo.name + "(Not answered yet)"
    const answered = eventInfo.name + " (" + this.state.isAttending + ")"

    return (
      <div className="container">
        <button onClick={this.props.openEventInfo} id={eventInfo.id}>{this.state.isAttending ? answered : notAnswered} </button>
        <Event openId={this.props.openEventId}
               eventInfo={eventInfo}
               isAttending={this.state.isAttending}
               volunteeringFrom={this.state.volunteeringFrom}
               volunteeringTill={this.state.volunteeringTill}
               updateAttendance={this.updateAttendance}/>
      </div>
    )
  }
}
