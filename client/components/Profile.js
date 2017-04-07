import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      redirectTo: ''
    }
  }

  handleClick = (event) => {
    event.preventDefault()
    switch(event.target.id){
      case 'myEvents':
        this.setState({redirect: true, redirectTo: '/myEvent'})
        break
      case 'createEvents':
        this.setState({redirect: true, redirectTo: '/newEvent'})
        break
      case 'myFriends':
        console.log("getting friends")
      default:
        console.log("oops")
      }
    }

  render() {
    if(this.state.redirect)
     return <Redirect push to={this.state.redirectTo}/>
    else {
      return(
        <div className="container">
          <div className="item">
            <div className="profile">
              <div className="hello">
                  <div> {localStorage.getItem('username')}s profile </div>
                  <div><button id="myEvents" type="button" onClick={this.handleClick}>My Events</button></div>
                  <div><button id="createEvents" type="button" onClick={this.handleClick}>Create Event</button></div>
                  <div><button id="myFriends" type="button" onClick={this.handleClick}>My Friends</button></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
