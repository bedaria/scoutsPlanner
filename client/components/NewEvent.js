import React, { Component } from 'react'
import SelectMultiple from './SelectMultiple'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import createEventAndInvite from '../helpers.js'

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
      sameDayEvent: true,
      errorMessage: '',
      invited: [1,3]
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if(this.validateTimeDateRange())
      createEventAndInvite(this.state)
    else
      this.setState({error: true, errorMessage: 'Invalid times'})
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
    this.setState({sameDayEvent: !this.state.sameDayEvent, endDate: ''})
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
        <div className="container">
          <div className="item">
          <div> Create Event </div>
          <div> Sending to: All </div>
            <form onSubmit={this.handleSubmit} id="eventInfo">
              <input type="text" id="name" placeholder="Event Name: " value={this.state.name} onChange={this.handleChange} required />
              <input type="text" placeholder="Frankie, Aidan"/>
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
        </div>
      )
    }
  }
}
