import axios from 'axios'

const isFetchingProfile = () => {
  return {
    type: 'GET_PROFILE',
    payload: {
      isFetching: true,
      errorFetching: false
    }
  }
}

const receiveProfile = (status, profileInfo) => {
  const payload = status === "success" ?
    {isFetching: false, errorFetching: false, ...profileInfo} :
    {isFetching: false, errorFetching: true}

  return {
    type: 'RECEIVE_PROFILE',
    payload
  }
}

export const getProfileInfo = () => {
  return (dispatch) => {
    dispatch(isFetchingProfile())

    const config = {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }

    return axios.get('/api/user', config)
      .then(({data}) => {
        dispatch(receiveProfile("success", data.profileInfo))
      })
      .catch(error => {
        dispatch(receiveProfile("error", error))
      })
  }
}
