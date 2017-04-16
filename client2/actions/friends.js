import axios from 'axios'

const requestFriends = () => {
  return {
    type: 'REQUEST_FRIENDS',
    isFetchingFriends: true
  }
}

const receiveFriends = (status, friends) => {
  const payload = status === "success" ?
      {isFetchingFriends: false, redirectToNewEvent: true, friends} :
      {isFetchingFriends: false, errorFetchingFriends: true}

  return {
    type: 'RECEIVE_FRIENDS',
    payload
  }
}

export const fetchFriends = () => {
  return (dispatch) => {
    dispatch(requestFriends())

    const config = {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }

    return axios.get('/users', config)
      .then(({data}) => {
        dispatch(receiveFriends("success", data.users))
      })
      .catch(error => {
        dispatch(receiveFriends("error", error))
      })
  }
}
