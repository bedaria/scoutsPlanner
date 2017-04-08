import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getUserEvents } from '../helpers.js'
import { EventList } from './EventList.js'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      redirectTo: '',
      events: [],
      errorMessage: '',
      gotEvents: false
    }
  }

  componentWillMount = () => {
    getUserEvents(this.updateEvents)
  }

  showErrorMessage = () => {
    if(this.state.errorMessage)
      return <div className="red"> Sorry: {this.state.errorMessage} </div>
    else
      return <div> All good. </div>
  }

  updateEvents = (data) => {
    if(data.error)
      this.setState({errorMessage: 'Error retrieving events.'})
    else
      this.setState({events: data.events, gotEvents: data.gotEvents})
  }

  showEvents = () => {
    if(this.state.gotEvents)
      return  <EventList eventList={this.state.events}/>
    else
      return <div> Retrieving events... </div>
  }

  handleClick = (event) => {
    event.preventDefault()
    switch(event.target.id){
      case 'createEvents':
        this.setState({redirect: true, redirectTo: '/newEvent'})
        break
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
              {this.showErrorMessage()}
                  <div> {localStorage.getItem('username')}s profile </div>
                  <div><button id="createEvents" type="button" onClick={this.handleClick}>Create Event</button></div>
                  <hr/>
                  <div> My events: </div>
                  {this.showEvents()}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
