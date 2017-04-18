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
/*
{ info:
     { name: 'Bury lizards',
       id: 136,
       startTime: '05:00',
       endTime: '05:30',
       startDate: '04/17/2017',
       endDate: '04/17/2017',
       EventVolunteer: [Object] },
    answer:
     { startTime: null,
       endTime: null,
       isAttending: 'No',
       seen: false,
       createdAt: Mon Apr 17 2017 11:40:29 GMT-0700 (Pacific Daylight Time),
       updatedAt: Mon Apr 17 2017 11:40:29 GMT-0700 (Pacific Daylight Time),
       EventId: 136,
       UserId: 75 } } ]
*/
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
