import React, { Component } from 'react'
import Answer from './Answer'
import { getEventTasks } from '../helpers.js'

export default class AnswerWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      tasks: []
    }
  }

  getTasks = (tasks, error) => {
    if(error) {
      console.log("try getting tasks again")
    }
    else
      this.setState({tasks})
  }

  componentWillMount = () => {
    getEventTasks(this.props.eventId, this.getTasks)
  }

  openOrCloseAnswer = (error) => {
    if(error)
      console.log("openORclose: ", error)
    else
      this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const attendingTime = this.props.volunteeringFrom + "-" + this.props.volunteeringTill
    const message = (this.props.isAttending === "Yes" ? ": "+ attendingTime : '')
    const attendingInfo = "You are a " + this.props.isAttending + message
    const notAnswered = "Please Answer"

    if(this.state.isOpen)
      return <Answer
              isOpen={this.state.isOpen}
              eventId={this.props.eventId}
              startTime={this.props.startTime}
              endTime={this.props.endTime}
              updateAttendance={this.props.updateAttendance}
              closeAnswer={this.openOrCloseAnswer}
              tasks={this.state.tasks} />
    else
      return <button onClick={this.openOrCloseAnswer}> {this.props.isAttending ? attendingInfo: notAnswered} </button>
  }
}
