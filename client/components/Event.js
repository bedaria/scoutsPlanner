import React, { Component } from 'react'
import EventInfo from './EventInfo'
import { updateInvite } from '../helpers'

export default class Event extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAttending: this.props.volunteerInfo.isAttending,
      volunteerFrom: this.props.volunteerInfo.volunteeringFrom,
      volunteerTill: this.props.volunteerInfo.volunteeringTill,
      open: false
    }
  }

  openEventInfo = (event) => {
    if(!this.props.eventSeen)
      updateInvite({seen: true}, this.props.eventInfo.id)

    this.setState({open: !this.state.open})
  }

  updateAttendance = (attendanceInfo) => {
    if(attendanceInfo.error)
      console.log("Show an error message")
    else
      this.setState({isAttending: attendanceInfo.isAttending,
        volunteerFrom: attendanceInfo.volunteerFrom,
        volunteerTill: attendanceInfo.volunteerTill
      })
  }

  showEventInfo = () => {
    if(this.state.open)
      return <EventInfo isAttending={this.state.isAttending}
                        eventInfo={this.props.eventInfo}
                        volunteerFrom={this.state.volunteerFrom}
                        volunteerTill={this.state.volunteerTill}
                        updateAttendance={this.updateAttendance} />
    else
      return <div></div>

  }

  render() {
    const notAnswered = this.props.eventInfo.name + "(Not answered yet)"
    const answered = this.props.eventInfo.name

    return (
      <div className="container">
        <button onClick={this.openEventInfo}> {this.state.isAttending ? answered: notAnswered } </button>
        {this.showEventInfo()}
      </div>
    )
  }
}
