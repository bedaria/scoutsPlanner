import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'
import momentLocaliser from 'react-widgets/lib/localizers/moment'
import { SelectList, DateTimePicker, DropdownList } from 'react-widgets'
import { FormControl, FormGroup, Button, Glyphicon, InputGroup, Radio, Checkbox } from 'react-bootstrap'

import 'react-widgets/lib/less/react-widgets.less'
momentLocaliser(moment)

class ReplyForm extends Component {
  componentDidMount = () => {
    this.handleInitializing()
  }

  handleInitializing = () => {
    const { event: {eventTasks, answer}} = this.props
    let volunteerTasks = []
    eventTasks.forEach(task => {
      volunteerTasks.push({
        id: task.id,
        volunteerStartDateTime: task.startDateTime,
        volunteerEndDateTime: task.endDateTime
      })
    })
    this.props.initialize({volunteerTasks, isAttending: answer})
  }

  render = () => {
    const { handleSubmit, isAttending } = this.props
    const { event: { eventTasks }}  = this.props

    return (
      <form onSubmit={handleSubmit}>
        <label> Can you make it? </label>
        <Field name="isAttending" component={radioFormGroup} groupName="isAttending" fields={['Yes', 'Maybe', 'No']} />
        { isAttending === 'Yes' &&
          <div>
            <div>
              <label>
              Pick tasks:
              </label>
              <FieldArray name="volunteerTasks"
                component={renderTasks}
                tasks={eventTasks}
              />
            </div>
          </div>
        }

        <Button type="submit"
                bsSize="large"
                style={{'marginTop':'10px'}}
                block>
          Submit
        </Button>
      </form>
    )
  }
}

ReplyForm = reduxForm({
  form: 'reply'
})(ReplyForm)

const selector = formValueSelector('reply')
ReplyForm = connect(
  state => {
    let isAttending = selector(state, 'isAttending')
    return {
      isAttending
    }
  }
)(ReplyForm)

const radioFormGroup = ({input: {onChange, value}, fields, groupName } ) => {
  return (
    <FormGroup>
    {
      fields.map((field, idx) => (
        <Radio key={idx}
           onChange={() => onChange(field)}
           name={groupName}
           inline>
          {field.name || field}
        </Radio>
      ))
    }
     </FormGroup>
   )
}

const renderTasks = ({ fields, tasks }) => {
  return (
    <div>
      {fields.map((task, index) =>
        <div key={index}>
          <label style={{marginTop: '10px'}}>
          <Field name={`${task}.volunteering`}
                 id={`${task}.id`}
                 component="input"
                 type="checkbox"/>
          <span style={{marginLeft: '10px'}}> {tasks[index].name} </span>
          </label>
          <div className="inline">
            <Field name={`${task}.volunteerStartDateTime`}
                   component={renderDateTimePicker}
                   min={tasks[index].startDateTime}
                   max={tasks[index].endDateTime}/>
            <Field name={`${task}.volunteerEndDateTime`}
                   component={renderDateTimePicker}
                   min={tasks[index].startDateTime}
                   max={tasks[index].endDateTime}/>
          </div>
        </div>
    )}
    </div>
  )
}

const renderDateTimePicker = ({input: { onChange, value }, placeholder, min, max, meta: {error}}) => {
  return (
    <div>
      <DateTimePicker
        style={{'marginTop':'10px'}}
        onChange={onChange}
        min={min && new Date(min) || null}
        max={max && new Date(max) || null}
        value={value && prettyfyTime(new Date(value)) || null} />
      {error && <span style={{'color': '#a94442'}}> {error} </span>}
    </div>
  )
}

// date: <Date>
const prettyfyTime = (date) => {
  const currentMinutes = date.getMinutes()
  const minutes = currentMinutes/10 > 3 || currentMinutes === 0 ? 0 : 30
  const hours = currentMinutes/10 > 3 ?  date.getHours() + 1 : date.getHours()
  date.setMinutes(minutes)
  date.setHours(hours)
  date.setSeconds(0)

  return date
}
export default ReplyForm
