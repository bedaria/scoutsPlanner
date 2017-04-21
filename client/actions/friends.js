import axios from 'axios'

const requestFriends = () => {
  return {
    type: 'REQUEST_FRIENDS',
    isFetching: true
  }
}

const receiveFriends = (status, friends) => {
  const payload = status === "success" ?
      {isFetching: false, friends} :
      {isFetching: false, errorFetching: true}

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

    return axios.get('/api/users', config)
      .then(({data}) => {
        dispatch(receiveFriends("success", data.users))
      })
      .catch(error => {
        dispatch(receiveFriends("error", error))
      })
  }
}
