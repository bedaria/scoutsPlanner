import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'
import localizer from 'react-widgets/lib/localizers/simple-number'
import momentLocaliser from 'react-widgets/lib/localizers/moment'
import { Multiselect, DateTimePicker, NumberPicker } from 'react-widgets'
import { FormControl, Button, Glyphicon, InputGroup } from 'react-bootstrap'
import 'react-widgets/lib/less/react-widgets.less'

momentLocaliser(moment)
localizer()

const validate = (values) => {
  const errors = {}

  if(!values.name)
    errors.name = 'Required!'

  if(!values.invited)
    errors.invited = 'Invite someone!'

  if(!values.startDateTime)
    errors.startDateTime = 'Required!'

  if(!values.endDateTime)
    errors.endDateTime = 'Required!'

  if(values.startDateTime && values.endDateTime && (values.startDateTime.getTime() + 1740000 > values.endDateTime.getTime()))
    errors.endDateTime = 'Event must end at least 30 minutes after starting.'

  if(!values.addr)
    errors.addr = 'Address?'

  let wrapperError = ''
  values.tasks.forEach(task => {
    if(!task.entireEvent)
    wrapperError = 'Please pick times'
    if(!task.name)
      wrapperError = 'Task name required!'
  })
  errors.tasksWrapper = wrapperError

  return errors
}

class NewEventForm extends Component {
  render() {
    const { handleSubmit, friends, addr, tasks } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="name" component={renderTextField} placeholder="Event name: "/>
        <Field name="message" component={renderTextAreaField} placeholder="Message: "/>
        <Field name="invited"
               component={renderMultiSelect}
               data={[{id: 0, name: 'All'}].concat(friends)}
               valueField="id"
               textField="name"
               placeholder="Pick who to invite: "
        />
        <div className="inline">
          <Field name="startDateTime"
                 component={renderDateTimePicker}
                 placeholder="Pick a startDate"
          />
          <Field name="endDateTime"
                 component={renderDateTimePicker}
                 placeholder="Pick an endDate"
          />
        </div>
        <Field name = 'addr' component={renderAddressRadio} />
        { addr === 'addr' && <Field name="address" component={Autocomplete}/> }
        <Field name="tasksWrapper" component={renderTasksWrapper} tasks={tasks}/>
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

NewEventForm = reduxForm({
  form: 'newEvent',
  validate,
  initialValues: {
    tasks: [{name: '', volunteersNeeded: 1}]
  }
})(NewEventForm)

const selector = formValueSelector('newEvent')
NewEventForm = connect(
  state => {
    let addr = selector(state, 'addr')
    let tasks = selector(state, 'tasks')
    return {
      addr,
      tasks
    }
  }
)(NewEventForm)

export default NewEventForm

const renderTextField = ({input, placeholder, meta: {error}}) =>
  <div>
    <FormControl
      {...input }
      placeholder={placeholder}
      style={{'marginTop':'10px'}}
      type="text"
    />
    {error && <span style={{'color': '#a94442'}}> {error} </span>}
  </div>

const renderTextAreaField = ({input, placeholder}) =>
  <FormControl
    {...input}
    componentClass="textarea"
    placeholder={placeholder}
    style={{'marginTop':'10px'}}
  />

const renderAddressRadio = ({input, meta: {error}}) =>
  <div>
    <label style={{'marginTop':'10px'}}>
      <Field name="addr" component="input" type="radio" value="addr"/>
      <span style={{
        'marginLeft':'5px',
        'marginRight':'10px'
      }}> Address </span>
    </label>
    <label style={{'marginTop':'10px'}}>
      <Field name="addr" component="input" type="radio" value="TBD"/>
      <span> TBD </span>
    </label>
    <div>
      {error && <span style={{'color': '#a94442'}}> {error} </span>}
    </div>
  </div>

const renderTimeChoiceRadio = ({input, task }) =>
<div>
  <label style={{'marginTop':'10px'}}>
    <Field name={`${task}.entireEvent`} component="input" type="radio" value="entireEvent"/>
    <span style={{
      'marginLeft':'5px',
      'marginRight':'10px'
    }}> Entire Event </span>
  </label>
  <label style={{'marginTop':'10px'}}>
    <Field name={`${task}.entireEvent`} component="input" type="radio" value="customTime"/>
    <span> Custom Time </span>
  </label>
</div>

const renderNumberPicker = ({input: {value, onChange}}) =>
  <NumberPicker
    value={Number(value)}
    onChange={onChange}
    style={{"marginTop": '10px'}}
    min={1}
  />

const renderTasksWrapper = ({input, tasks, meta: {error}}) =>
  <div>
    <FieldArray name="tasks" component={renderTasks} tasks={tasks}/>
    {error && <span style={{'color': '#a94442'}}> {error} </span>}
  </div>


const renderTasks = ({ fields, tasks }) =>
  <div>
    {fields.map((task, index) =>
      <div key={index}>
        <label style={{"marginTop": '15px'}}> Task name and number of volunteers needed: </label>
        <div >
          <div className="inline">
            <InputGroup>
              <Field name={`${task}.name`}
                     component={renderTextField}
                     placeholder="Task:"
                     />
              <InputGroup.Button>
                <Button
                  bsStyle="danger"
                  type="button"
                  title="Remove Task"
                  style={{"marginTop": '10px'}}
                  onClick={() => fields.remove(index)}>
                    <Glyphicon glyph="remove"/>
                </Button>
              </InputGroup.Button>
            </InputGroup>
            <Field name={`${task}.volunteersNeeded`}
                   component={renderNumberPicker}
            />
          </div>
          <Field name={`${task}.entireEvent`}
                 component={renderTimeChoiceRadio}
                 task={task} />
          {
            tasks && tasks[index].entireEvent === 'customTime' &&
            <div className="inline">
              <Field name={`${task}.startDateTime`}
                     component={renderDateTimePicker}
                     placeholder="Pick a startDate"
              />
              <Field name={`${task}.endDateTime`}
                     component={renderDateTimePicker}
                     placeholder="Pick an endDate"
              />
            </div>
          }

        </div>
      </div>
    )}
    <Button onClick={() => fields.push({})} style={{marginTop: '10px'}}>
      <Glyphicon glyph="plus"/>
        Add Task
    </Button>
  </div>

const renderMultiSelect = ({input, data, valueField, textField, placeholder, meta: {error}}) =>
    <div>
      <Multiselect {...input}
        placeholder={placeholder}
        onBlur={() => input.onBlur()}
        data={data}
        value={input.value || []}
        valueField={valueField}
        textField={textField}
        style={{
          'marginTop':'10px'
        }}
      />
        {error && <span style={{'color': '#a94442'}}> {error} </span>}
      </div>

const renderDateTimePicker = ({input: { onChange, value }, placeholder, meta: {error}}) => {
  const minDateTime = prettyfyTime(new Date())

  return (
    <div>
      <DateTimePicker
        style={{'marginTop':'10px'}}
        placeholder={placeholder}
        onChange={onChange}
        min={minDateTime}
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

class Autocomplete extends Component {
  wrapInput = (ref, onChange) => {
    var autocomplete = new google.maps.places.Autocomplete(ref)
    autocomplete.addListener('place_changed', () => {fillInAddress()})

    const fillInAddress = () => {
      const place = autocomplete.getPlace()
      onChange(place.formatted_address)
    }
  }

  render = () => {
    const {input: {onChange}, meta: {error}} = this.props
    return (
      <div>
        <FormControl className='autocomplete'
                     inputRef={(ref) => {this.wrapInput(ref, onChange)}}
                     type="text"
                     placeholder="Enter an address"
                     style={{'marginTop':'10px'}} />
      {error && <span style={{'color': '#a94442'}}> {error} </span>}
      </div>
    )
  }
}
