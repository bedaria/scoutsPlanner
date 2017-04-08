import React, {Component} from 'react'

export default class Answer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attending: "Yes",
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      entireEvent: true
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
    const attendanceInfo = {
      isAttending: this.state.attending,
      volunteerFrom: this.state.startTime,
      volunteerTill: this.state.endTime
    }
    this.props.updateAttendance(attendanceInfo)

  }

  render() {
    return (
        <div>
        <hr/>
        <button onClick={this.props.closeAnswer}>Close</button>
          <form onSubmit={this.submitAnswer}>
            <div> Will you attend? </div>
            <div>
              <label>
                <input type="radio" value="Yes" checked={"Yes" === this.state.attending} onChange={this.handleOptionChange} />
                Yes
              </label>
              <label>
                <input type="radio" value="Maybe" checked={"Maybe" === this.state.attending} onChange={this.handleOptionChange} />
                Maybe
              </label>
              <label>
                <input type="radio" value="No" checked={"No" === this.state.attending} onChange={this.handleOptionChange} />
                No
              </label>
            </div>
            <label>
              <input type="radio" id="entireEvent" value="entireEvent" checked={this.state.entireEvent} onChange={this.toggleRadioButton}/>
               Entire Event
            </label>
            <label>
              Start time:
              <input type="time" id="startTime" value={this.state.startTime} onChange={this.handleOptionChange} disabled={this.state.entireEvent} required />
            </label>
            <label>
              End time:
              <input type="time" id="endTime" value={this.state.endTime} onChange={this.handleOptionChange} disabled={this.state.entireEvent} required />
            </label>
            <input type="submit" />
          </form>
        </div>
      )
  }
}


/*  constructor(props) {
    super(props)
    this.state = {
      attending: "Yes",
      startTime: '06:00',
      endTime: '17:30',
      entireEvent: true,
      isAttending: this.props.eventInfo.EventVolunteer.isAttending,
      eventId: this.props.eventInfo.id
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
*/
