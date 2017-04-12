import React, { Component } from 'react'
import { Event } from './Event'

export default class EventButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonInfo: '',
      isAttending: this.props.volunteerInfo.isAttending
    }
  }

  updateAttendance = (buttonInfo) => {
    this.setState({isAttending: buttonInfo.isAttending})
  }

  render() {
    const eventInfo = this.props.eventInfo
    const volunteerInfo = this.props.volunteerInfo
    const notAnswered = eventInfo.name + "(Not answered yet)"
    const answered = eventInfo.name + " (" + this.state.isAttending + ")"

    return (
      <div>
        <button onClick={this.props.openEventInfo} id={eventInfo.id}>{this.state.isAttending ? answered: notAnswered } </button>
        <Event openId={this.props.openEventId}
               volunteerInfo={volunteerInfo}
               eventInfo={eventInfo}
               updateAttendance={this.updateAttendance}/>
      </div>
    )
  }
}
