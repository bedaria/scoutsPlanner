import React from 'react'

export const ErrorMessage = (message) => (
  <Row>
    <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
      <div> {message} </div>
    </Col>
  </Row>
)
