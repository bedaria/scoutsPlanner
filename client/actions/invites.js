import axios from 'axios'

const requestInvites = () => {
  return {
    type: 'REQUEST_INVITES',
    isFetching: true
  }
}

const receiveInvites = (status, invites) => {
  const payload = status === "success" ?
    {invites, isFetching: false, errorFetching: false} :
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

  return {
    type: 'FILTER_BUTTON_TEXT',
    inviteButtons
  }
}

const arrangeInvitesById = (invites) => {
  const invitesById = invites.reduce((byId, invite) => {
    byId[invite.info.id] = invite
    return byId
  }, {})

  return {
    type: 'ARRANGE_INIVTES_BY_ID',
    invitesById
  }
}

export const toInvite = (inviteId) => {
  return {
    type: 'REDIRECT',
    redirect: true,
    inviteId
  }
}

export const doneRedirecting = () => {
  return {
    type: 'REDIRECTED',
    redirect: false,
    inviteId: ''
  }
}

export const getInvites = () => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(requestInvites())
    axios.get('/api/invites')
      .then(({data}) => {
        dispatch(receiveInvites("success", data.userEvents))
        dispatch(getButtonText(data.userEvents))
        dispatch(arrangeInvitesById(data.userEvents))
      })
      .catch(error => {
        dispatch(receiveInvites("error"))
      })
  }
}
