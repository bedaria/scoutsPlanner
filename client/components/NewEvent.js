import React, { Component } from 'react'

export default class NewEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: '',
      message: '',
      sendTo: ''
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
    console.log("You're about to send to: ", this.state.sendTo)
    console.log("Hey ", this.state.eventName, " is coming up!")
    console.log("Will you be attending? Yes/No ")
    console.log("Some Notes: ", this.state.message)
    event.preventDefault()
  }

  render() {
    return (
      <div className="container">
        <div className="item">
        <span> Create Event </span>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="eventName" placeholder="Event Name: " value={this.state.eventName} onChange={this.handleChange} />
            <input type="text" id="sendTo" placeholder="Send to: " value={this.state.sendTo} onChange={this.handleChange} />
            <input type="text" id="message" placeholder="Add message: " value={this.state.message} onChange={this.handleChange} />
            <input className="button" type="submit" value="Create Event"/>
          </form>
        </div>
      </div>
    )
  }
}
