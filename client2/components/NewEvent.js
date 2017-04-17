import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SelectMultiple  from './SelectMultiple'
import Tasks from './Tasks'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

export default class NewEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      tasks: [],
      message: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      sameDayEvent: false,
      selectedUsers: []
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createEvent(this.props.friends)
  }

  toggleRadioButton = (event) => {
    const endDate = this.state.sameDayEvent ? '' : this.state.startDate
    this.setState({sameDayEvent: !this.state.sameDayEvent, endDate: endDate})
  }

  getSelectedUsers = (selectedUsers) =>  {
    this.setState({selectedUsers})
  }

  getTasks = (tasks) => {
    this.setState({tasks: tasks})
  }

  render() {
    if(this.props.redirect) {
      this.props.resetRedirect()
      return <Redirect push to='/'/>
    }
    else if(this.props.errorCreating)
      return <div> Try again... </div>
    else
      return (
          <div className="form">
          <div> Create Event </div>
            <form onSubmit={this.handleSubmit} id="eventInfo">
              <input type="text" id="name" placeholder="Event Name: " value={this.state.name} onChange={this.handleChange}  />
              <SelectMultiple getSelectedUsers={this.getSelectedUsers}
                              friends={this.props.friends}/>
              <Tasks tasks={this.state.tasks} getTasks={this.getTasks}/>
              <textarea id="message" placeholder="Add message (optional): " value={this.state.message} onChange={this.handleChange} form="eventInfo" />
              <label>
                Start date:
                <input type="text" placeholder="Start date: " value={this.state.startDate} id="startDate"
                            onChange={this.handleChange} />
              </label>
              <label>
                End date:
                <input type="text" placeholder="End date: " value={this.state.endDate} id="endDate"
                          disabled={this.state.sameDayEvent}   />
              </label>
              <label>
                <input type="radio" id="sameDay" value="sameDayEvent" checked={this.state.sameDayEvent} onChange={this.toggleRadioButton}/>
                 Same day event
              </label>
              <label>
                Start time:
                <input type="time" placeholder="00:00 PM" id="startTime" value={this.state.startTime} onChange={this.handleChange}  />
              </label>
              <label>
                End time:
                <input type="time" placeholder="00:00 PM" id="endTime" min={this.state.sameDayEvent? this.state.startTime:''} value={this.state.endTime} onChange={this.handleChange}  />
              </label>
              <input className="button" type="submit" value="Send Event"/>
            </form>
        </div>
      )
  }
}
