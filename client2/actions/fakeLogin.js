import axios from 'axios'

const loggingIn = () => {
  return {
    type: 'LOGGING_IN',
    isLoggingIn: true
  }
}

const loggedIn = (status, token) => {
  const payload = status === "success" ?
    {
      isLoggingIn: false,
      axiosConfig: {
        headers: { 'x-access-token': token}
      }
    } :
    {
      isLogginIn: false,
      loginError: true
    }

  return {
    type: 'LOGGED_IN',
    payload
  }
}

export const fakeLogin = () => {
  return (dispatch) => {
    dispatch(loggingIn())
    return axios.post('/login')
      .then(({data}) => {
        const { username, token } = data
        localStorage.setItem('username', username)
        dispatch(loggedIn("success", token))
      })
      .catch(error => dispatch(loggedIn("error", error)))
  }
}
