import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fakeLogin } from '../actions/fakeLogin'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, FormControl, Col, Row, Button } from 'react-bootstrap'

class LoginContainer extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.fakeLogin()
  }

  render = () => {
    const { isLoggingIn, loginError, isLoggedIn, fakeLogin } = this.props
    return (
      <div>
        <Row>
          <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
            {isLoggingIn ? <div className="loader" /> : null}
            {loginError ?  <div> Error logging in, try again> </div> : null}
            {isLoggedIn ? <Redirect push to="/profile" />: null}
          </Col>
        </Row>
        <Form horizontal>
          <FormGroup>
            <Col xs={4} md={4} xsOffset={4} mdOffset={4}>
              <FormControl type="text" placeholder="Username/email" disabled/>
              <FormControl type="password" placeholder="password" disabled/>
              <Button type="submit" bsSize="large" style={{'marginTop':'10px'}} onClick={this.handleSubmit} block>
                Click for a random user account
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = ({fakeLogin, newEvent}) => {
  return {
    isLoggingIn: fakeLogin.isLoggingIn,
    loginError: fakeLogin.loginError,
    isLoggedIn: fakeLogin.isLoggedIn
  }
}

export default connect(
  mapStateToProps,
  { fakeLogin }
)(LoginContainer)
