import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'
import momentLocaliser from 'react-widgets/lib/localizers/moment'
import { SelectList, DateTimePicker, DropdownList } from 'react-widgets'
import { FormControl, FormGroup, Button, Glyphicon, InputGroup, Radio } from 'react-bootstrap'
import 'react-widgets/lib/less/react-widgets.less'

momentLocaliser(moment)

class ReplyForm extends Component {

  render = () => {
    const { handleSubmit, isAttending, entireEvent } = this.props
    const { event: { answer, startDateTime, endDateTime,
                     eventTasks, id, name,
                     volunteerEndDateTime, volunteerStartDateTime, volunteerTasks }}  = this.props

    return (
      <form onSubmit={handleSubmit}>
        <label> Can you make it? </label>
        <Field name="isAttending" component={radioFormGroup} groupName="isAttending" fields={['Yes', 'Maybe', 'No']} />
        { isAttending === 'Yes' &&
          <div>
            <div>
              <label>
              Pick a task:
              </label>
              <Field name="task"
                component={radioFormGroup}
                fields={eventTasks}
                groupName="task"
              />
            </div>
            <label> Can you attend the entire event?  </label>
            <Field name="entireEvent" component={radioFormGroup} groupName="entireEvent" fields={['Yes', 'No']} />
            { entireEvent === 'No' &&
              <div>
                <label>
                 When can you help?
                  <div className="inline">
                    <Field
                      name="volunteerStartDateTime"
                      component={renderDatePicker}
                      placeholder={new Date(startDateTime).toLocaleString()}
                      min={startDateTime}
                      max={endDateTime}
                    />
                    <Field
                      name="volunteerEndDateTime"
                      component={renderDatePicker}
                      endDateTime={endDateTime}
                      startDateTime={startDateTime}
                      placeholder={new Date(endDateTime).toLocaleString()}
                      min={startDateTime}
                      max={endDateTime}
                    />
                  </div>
                </label>
              </div>
             }
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
    let entireEvent = selector(state, 'entireEvent')

    return {
      isAttending,
      entireEvent
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

const renderDatePicker = ({input: { onChange, value }, placeholder, min, max}) =>
    <div>
      <DateTimePicker
        style={{
          'marginTop':'10px',
          'marginRight':'10px'
        }}
        placeholder={placeholder}
        onChange={onChange}
        min={new Date(min) }
        max={new Date(max) }
        value={value && new Date(value) || null} />
    </div>

export default ReplyForm
