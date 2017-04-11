import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { createEventAndInvite } from '../helpers'
import SelectMultiple  from './SelectMultiple'

export default class NewEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      message: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      redirect: false,
      sameDayEvent: false,
      errorMessage: '',
      selectedUsers: [],
      successMessage: '',
      today: (new Date()).toISOString().slice(0,10),
      tomorrow: (new Date(new Date().getTime() + (24 * 60 * 60 * 1000))).toISOString().slice(0,10)
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
              <textarea id="message" placeholder="Add message (optional): " value={this.state.message} onChange={this.handleChange} form="eventInfo" />
              <label>
                Start date:
                <input type="date" id="startDate" min={this.state.today} value={this.state.startDate} onChange={this.handleChange} required />
              </label>
              <label>
                End date:
                <input type="date" id="endDate" min={this.state.tomorrow} value={this.state.endDate} onChange={this.handleChange} disabled={this.state.sameDayEvent} required />
              </label>
              <label>
                <input type="radio" id="sameDay" value="sameDayEvent" checked={this.state.sameDayEvent} onChange={this.toggleRadioButton}/>
                 Same day event
              </label>
              <label>
                Start time:
                <input type="time" id="startTime" value={this.state.startTime} onChange={this.handleChange} required />
              </label>
              <label>
                End time:
                <input type="time" id="endTime" min={this.state.sameDayEvent? this.state.startTime:''} value={this.state.endTime} onChange={this.handleChange} required />
              </label>
              <input className="button" type="submit" value="Send Event"/>
            </form>
        </div>
      )
    }
  }
}
