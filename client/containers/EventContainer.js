import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doneRedirecting } from '../actions/myEvents'

class EventContainer extends Component {
  componentDidMount = () => {
    this.props.doneRedirecting()
  }

  render = () => {
    return (
      <div className="event">
        <div>
          Answers:
          <button id="yes"> Yes: {this.props.yes.length}</button>
          <button id="no"> No: {this.props.no.length}</button>
          <button id="maybe"> Maybe: {this.props.maybe.length} </button>
          <button id="notAnswered"> Not answered: {this.props.notAnswered.length}</button>
        </div>
        <div>
          <TaskList tasks={this.props.eventTasks} />
        </div>
        <div>
          Invited:
          <Invited eventVolunteers={this.props.eventVolunteers} />
        </div>
      </div>
    )
  }
}

const TaskList = ({tasks}) => {
  return (
    <div className="tasks">
    Tasks:
    {
      tasks.length ?
       tasks.map(task => <button id={task.id}> {task.name}</button>):
       "None"
    }
    </div>
  )
}

const Invited = ({eventVolunteers}) => {
  return (
    <ul>
    {
      eventVolunteers.length ?
       eventVolunteers.map(volunteer => <li id={volunteer.id}> {volunteer.name}</li>):
       "No one was invited"
    }
    </ul>
  )
}

const mapStateToProps = ({myEvents}) => {
  return {
    eventVolunteers: myEvents.eventVolunteers,
    eventTasks: myEvents.eventTasks,
    yes: myEvents.yes,
    no: myEvents.no,
    maybe: myEvents.maybe,
    notAnswered: myEvents.notAnswered
  }
}

export default connect(
  mapStateToProps,
  { doneRedirecting }
)(EventContainer)
