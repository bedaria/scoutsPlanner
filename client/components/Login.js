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
    localStorage.setItem('username', this.state.username)
    this.setState({isLoggedIn: true})
  }

  render() {
    if(this.state.isLoggedIn)
      return <Redirect push to='/profile'/>

    return (
        <div className="container">
        <span> Log In </span>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="username" placeholder="Enter username: " value={this.state.username} onChange={this.handleChange}/>
            <input type="text" id="password" placeholder="Enter password: " value={this.state.password} onChange={this.handleChange}/>
            <input className="button" type="submit" value="Log in" />
          </form>
        </div>
    )
  }
}
