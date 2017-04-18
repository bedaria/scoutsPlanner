import axios from 'axios'

const requestInvites = () => {
  return {
    type: 'REQUEST_INVITES',
    isFetching: true
  }
}

const receiveInvites = (status, invites) => {
  const payload = status === "success" ?
    {invites, isFetching: false} :
    {isFetching: false, errorFetching: true}

  return {
    type: 'RECEIVE_INVITES',
    payload
  }
}

const getButtonText = (invites) => {
  const inviteButtons = invites.map(invite => {
    return {
      name: invite.info.name,
      id: invite.info.id,
      isAttending: invite.answer.isAttending
    }
  })
  console.log("inviteButtons: ", inviteButtons)
  return {
    type: 'FILTER_BUTTON_TEXT',
    inviteButtons
  }
}

export const getInvites = () => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(requestInvites())
    axios.get('/invites')
      .then(({data}) => {
        dispatch(receiveInvites("success", data.userEvents))
        dispatch(getButtonText(data.userEvents))
      })
      .catch(error => {
        dispatch(receiveInvites("error"))
      })
  }
}
