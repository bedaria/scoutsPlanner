import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getUserEvents } from '../helpers'
import { EventList } from './EventList'
import AdminEventList from './AdminEventList'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      redirectTo: '',
      userEvents: [],
      adminEvents: [],
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
      return <div></div>
  }

  updateEvents = (data) => {
    if(data.error)
      this.setState({errorMessage: 'Error retrieving events.'})
    else
      this.setState({
        userEvents: data.userEvents,
        gotEvents: data.gotEvents,
        adminEvents: data.adminEvents
      })
  }

  showEvents = () => {

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

    return (
              <div>
              {this.showErrorMessage()}
                  <div> {localStorage.getItem('username')}s profile </div>
                  <div className="container">
                    <button id="createEvents" type="button" onClick={this.handleClick}>Create Event</button>
                  </div>
                  <hr/>
                  <div> My events: </div>
                  {
                    this.state.gotEvents?
                      (<div>
                          <AdminEventList events={this.state.adminEvents} />
                          <EventList events={this.state.userEvents} />
                        </div>) :
                       (<div> Retrieving events... </div>)
                  }
              </div>
      )
    }
}
