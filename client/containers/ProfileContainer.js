import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Image } from 'react-bootstrap'
import { getProfileInfo } from '../actions/profile'

class ProfileContainer extends Component {
  componentWillMount = () => {
    this.props.getProfileInfo()
  }

  render = () => {
    const { errorFetching, isFetchingProfile } = this.props
    const { email, name, phoneAreaCode, phoneNumber, profilePicturePath } = this.props
    const path = profilePicturePath ?  profilePicturePath + ".png" : "forrest.png"

    if(isFetchingProfile)
      return showErrorMessageOrLoader("loader")
    else if(errorFetching)
      return showErrorMessageOrLoader("error", "Error getting info...")
    else
      return (
        <Row>
          <Col xs={6} md={4} mdOffset={2}>
            <h1> Hey, { name }</h1>
            <div> Email: { email }</div>
            <div> Phone Number: { toPhoneNumber(phoneAreaCode, phoneNumber) }</div>
          </Col>
          <Col xs={6} md={4}>
            <Image src={"/profile/picture/" + path } rounded style={{height: '180px', width: '171px'}}/>
          </Col>
        </Row>
      )
  }
}

//type: "error" or "loader", message: string
const showErrorMessageOrLoader = (type, message) => (
  <Row>
    <Col xs={6} md={4} mdOffset={2}>
      {type === "error" ? <div> {message} </div> : <div className="loader" />}
    </Col>
  </Row>
)

//areaCode: string, sevenNumbers: string
const toPhoneNumber = (areaCode, sevenNumbers) => {
  const digits = [...sevenNumbers]
  return "(" + areaCode + ")" + " " + digits.splice(0,3).join("") + " - " + digits.join("")
}

const mapStateToProps = ({profile}) => {
  return {
    errorFetching: profile.errorFetching,
    isFetchingProfile: profile.isFetching,
    email: profile.email,
    name: profile.name,
    phoneAreaCode: profile.phoneAreaCode,
    phoneNumber: profile.phoneNumber,
    profilePicturePath: profile.profilePicturePath
  }
}

export default connect(
  mapStateToProps,
  { getProfileInfo }
)(ProfileContainer)
