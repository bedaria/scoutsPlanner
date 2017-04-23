import React from 'react'
import { Panel, Button, Well } from 'react-bootstrap'

export const Admin = ({event}) => (
  <Panel bsStyle="danger" header={event.name}>
    <Well> Dates:
      {new Date(event.startDateTime).toLocaleDateString()}
      {
        event.endDateTime !== event.startDateTime ?
        "-" + new Date(event.endDateTime).toLocaleDateString(): ""
      }
    </Well>
    <Well>
      Tasks: tasks coming right up...
    </Well>
    <Well>
      Location: Coming up...
    </Well>
  </Panel>
)
