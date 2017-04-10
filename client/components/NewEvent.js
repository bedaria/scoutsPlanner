import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { createEventAndInvite, getUsers } from '../helpers'
import { SelectMultiple }  from './SelectMultiple'

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
      sendTo: [],
      redirect: false,
      redirectTo: '',
      valid: true,
      sameDayEvent: false,
      errorMessage: '',
      users: [],
      selectedUsers: [],
      selected: 'All'
    }
  }

  componentWillMount = () => {
    getUsers(this.updateUsers)
  }

  updateUsers = (data) => {
    if(data.error)
      this.setState({errorMessage: data.error})
    else
      this.setState({users: data.users})
  }

  deleteFromSelected = (event) => {
    event.preventDefault()
    var selectedUsers = this.state.selectedUsers.slice()
    const idx = selectedUsers.indexOf(event.target.id)
    selectedUsers = selectedUsers.slice(0,idx).concat(selectedUsers.slice(idx+1))
    this.setState({selectedUsers})
  }

  addToSelected = (event) => {
    const selectedUsers = this.state.selectedUsers.slice()
    const found = selectedUsers.reduce((found, user) => (
      found || user === event.target.value
    ), false)

    if(!found){
      selectedUsers.push(event.target.value)
      this.setState({selectedUsers})
    }
  }

  showErrorMessage = () => {
    if(this.state.errorMessage)
      return <div className="red"> Sorry: {this.state.errorMessage} </div>
    else
      return <div> All good. </div>
  }

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

  getToday = () => {
    const today = new Date()
    return this.getYYYYMMDD(today)
  }

  getTomorrow = () => {
    const today = new Date()
    const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    return this.getYYYYMMDD(tomorrow)
  }

  getYYYYMMDD = (date) => {
    const yyyy = date.getFullYear().toString()
    const month = (date.getMonth() + 1)
    const mm = month > 9 ? month.toString() : '0' + month.toString()
    const day = date.getDate()
    const dd = day > 9 ? day.toString() : '0' + day.toString()

    return yyyy + "-" + mm + "-" + dd
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
              <SelectMultiple selectedUsers={this.state.selectedUsers}
                              users={this.state.users}
                              addToSelected={this.addToSelected}
                              selected={this.state.selected}
                              deleteFromSelected={this.deleteFromSelected} />
              <textarea id="message" placeholder="Add message (optional): " value={this.state.message} onChange={this.handleChange} form="eventInfo" />
              <label>
                Start date:
                <input type="date" id="startDate" min={this.getToday()} value={this.state.startDate} onChange={this.handleChange} required />
              </label>
              <label>
                End date:
                <input type="date" id="endDate" min={this.getTomorrow()} value={this.state.endDate} onChange={this.handleChange} disabled={this.state.sameDayEvent} required />
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
