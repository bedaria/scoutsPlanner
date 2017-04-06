import React, { Component } from 'react'
import SelectMultiple from './SelectMultiple'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class NewEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: '',
      message: '',
      sendTo: [],
      friends: [],
      redirect: false,
      redirectTo: ''
    }
  }

  componentDidMount = () => {
    axios.get('/users/admin/')
      .then(res => {
        if(res.data.users) {
          const friends = res.data.users.map(friend => ({name: friend.name, id: friend.id}))
          this.setState({friends: friends, sendTo: friends})
        }
        else
          this.setState({friends: [{label: "No friends found", value: null}]})
      })
      .catch(err => {
        console.log('Error: ', err)
      })
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
    this.setState({redirect: true, redirectTo: '/profile'})
    console.log("You're about to send to: ", this.state.sendTo)
    console.log("Hey ", this.state.eventName, " is coming up!")
    console.log("Some Notes: ", this.state.message)
    event.preventDefault()
  }

  render() {
    if(this.state.redirect)
     return <Redirect to='/profile'/>

    if(this.state.friends.length){
      console.log("sending: ", this.state.friends)
      return (
        <div className="container">
          <div className="item">
          <div> Create Event </div>
          <div> Sending to: All </div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" id="eventName" placeholder="Event Name: " value={this.state.eventName} onChange={this.handleChange} />
              <input type="text" placeholder="Names will go here: "/>
              <input type="text" id="message" placeholder="Add message: " value={this.state.message} onChange={this.handleChange} />
              <input className="button" type="submit" value="Create Event"/>
            </form>
          </div>
        </div>
      )}
    else {
      return (
        <div className="container">
          <div className="item">
          <div> Create Event </div>
          <div> Waiting... </div>
          </div>
        </div>
      )
    }
  }
}
