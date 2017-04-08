import React, { Component } from 'react'
import Answer from './Answer'

export default class EventInfo  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAnswerOpen: false
    }
  }

  openAnswer = () => {
    this.setState({isAnswerOpen: !this.state.isAnswerOpen})
  }

  closeAnswer = () => {
    this.setState({isAnswerOpen: false})
  }

  showAnswer = () => {
    const attendingTime = this.props.volunteerFrom + "-" + this.props.volunteerTill
    const attendingInfo = "You are a" + this.props.isAttending + ": " + attendingTime
    const notAnswered = "Please Answer"

    if(this.state.isAnswerOpen)
      return <Answer startTime={this.props.eventInfo.startTime}
          endTime={this.props.eventInfo.endTime}
          updateAttendance={this.props.updateAttendance}
          closeAnswer={this.openAnswer}/>
    else
      return <button onClick={this.openAnswer}> {this.props.isAttending ? attendingInfo: notAnswered} </button>
  }


  render() {
      return (
        <div>
        <hr/>
          <div> Date: {this.props.eventInfo.startDate }</div>
          <div> Time: {this.props.eventInfo.startTime} - {this.props.eventInfo.endTime}</div>
          {this.showAnswer()}
        </div>
      )
  }
}
