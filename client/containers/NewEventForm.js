import React, { Component } from 'react'
import { connect } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import moment from 'moment'
import localizer from 'react-widgets/lib/localizers/simple-number'
import momentLocaliser from 'react-widgets/lib/localizers/moment'
import { Multiselect, DateTimePicker, DropdownList, NumberPicker } from 'react-widgets'
import { FormControl, Button, Glyphicon, InputGroup } from 'react-bootstrap'
import 'react-widgets/lib/less/react-widgets.less'

momentLocaliser(moment)
localizer()

const validate = (values) => {
  const errors = {}

  if(!values.name)
    errors.eventName = 'Required!'

  if(!values.invited)
    errors.invited = 'Invite someone!'

  if(!values.date)
    errors.date = 'Required!'

  if(!values.startTime)
    errors.startTime = 'Required!'

  if(!values.endTime)
    errors.endTime = 'Required!'

  if(values.startTime && values.endTime && (values.endTime.getTime() < values.startTime.getTime()))
    errors.endTime = 'Event can\'t end before starting'
  else if(values.startTime && values.endTime && (values.endTime.getTime() - values.startTime.getTime() < 900000))
    errors.endTime = 'Event must bet at least 15 minutes...'

  if(!values.address && !values.TBD)
    errors.address = 'Address TBD?'

  return errors
}

const renderTextField = ({input, placeholder, meta: {touched, error}}) =>
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


const renderNumberPicker = ({input: {value, onChange}}) =>
  <NumberPicker
    value={Number(value)}
    onChange={onChange}
  />

const renderTasks = ({ fields }) =>
    <div style={{'marginTop':'10px'}}>
      {fields.map((task, index) =>
        <div key={index}>
            <InputGroup>
              <Field name={`${task}.name`}
                     component={renderTextField}
                     placeholder="Task:"
                     />
              <InputGroup.Button>
                <Button
                  style={{'marginTop':'10px'}}
                  bsStyle="danger"
                  type="button"
                  title="Remove Task"
                  onClick={() => fields.remove(index)}>
                    <Glyphicon glyph="remove"/>
                </Button>
              </InputGroup.Button>
            </InputGroup>
            <label> # needed:
              <Field name={`${task}.count`}
              component={renderNumberPicker}
              />
            </label>
        </div>
      )}
      <Button onClick={() => fields.push({})}>
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

const renderDatePicker = ({input: { onChange, value }, placeholder, meta: {error}}) =>
    <div>
      <DateTimePicker
        style={{'marginTop':'10px'}}
        placeholder="Pick a date:"
        onChange={onChange}
        min={new Date()}
        time={false}
        value={!value ? null: new Date(value)} />
        {error && <span style={{'color': '#a94442'}}> {error} </span>}
    </div>

const renderTimePicker = ({input: { name, onChange, value }, placeholder, meta: {error}}) => {
  return (
    <div>
      <DateTimePicker
        placeholder={placeholder}
        onChange={onChange}
        style={{
          'display': 'inline-block',
          'marginTop':'10px',
          'marginRight':'10px'
        }}
        calendar={false}
        value={!value ? null: new Date(value)} />
        {error && <span style={{'color': '#a94442'}}> {error} </span>}
    </div>
  )
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

class NewEventForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="name" component={renderTextField} placeholder="Event name: "/>
        <Field name="message" component={renderTextAreaField} placeholder="Message: "/>
        <Field
          name="invited"
          component={renderMultiSelect}
          data={[{id: 0, name: 'All'}].concat(this.props.friends)}
          valueField="id"
          textField="name"
          placeholder="Pick who to invite: "
        />
        <Field
          name="date"
          component={renderDatePicker}
          placeholder="Pick a date"
        />
        <div className="inline">
          <Field
            name="startTime"
            component={renderTimePicker}
            placeholder="Pick a start time"
          />
          <Field
            name="endTime"
            component={renderTimePicker}
            placeholder="Pick an end time"
          />
        </div>
        <Field name="address" component={Autocomplete}/>
        <label style={{'marginTop':'10px'}}>
          <Field name="TBD" component="input" type="radio" value="addressRadio"/>
          <span style={{
            'marginLeft':'5px',
            'marginRight':'5px'
          }}> Address </span>
        </label>
        <label style={{'marginTop':'10px'}}>
          <Field name="TBD" component="input" type="radio" value="TBD"/>
          <span style={{'marginLeft':'5px'}}> TBD </span>
        </label>
        <FieldArray name="tasks" component={renderTasks} />
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

export default reduxForm({
  form: 'newEvent',
  validate
})(NewEventForm)
