import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { createEventAndInvite } from '../helpers'
import SelectMultiple  from './SelectMultiple'
import Tasks from './Tasks'
import DatePicker from 'react-datepicker'
import moment from 'moment'
require('react-datepicker/dist/react-datepicker.css')

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
      redirect: false,
      sameDayEvent: false,
      errorMessage: '',
      selectedUsers: []
    }
  }

  showErrorMessage = () => {
    if(this.state.errorMessage)
      return <div className="red"> Sorry: {this.state.errorMessage} </div>
    else
      return <div></div>
  }

  done = (data) => {
    if(data.errorMessage)
      this.setState({errorMessage: data.errorMessage})
    else
      this.setState({redirect: true})
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    createEventAndInvite(this.state, this.done)
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

  handleStartChange = (startDate) => {
    this.setState({startDate})
  }

  handleEndChange = (endDate) => {
    this.setState({endDate})
  }

  render() {
    if(this.state.redirect)
     return <Redirect push to='/profile'/>
    else {
      return (
          <div>
          {this.showErrorMessage()}
          <div> Create Event </div>
            <form onSubmit={this.handleSubmit} id="eventInfo">
              <input type="text" id="name" placeholder="Event Name: " value={this.state.name} onChange={this.handleChange} required />
              <SelectMultiple getSelectedUsers={this.getSelectedUsers}/>
              <Tasks tasks={this.state.tasks} getTasks={this.getTasks}/>
              <textarea id="message" placeholder="Add message (optional): " value={this.state.message} onChange={this.handleChange} form="eventInfo" />
              <label>
                Start date:
                <DatePicker selected={this.state.startDate} selectsStart
                            startDate={this.state.startDate} endDate={this.state.endDate}
                            onChange={this.handleStartChange} placeholderText="Click to pick date"
                            todayButton={"Vandaag"} minDate={moment()} required/>
              </label>
              <label>
                End date:
                <DatePicker selected={this.state.endDate} selectsEnd
                            startDate={this.state.startDate} endDate={this.state.endDate}
                            onChange={this.handleEndChange} placeholderText="Click to pick date"
                            disabled={this.state.sameDayEvent} todayButton={"Vandaag"}
                            minDate={moment().add(1,"days")} required={!this.state.sameDayEvent}/>
              </label>
              <label>
                <input type="radio" id="sameDay" value="sameDayEvent" checked={this.state.sameDayEvent} onChange={this.toggleRadioButton}/>
                 Same day event
              </label>
              <label>
                Start time:
                <input type="time" placeholder="00:00 PM" id="startTime" value={this.state.startTime} onChange={this.handleChange} required />
              </label>
              <label>
                End time:
                <input type="time" placeholder="00:00 PM" id="endTime" min={this.state.sameDayEvent? this.state.startTime:''} value={this.state.endTime} onChange={this.handleChange} required />
              </label>
              <input className="button" type="submit" value="Send Event"/>
            </form>
        </div>
      )
    }
  }
}
