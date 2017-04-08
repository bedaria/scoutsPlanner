import React, { Component } from 'react'
import EventInfo from './EventInfo'

export default class Event extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAttending: this.props.volunteerInfo.isAttending,
      eventInfo: this.props.eventInfo,
      volunteerFrom: this.props.volunteerInfo.volunteerFrom,
      vlunteerTill: this.props.volunteerInfo.volunteerTill,
      open: false
    }
  }

  openEventInfo = (event) => {
    this.setState({open: !this.state.open})
  }

  updateAttendance = (attendanceInfo) => {
    this.setState({isAttending: attendanceInfo.isAttending,
      volunteerFrom: attendanceInfo.volunteerFrom,
      volunteerTill: attendanceInfo.volunteerTill
    })
  }

  showEventInfo = () => {
    if(this.state.open)
      return <EventInfo isAttending={this.state.isAttending}
                        eventInfo={this.state.eventInfo}
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
      <div>
        <button onClick={this.openEventInfo}> {this.state.isAttending ? answered: notAnswered } </button>
        {this.showEventInfo()}
      </div>
    )
  }

}
