import React, { Component } from 'react'
import { connect } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import moment from 'moment'
import momentLocaliser from 'react-widgets/lib/localizers/moment'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import DropdownList from 'react-widgets/lib/DropdownList'
import 'react-widgets/lib/less/react-widgets.less'

momentLocaliser(moment)

const renderTasks = ({ fields }) => {
  return (
    <div>
      <div>
        <button type="button" onClick={() => fields.push({})}> Add Task </button>
      </div>
      {fields.map((task, index) =>
        <div key={index}>
          <button
            type="button"
            title="Remove Task"
            onClick={() => fields.remove(index)}>X</button>
            <Field name={`${task}.name`} component="input" type="text"/>
        </div>
      )}
    </div>
    )
}

const renderMultiSelect = ({input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    data={data}
    value={input.value || []}
    valueField={valueField}
    textField={textField} />

const renderDateTimePicker = ({input: { onChange, value } }) =>
  <DateTimePicker
    onChange={onChange}
    min={new Date()}
    value={!value ? null: new Date(value)} />

class Autocomplete extends Component {
  wrapInput = (input, onChange) => {
    var autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.addListener('place_changed', () => {fillInAddress()})

    const fillInAddress = () => {
      const place = autocomplete.getPlace()
      onChange(place.formatted_address)
    }
  }

  render = () => {
    const {input: {value, onChange }} = this.props
    return <input ref={(input) => {this.wrapInput(input, onChange)}} type="text"  placeholder="Enter an address"/>
  }
}

class NewEventForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventName">Event Name</label>
          <Field name="eventName" component="input" type="text"/>
        </div>
        <div>
          <label>Send to </label>
          <Field
            name="invited"
            component={renderMultiSelect}
            data={this.props.friends}
            valueField="id"
            textField="name"
          />
        </div>
        <div>
          <label>From </label>
          <Field
            name="from"
            component={renderDateTimePicker}
          />
        </div>
        <div>
          <label>Till </label>
          <Field
            name="till"
            component={renderDateTimePicker}
          />
        </div>
        <div>
          <label> Where </label>
          <Field name="where" component={Autocomplete}/>
        </div>
        <FieldArray name="tasks" component={renderTasks} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newEvent'
})(NewEventForm)
