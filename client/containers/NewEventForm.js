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
    data={data}
    value={input.value || []}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange} />

const renderDateTimePicker = ({input: { onChange, value } }) =>
  <DateTimePicker
    onChange={onChange}
    min={new Date()}
    value={!value ? null: new Date(value)} />

// const friends = [{name: "Copper", id: 1}, {name: "Frankie", id: 2}]
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
          <label htmlFor="invitees">Send to </label>
          <Field
            name="invitees"
            component={renderMultiSelect}
            data={this.props.friends}
            valueField="id"
            textField="name"
          />
        </div>
        <div>
          <label htmlFor="when">From </label>
          <Field
            name="when"
            component={renderDateTimePicker}
          />
        </div>
        <div>
          <label htmlFor="when">Till </label>
          <Field
            name="when"
            component={renderDateTimePicker}
          />
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
