import React, { Component } from 'react'
import Checkbox from './Checkbox.js'

export default class EventInvite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attending: "Yes",
      tasks: "job1, job2, job3",
      selectedCheckBoxes: new Set()
    }
   }

  handleOptionChange = (event) => {
    this.setState({attending: event.target.value})
  }

  toggleCheckBox = (event) => {
    let checked = event.target.value
    let selectedCheckBoxes = this.state.selectedCheckBoxes
    if(selectedCheckBoxes.has(checked))
      selectedCheckBoxes.delete(checked)
    else
      selectedCheckBoxes.add(checked)
  }

  createCheckBox = (label) => {
    return (
      <Checkbox label={label} toggleCheckBox={this.toggleCheckBox}></Checkbox>
    )
  }

  createCheckBoxes = () => {
    return this.state.tasks.split(',').map(label => this.createCheckBox(label.trim()))
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
          <input type="radio" value="Maybe" checked={"Maybe" === this.state.attending} onChange={this.handleOptionChange} />
          {this.createCheckBoxes()}
          <input type="submit"/>
        </form>
      </div>
    )
  }
}
