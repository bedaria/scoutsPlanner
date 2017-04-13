import React, { Component } from 'react'
import { updateInvite } from '../helpers.js'

export default class Answer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attending: "Yes",
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      entireEvent: true,
      taskId: ''
    }
  }

  handleOptionChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  toggleRadioButton = (event) => {
    this.setState({entireEvent: !this.state.entireEvent})
  }

  changeVolunteerTask = (event) => {
    this.setState({taskId: event.target.value})
  }

  submitAnswer = (event) => {
    event.preventDefault()
    const startTime = this.state.attending === "Yes" || this.state.entireEvent ? this.state.startTime : null
    const endTime = this.state.attending === "Yes" || this.state.entireEvent ? this.state.endTime : null

    const attendanceInfo = {
      isAttending: this.state.attending,
      taskId: this.state.taskId ? this.state.taskId : '',
      startTime,
      endTime,
    }

    updateInvite(attendanceInfo, this.props.eventId,
        this.props.updateAttendance, this.props.closeAnswer)
  }

  render() {
    return (
        <div>
        <hr/>
        <button onClick={this.props.closeAnswer}>Close</button>
          <form id="answer" onSubmit={this.submitAnswer}>
            <div> Will you attend? </div>
            <div>
              <label>
                <input id="attending" type="radio" value="Yes" checked={"Yes" === this.state.attending} onChange={this.handleOptionChange} />
                Yes
              </label>
              <label>
                <input id="attending" type="radio" value="Maybe" checked={"Maybe" === this.state.attending} onChange={this.handleOptionChange} />
                Maybe
              </label>
              <label>
                <input id="attending" type="radio" value="No" checked={"No" === this.state.attending} onChange={this.handleOptionChange} />
                No
              </label>
            </div>
            {
              this.props.tasks.length ? (<Select taskId={this.state.taskId}
                        changeVolunteerTask={this.changeVolunteerTask}
                        tasks={this.props.tasks} />) : (null)
            }
            <label>
              <input type="radio" id="entireEvent" value="entireEvent" checked={this.state.entireEvent} disabled={this.state.attending !== "Yes"} onChange={this.toggleRadioButton}/>
               Entire Event
            </label>
            <label>
              Start time:
              <input type="time" id="startTime" value={this.state.startTime} min={this.props.startTime}
                      max={this.props.endTime} onChange={this.handleOptionChange} disabled={this.state.entireEvent || this.state.attending !== "Yes"} required />
            </label>
            <label>
              End time:
              <input type="time" id="endTime" value={this.state.endTime} min={this.state.startTime}
                     max={this.props.endTime} onChange={this.handleOptionChange} disabled={this.state.entireEvent || this.state.attending !== "Yes"} required />
            </label>
            <input type="submit" />
          </form>
        </div>
      )
  }
}

const Select = ({tasks, taskId, changeVolunteerTask}) => (
  <label>
    What can you help with?
    <select value={taskId} onChange={changeVolunteerTask} form="answer">
      <option> None </option>
      {tasks.map(task => <option value={task.id}>{task.name}</option>)}
    </select>
  </label>
)
