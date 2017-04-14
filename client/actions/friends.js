import axios from 'axios'

const requestFriends = () => {
  return {
    type: 'REQUEST_FRIENDS',
    isFetchingFriends: true
  }
}

const receiveFriends = (status, friends) => {
  const payload = status === "success" ?
      {isFetchingFriends: false, friends} :
      {isFetchingFriends: false, error: "Couldnt' fetch friends :("}

  return {
    type: 'RECEIVE_FRIENDS',
    payload
  }
}

export const fetchFriends = () => {
  return (dispatch) => {
    dispatch(requestFriends())
    return axios.get('/users/admin')
      .then(({data}) => {
        dispatch(receiveFriends("success", data.users))
      })
      .catch(error => {
        dispatch(receiveFriends("error", error))
      })
  }
}
