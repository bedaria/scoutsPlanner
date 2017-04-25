import React, { Component } from 'react'
import { connect } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import moment from 'moment'
import momentLocaliser from 'react-widgets/lib/localizers/moment'
import SelectList from 'react-widgets/lib/SelectList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import DropdownList from 'react-widgets/lib/DropdownList'
import { FormControl, Button, Glyphicon, InputGroup, Radio } from 'react-bootstrap'

import 'react-widgets/lib/less/react-widgets.less'
momentLocaliser(moment)

const renderRadioButton = (props) => {
  console.log("radio button props: ", props)
  return (
    <Radio
      checked
      value="task1" >
     Radio
    </Radio>
  )
}
// const renderTasks = ({ fields }) =>
//   <div style={{'martinTop':'10px'}}>
//     {fields.map((task, index) => {
//       <div key={index}>
//         <Field name="a"
//       </div>
//       })
//     }
//   </div>

class AnswerForm extends Component {

  render = () => {
    return (
      <div>
        <Field name="task" component={renderRadioButton} value="value" />
      </div>
    )
  }
}

export default reduxForm({
  form: 'answer'
})(AnswerForm)
