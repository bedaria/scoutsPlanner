import React, { Component } from 'react'

export default class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: ''
    }
  }

  handleChange = (event) => {
    this.setState({task: event.target.value})
  }

  addTask = (event) => {
    event.preventDefault()
    var tasks = this.props.tasks
    tasks.push({name: this.state.task})
    this.setState({task: ''})
    this.props.getTasks(tasks)
  }

  removeTask = (event) => {
    var tasks = this.props.tasks
    const idx = event.target.id
    tasks = tasks.slice(0, idx).concat(tasks.slice(idx + 1))
    this.props.getTasks(tasks)
  }

  render() {
    return (
      <div>
        <label>What do you need volunteers for? </label>
        <input type="text" placeholder="Task name: " value={this.state.task} onChange={this.handleChange}/>
        <button onClick={this.addTask} > Add task </button>
        <TaskList tasks={this.props.tasks} removeTask={this.removeTask}/>
      </div>
    )
  }
}


const TaskList = ({tasks, removeTask}) => (
  <div>
    {
      tasks.map((task,idx) => (<Task name={task.name} id={idx} removeTask={removeTask} />))
    }
  </div>
)

const Task = ({id, name, removeTask}) => (
  <button id={id} onClick={removeTask}> {name} </button>
)
