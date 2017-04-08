import React, { Component } from 'react'
import { Answer } from './Answer'

export default class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attending: "Yes",
      startTime: '06:00',
      endTime: '17:30',
      entireEvent: true,
      isAttending: props.event.EventVolunteer.isAttending,
      eventId: props.event.id
    }
  }

  handleOptionChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  toggleRadioButton = (event) => {
    this.setState({entireEvent: !this.state.entireEvent})
  }

  submitAnswer = (event) => {
    event.preventDefault()
    this.setState({isAttending: this.state.attending})
    if(this.state.entireEvent)
      console.log("updating info: entire time + ", this.state.attending)
    else
      console.log("updating info: ", this.state.startTime, this.state.endTime, this.state.attending)
  }

  showAnswer = () => {
    if(this.state.isAttending !== null)
      return (
        <div>
          <label>
            Attending ?
            <button> {this.state.isAttending} </button>
          </label>
          <div>
            <button> {this.state.startTime}-{this.state.endTime}</button>
          </div>
        </div>
      )
    else
      return (
        <div>
          <Answer
            handleOptionChange={this.handleOptionChange}
            toggleRadioButton={this.toggleRadioButton}
            entireEvent = {this.state.entireEvent}
            attending={this.state.attending}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            submitAnswer={this.submitAnswer} />
        </div>
      )
  }

  render() {
    return (
        <div>
          <div>{this.props.event.name}<button className="close" onClick={this.props.closeEvent}>X</button></div>
          <hr/>
          <div> When: {this.props.event.startDates}</div>
          <div> Where: Somewhere </div>
          <div> What time: {this.props.event.startTime} - {this.props.event.endTime}</div>
          {this.showAnswer(this.props.event)}
        </div>
    )
  }

}
