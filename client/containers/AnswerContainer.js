import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnswerForm from './AnswerForm'

class AnswerContainer extends Component {

  render = () => {
    const { eventsById } = this.props
    let event = eventsById[this.props.match.params.event]

    if(!Object.keys(eventsById).length)
      return <div className="laoder"/>
    else if(!event)
      return <div> Event not found. </div>
    return (
      <div className="event">
        <AnswerForm onSubmit={(info) => {console.log("info: ", info)}}/>
       </div>
     )
  }
}

const mapStateToProps = ({ events: { eventsById }}) => {
  return { eventsById }
}

export default connect(
  mapStateToProps,
  null
)(AnswerContainer)
