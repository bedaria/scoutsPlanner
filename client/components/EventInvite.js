import React, { Component } from 'react'

export default class EventInvite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attending: "Yes",
      jobs: "job1, job2, job3",
      selectedCheckBoxes: new Set()
    }

    this.toggleCheckBox = this.toggleCheckBox.bind(this)
   }

  handleOptionChange = (event) => {
    this.setState({attending: event.target.value})
  }

  toggleCheckBox(event){
    if(this.state.selectedCheckBoxes.has(event.target.value))
      this.state.selectedCheckBoxes.delete(event.target.value)
    else {
      this.state.selectedCheckBoxes.add(event.target.value)
    }
  }

  createCheckBox = (label) => {
    return (
      <div>
        <label> {label} </label>
        <input type="checkbox" value={label} onChange={this.toggleCheckBox}/>
      </div>
    )
  }

  createCheckBoxes = () => {
    return this.state.jobs.split(',').map(label => this.createCheckBox(label.trim()))
  }

  handleSubmit = (event) => {
    console.log(this.state.attending)
    console.log(this.state.selectedCheckBoxes.has('job1'))
    console.log(this.state.selectedCheckBoxes.has('job2'))
    console.log(this.state.selectedCheckBoxes.has('job3'))
    event.preventDefault()
  }

  render() {
    return (
      <div>
        Hey!
        An event is coming up,
        Note: a message
        <form onSubmit={this.handleSubmit}>
          <label> Will you attend? </label>
          <input type="radio" value="Yes" checked={"Yes" === this.state.attending} onChange={this.handleOptionChange} />
          <input type="radio" value="No" checked={"No" === this.state.attending} onChange={this.handleOptionChange} />
          {this.createCheckBoxes()}
          <input type="submit"/>
        </form>
      </div>
    )
  }
}
