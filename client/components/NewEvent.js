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
      selectedUsers: []
    }
  }

  showErrorMessage = () => {
    if(this.state.errorMessage)
      return <div className="red"> Sorry: {this.state.errorMessage} </div>
    else
      return <div> All good. </div>
  }

  //check this, still redirects even if no one was invited
  whenDone = (message) => {
    if(message === "success")
      this.setState({redirect: true})
    else
      this.setState({errorMessage: "Error creating event: " + message})
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if(this.validateTimeDateRange())
      createEventAndInvite(this.state, this.whenDone)
    else
      this.setState({errorMessage: 'Invalid times'})
  }

  validateTimeDateRange = () => {
    const startTime = this.state.startTime.split(":").map(timePart => Number(timePart))
    const endTime = this.state.endTime.split(":").map(timePart => Number(timePart))
    const [startHour, startMinutes] = startTime
    const [endHour, endMinutes] = endTime

    if(this.state.sameDayEvent)
      return (startHour < endHour) || (startHour === endHour && startMinutes < endMinutes)
    else
      return true
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
          <div> Sending to: All </div>
            <form onSubmit={this.handleSubmit} id="eventInfo">
              <input type="text" id="name" placeholder="Event Name: " value={this.state.name} onChange={this.handleChange} required />
              <SelectMultiple getSelectedUsers={this.getSelectedUsers}/>
              <textarea id="message" placeholder="Add message (optional): " value={this.state.message} onChange={this.handleChange} form="eventInfo" />
              <label>
                Start date:
                <input type="date" id="startDate" min={getToday()} value={this.state.startDate} onChange={this.handleChange} required />
              </label>
              <label>
                End date:
                <input type="date" id="endDate" min={getTomorrow()} value={this.state.endDate} onChange={this.handleChange} disabled={this.state.sameDayEvent} required />
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
                <input type="time" id="endTime" value={this.state.endTime} onChange={this.handleChange} required />
              </label>
              <input className="button" type="submit" value="Send Event"/>
            </form>
        </div>
      )
    }
  }
}

const getToday = () => {
  const today = new Date()
  return getYYYYMMDD(today)
}

const getTomorrow = () => {
  const today = new Date()
  const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
  return getYYYYMMDD(tomorrow)
}

const getYYYYMMDD = (date) => {
  const yyyy = date.getFullYear().toString()
  const month = (date.getMonth() + 1)
  const mm = month > 9 ? month.toString() : '0' + month.toString()
  const day = date.getDate()
  const dd = day > 9 ? day.toString() : '0' + day.toString()

  return yyyy + "-" + mm + "-" + dd
}
