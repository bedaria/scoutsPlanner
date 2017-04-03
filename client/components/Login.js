import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
    this.setState({isLoggedIn: true})
    localStorage.setItem('username', this.state.username)
  }

  render() {
    if(this.state.isLoggedIn)
      return <Redirect to='/events/newEvent'/>

    return (
      <div>
        LOG IN
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="username" placeholder="Enter username: " value={this.state.username} onChange={this.handleChange}/>
          <input type="text" id="password" placeholder="Enter password: " value={this.state.password} onChange={this.handleChange}/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}
