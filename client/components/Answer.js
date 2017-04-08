import React, {Component} from 'react'

export const Answer = (props) =>  {
  return (
      <div>
        <form onSubmit={props.submitAnswer}>
          <div> Will you attend? </div>
          <div>
            <label>
              <input type="radio" value="Yes" checked={"Yes" === props.attending} onChange={props.handleOptionChange} />
              Yes
            </label>
            <label>
              <input type="radio" value="Maybe" checked={"Maybe" === props.attending} onChange={props.handleOptionChange} />
              Maybe
            </label>
            <label>
              <input type="radio" value="No" checked={"No" === props.attending} onChange={props.handleOptionChange} />
              No
            </label>
          </div>
          <label>
            <input type="radio" id="entireEvent" value="entireEvent" checked={props.entireEvent} onChange={props.toggleRadioButton}/>
             Entire Event
          </label>
          <label>
            Start time:
            <input type="time" id="startTime" value={props.startTime} onChange={props.handleOptionChange} disabled={props.entireEvent} required />
          </label>
          <label>
            End time:
            <input type="time" id="endTime" value={props.endTime} onChange={props.handleOptionChange} disabled={props.entireEvent} required />
          </label>
          <input type="submit" />
        </form>
      </div>
    )
}
